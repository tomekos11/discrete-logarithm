<script setup lang="ts">
import type { GiantStepRow } from '~/composables/useBabyGiantStep'

const props = defineProps<{
  rows: GiantStepRow[]
  matchValue?: bigint
}>()

function format(n: bigint) {
  return n.toString()
}

function isMatch(value: bigint) {
  return props.matchValue !== undefined && value === props.matchValue
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <p class="text-sm text-muted">
        Iteracja po <MathTex tex="B\cdot (G^{-m})^{i}\bmod P" /> dla <MathTex tex="i = 0..m-1" />.
      </p>
      <UBadge color="neutral" variant="subtle">
        {{ rows.length }} wierszy
      </UBadge>
    </div>

    <div class="overflow-auto rounded-lg border border-default">
      <table class="min-w-full text-sm">
        <thead class="bg-elevated">
          <tr>
            <th class="px-3 py-2 text-left font-semibold">
              i
            </th>
            <th class="px-3 py-2 text-left font-semibold">
              <MathTex tex="B\cdot (G^{-m})^{i}\bmod P" />
            </th>
            <th class="px-3 py-2 text-left font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.i.toString()"
            class="border-t border-default"
            :class="isMatch(row.value) ? 'bg-primary/10' : undefined"
          >
            <td class="px-3 py-2 font-mono">
              {{ format(row.i) }}
            </td>
            <td class="px-3 py-2 font-mono">
              {{ format(row.value) }}
            </td>
            <td class="px-3 py-2">
              <UBadge
                v-if="isMatch(row.value)"
                color="primary"
                variant="subtle"
                icon="i-lucide-check"
              >
                trafienie
              </UBadge>
              <span v-else class="text-muted text-xs">
                —
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

