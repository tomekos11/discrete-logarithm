<script setup lang="ts">
import type { BabyGiantResult } from '~/composables/useBabyGiantStep'
import { babyStepGiantStep, modPow } from '~/composables/useBabyGiantStep'

type FormState = {
  g: string
  b: string
  p: string
}

const state = reactive<FormState>({
  g: '10',
  b: '2',
  p: '19'
})

const computing = ref(false)
const result = ref<BabyGiantResult | null>(null)
const activeStep = ref(0)

function parseBigIntStrict(input: string) {
  const s = input.trim()
  if (!/^\d+$/.test(s)) return null
  try {
    return BigInt(s)
  } catch {
    return null
  }
}

const validate = () => {
  const errors: { path: keyof FormState, message: string }[] = []
  const g = parseBigIntStrict(state.g)
  const b = parseBigIntStrict(state.b)
  const p = parseBigIntStrict(state.p)

  if (g === null) errors.push({ path: 'g', message: 'Podaj liczbę całkowitą dodatnią.' })
  if (b === null) errors.push({ path: 'b', message: 'Podaj liczbę całkowitą dodatnią.' })
  if (p === null) errors.push({ path: 'p', message: 'Podaj liczbę całkowitą dodatnią.' })

  if (g !== null && g <= 0n) errors.push({ path: 'g', message: 'G musi być > 0.' })
  if (b !== null && b <= 0n) errors.push({ path: 'b', message: 'B musi być > 0.' })
  if (p !== null && p <= 1n) errors.push({ path: 'p', message: 'P musi być > 1.' })

  return errors
}

async function onSubmit() {
  computing.value = true
  result.value = null
  activeStep.value = 0

  try {
    const g = parseBigIntStrict(state.g)
    const b = parseBigIntStrict(state.b)
    const p = parseBigIntStrict(state.p)
    if (g === null || b === null || p === null) return

    // Keep UI responsive for larger inputs.
    await new Promise(r => setTimeout(r, 0))
    result.value = babyStepGiantStep({ g, b, p })
  } finally {
    computing.value = false
  }
}

const filledPowerTex = computed(() => `${state.g}^{x} \\equiv ${state.b} \\pmod{${state.p}}`)
const filledLogTex = computed(() => `x = \\log_{${state.g}}\\left(${state.b}\\right) \\pmod{${state.p}}`)

function randomIntInclusive(min: number, max: number) {
  const a = Math.ceil(min)
  const b = Math.floor(max)
  const span = b - a + 1
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  return a + (buf[0] % span)
}

function randomExample() {
  const primes = [
    101n,
    211n,
    359n,
    503n,
    719n,
    1009n,
    1019n,
    1237n,
    1429n,
    2029n
  ]

  const p = primes[randomIntInclusive(0, primes.length - 1)]
  const g = BigInt(randomIntInclusive(2, Number(p - 2n)))
  const x = BigInt(randomIntInclusive(1, Number(p - 2n)))
  const bVal = modPow(g, x, p)

  state.p = p.toString()
  state.g = g.toString()
  state.b = bVal.toString()
  result.value = null
  activeStep.value = 0
}
</script>

<template>
  <UCard class="w-full ring-1 ring-default shadow-sm">
    <template #header>
      <div class="flex flex-col justify-between gap-3 md:min-h-[64px] md:flex-row md:items-center md:gap-4">
        <div class="min-w-0">
          <h3 class="text-lg font-semibold">
            Kalkulator logarytmu dyskretnego (Baby-step Giant-step)
          </h3>
          <p class="text-sm text-muted">
            Rozwiązujemy równanie: <MathTex tex="G^{x} \equiv B \pmod{P}" />
          </p>
        </div>

        <UBadge color="neutral" variant="subtle" class="shrink-0 self-start md:self-center">
          BigInt • krok po kroku
        </UBadge>
      </div>
    </template>

    <UForm
      :state="state"
      :validate="validate"
      class="space-y-4"
      @submit.prevent="onSubmit"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UFormField label="G (baza / generator)" name="g">
          <UInput v-model="state.g" inputmode="numeric" autocomplete="off" />
        </UFormField>

        <UFormField label="B (wartość docelowa)" name="b">
          <UInput v-model="state.b" inputmode="numeric" autocomplete="off" />
        </UFormField>

        <UFormField label="P (moduł, zwykle liczba pierwsza)" name="p">
          <UInput v-model="state.p" inputmode="numeric" autocomplete="off" />
        </UFormField>
      </div>

      <div class="rounded-lg border border-default bg-elevated p-4 text-sm">
        <div class="text-xs text-muted">
          Zapis problemu dla podanych wartości
        </div>
        <div class="mt-2 space-y-2">
          <MathTex block :tex="filledPowerTex" />
          <MathTex block :tex="filledLogTex" />
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <UButton
          type="submit"
          color="primary"
          size="lg"
          icon="i-lucide-calculator"
          :loading="computing"
        >
          Oblicz i pokaż kroki
        </UButton>

        <UButton
          type="button"
          color="neutral"
          variant="subtle"
          size="lg"
          icon="i-lucide-dices"
          :disabled="computing"
          @click="randomExample"
        >
          Losuj wartości
        </UButton>

        <UButton
          type="button"
          color="neutral"
          variant="outline"
          size="lg"
          icon="i-lucide-rotate-ccw"
          :disabled="computing"
          @click="() => { result = null; activeStep = 0 }"
        >
          Wyczyść wynik
        </UButton>
      </div>
    </UForm>

    <div class="mt-6">
      <StepVisualizer
        v-if="result"
        v-model:active-step="activeStep"
        :result="result"
      />

      <UAlert
        v-else
        variant="subtle"
        color="neutral"
        icon="i-lucide-list-ordered"
        title="Wpisz dane i uruchom obliczenia"
        description="Po obliczeniu pokażę prekomputację baby steps, potem giant steps i dopasowanie prowadzące do wyniku."
      />
    </div>
  </UCard>
</template>
