<script setup lang="ts">
const text = 'Baby-step Giant-step'

const displayed = ref('')
const direction = ref<'forward' | 'backward'>('forward')

const typeDelayMs = 70
const deleteDelayMs = 45
const pauseAtEndsMs = 900
const props = withDefaults(defineProps<{ keepFilled?: boolean }>(), {
  keepFilled: false
})

let t: ReturnType<typeof setTimeout> | null = null

function schedule(fn: () => void, ms: number) {
  if (t) clearTimeout(t)
  t = setTimeout(fn, ms)
}

function tick() {
  if (direction.value === 'forward') {
    const nextLen = Math.min(displayed.value.length + 1, text.length)
    displayed.value = text.slice(0, nextLen)

    if (nextLen >= text.length) {
      schedule(() => {
        if (props.keepFilled) return
        direction.value = 'backward'
        tick()
      }, pauseAtEndsMs)
      return
    }

    schedule(tick, typeDelayMs)
    return
  }

  // backward
  const nextLen = Math.max(displayed.value.length - 1, 0)
  displayed.value = text.slice(0, nextLen)

  if (nextLen <= 0) {
    schedule(() => {
      direction.value = 'forward'
      tick()
    }, pauseAtEndsMs)
    return
  }

  schedule(tick, deleteDelayMs)
}

onMounted(() => {
  displayed.value = ''
  direction.value = 'forward'
  tick()
})

onBeforeUnmount(() => {
  if (t) clearTimeout(t)
})
</script>

<template>
  <span class="typeWrap inline-flex max-w-full items-center font-semibold tracking-tight text-primary">
    <span
      class="typeOverlay tabular-nums !text-primary"
      aria-live="off"
    >{{ displayed || ' ' }}</span>
    <span
      class="typeCaret ml-0.5 inline-block h-[1.1em] w-px !bg-primary"
      aria-hidden="true"
    />
  </span>
</template>

<style scoped>
.typeWrap {
  max-width: 100%;
}

.typeOverlay {
  white-space: pre;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.typeCaret {
  animation: caretBlink 1s steps(1) infinite;
}

@keyframes caretBlink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typeCaret {
    animation: none;
  }
}

@media (max-width: 640px) {
  .typeWrap {
    max-width: min(100%, 16ch);
  }

  .typeOverlay {
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .typeOverlay {
    overflow: visible;
    text-overflow: clip;
  }
}
</style>
