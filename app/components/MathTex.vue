<script setup lang="ts">
import katex from 'katex'

const props = withDefaults(defineProps<{
  tex: string
  block?: boolean
}>(), {
  block: false
})

const html = computed(() => {
  try {
    return katex.renderToString(props.tex, {
      displayMode: props.block,
      throwOnError: false,
      strict: 'ignore',
      output: 'html'
    })
  } catch {
    // Fallback: show raw TeX if something goes wrong.
    return `<code>${props.tex.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</code>`
  }
})
</script>

<template>
  <span
    v-if="!block"
    class="katexWrap"
    v-html="html"
  />
  <div
    v-else
    class="katexWrap katexWrap--block"
    v-html="html"
  />
</template>

<style scoped>
.katexWrap :deep(.katex) {
  font-size: 1em;
}
.katexWrap--block :deep(.katex) {
  font-size: 1.02em;
}
</style>

