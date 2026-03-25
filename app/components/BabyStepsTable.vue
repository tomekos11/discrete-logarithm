<script setup lang="ts">
import type { BabyStepRow } from '~/composables/useBabyGiantStep'

defineProps<{
  rows: BabyStepRow[]
}>()

function format(n: bigint) {
  return n.toString()
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <p class="text-sm text-muted inline-flex items-center gap-1 flex-wrap">
        <span>Prekomputacja wartości</span>
        <MathTex tex="G^{j}\bmod P" />
        <span>dla</span>
        <MathTex tex="j=0,\ldots,m-1" />
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
              j
            </th>
            <th class="px-3 py-2 text-left font-semibold">
              <MathTex tex="G^{j}\bmod P" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.j.toString()"
            class="border-t border-default"
          >
            <td class="px-3 py-2 font-mono">
              {{ format(row.j) }}
            </td>
            <td class="px-3 py-2 font-mono">
              {{ format(row.value) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

