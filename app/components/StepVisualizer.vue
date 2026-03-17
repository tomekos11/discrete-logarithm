<script setup lang="ts">
import type { BabyGiantResult } from '~/composables/useBabyGiantStep'

const props = defineProps<{
  result: BabyGiantResult
  activeStep: number
}>()

const emit = defineEmits<{
  (e: 'update:activeStep', value: number): void
}>()

const maxStep = computed(() => {
  // 0: parametry, 1: baby, 2: giant, 3: dopasowanie, 4: wynik / błąd
  return 4
})

const stepTitles = [
  'Parametry i m',
  'Baby steps (G^j mod P)',
  'Giant steps (B·(G^(-m))^i mod P)',
  'Dopasowanie',
  'Wynik'
] as const

const current = computed(() => Math.min(Math.max(props.activeStep, 0), maxStep.value))

function setStep(n: number) {
  emit('update:activeStep', Math.min(Math.max(n, 0), maxStep.value))
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <UBadge color="primary" variant="subtle">
          Krok {{ current + 1 }} / {{ maxStep + 1 }}
        </UBadge>
        <span class="text-sm font-medium">
          {{ stepTitles[current] }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          type="button"
          variant="outline"
          color="neutral"
          icon="i-lucide-chevron-left"
          :disabled="current === 0"
          @click="setStep(current - 1)"
        >
          Wstecz
        </UButton>
        <UButton
          type="button"
          color="primary"
          icon="i-lucide-chevron-right"
          :disabled="current === maxStep"
          @click="setStep(current + 1)"
        >
          Dalej
        </UButton>
      </div>
    </div>

    <div class="grid gap-4">
      <UCard v-if="current === 0">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-sigma" class="size-5" />
            <h4 class="font-semibold">
              Ustalenie parametrów
            </h4>
          </div>
        </template>

        <div v-if="result.ok" class="space-y-3">
          <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
            <UCard class="p-4">
              <div class="text-xs text-muted">
                m = ⌈√(P−1)⌉
              </div>
              <div class="mt-1 font-mono text-lg">
                {{ result.m.toString() }}
              </div>
            </UCard>
            <UCard class="p-4">
              <div class="text-xs text-muted">
                Liczba baby steps
              </div>
              <div class="mt-1 font-mono text-lg">
                {{ result.babySteps.length }}
              </div>
            </UCard>
            <UCard class="p-4">
              <div class="text-xs text-muted">
                Giant steps (aktualnie)
              </div>
              <div class="mt-1 font-mono text-lg">
                {{ result.giantSteps.length }}
              </div>
            </UCard>
          </div>

          <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-info"
            title="Co dalej?"
            description="Najpierw budujemy tabelę G^j (baby steps), a potem iterujemy po B·(G^(-m))^i (giant steps), aż trafimy na kolizję."
          />
        </div>

        <div v-else class="space-y-3">
          <UAlert
            color="red"
            variant="subtle"
            icon="i-lucide-triangle-alert"
            title="Nie udało się przygotować obliczeń"
            :description="result.error"
          />
        </div>
      </UCard>

      <UCard v-else-if="current === 1">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-table" class="size-5" />
            <h4 class="font-semibold">
              Baby steps
            </h4>
          </div>
        </template>
        <div v-if="result.ok">
          <BabyStepsTable :rows="result.babySteps" />
        </div>
        <UAlert
          v-else
          color="red"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Brak danych"
          :description="result.error"
        />
      </UCard>

      <UCard v-else-if="current === 2">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-table-properties" class="size-5" />
            <h4 class="font-semibold">
              Giant steps
            </h4>
          </div>
        </template>
        <div v-if="result.ok">
          <GiantStepsTable :rows="result.giantSteps" :match-value="result.match.value" />
        </div>
        <UAlert
          v-else
          color="red"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Brak danych"
          :description="result.error"
        />
      </UCard>

      <UCard v-else-if="current === 3">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-git-compare" class="size-5" />
            <h4 class="font-semibold">
              Dopasowanie (kolizja)
            </h4>
          </div>
        </template>

        <div v-if="result.ok" class="space-y-3">
          <UAlert
            color="primary"
            variant="subtle"
            icon="i-lucide-check"
            title="Znaleziono wspólną wartość"
            :description="`Wartość: ${result.match.value.toString()}`"
          />

          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <UCard class="p-4">
              <div class="text-xs text-muted">
                Giant step indeks i
              </div>
              <div class="mt-1 font-mono text-lg">
                {{ result.match.i.toString() }}
              </div>
            </UCard>
            <UCard class="p-4">
              <div class="text-xs text-muted">
                Baby step indeks j
              </div>
              <div class="mt-1 font-mono text-lg">
                {{ result.match.j.toString() }}
              </div>
            </UCard>
          </div>

          <UCard class="p-4">
            <div class="text-xs text-muted">
              Wzór
            </div>
            <div class="mt-1 font-mono">
              x = i·m + j = {{ result.match.i.toString() }} · {{ result.m.toString() }} + {{ result.match.j.toString() }}
            </div>
          </UCard>
        </div>

        <UAlert
          v-else
          color="red"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Brak dopasowania"
          :description="result.error"
        />
      </UCard>

      <UCard v-else>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-award" class="size-5" />
            <h4 class="font-semibold">
              Wynik
            </h4>
          </div>
        </template>

        <div v-if="result.ok" class="space-y-3">
          <div class="rounded-lg border border-default bg-elevated p-4">
            <div class="text-xs text-muted">
              Rozwiązanie x
            </div>
            <div class="mt-1 font-mono text-2xl font-semibold">
              {{ result.x.toString() }}
            </div>
          </div>

          <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-lightbulb"
            title="Wskazówka"
            description="W kryptografii parametry są ogromne, więc taka wizualizacja jest głównie edukacyjna. Dla bardzo dużych P tabela √(P) robi się zbyt duża dla przeglądarki."
          />
        </div>

        <UAlert
          v-else
          color="red"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Nie znaleziono wyniku"
          :description="result.error"
        />
      </UCard>
    </div>
  </div>
</template>

