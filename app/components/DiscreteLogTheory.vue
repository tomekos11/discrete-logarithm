<script setup lang="ts">
const example = {
  g: '2',
  p: '5',
  x: '3',
  b: '3'
}
</script>

<template>
  <UCard class="w-full ring-1 ring-default">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-book-open" class="size-5" />
        <h3 class="text-lg font-semibold">
          Problem logarytmu dyskretnego
        </h3>
      </div>
    </template>

    <div class="space-y-4 text-sm leading-7">
      <p>
        <strong>Logarytm dyskretny</strong> to „odwrotność” potęgowania w arytmetyce modularnej.
        Interesuje nas znalezienie wykładnika <span class="math">x</span>, który spełnia równanie:
      </p>

      <div class="rounded-lg border border-default bg-elevated p-4 text-sm">
        <MathTex block tex="G^{x} \equiv B\pmod P" />
      </div>

      <p>
        W praktyce najczęściej rozważamy grupę multiplikatywną <span class="math">Z_P^*</span>,
        gdzie <span class="math">P</span> jest liczbą pierwszą, a <span class="math">G</span> jest generatorem.
        Wtedy dla wielu wartości <span class="math">B</span> istnieje rozwiązanie.
      </p>

      <div class="rounded-lg border border-default p-4">
        <div class="mb-2 flex items-center gap-2">
          <UIcon name="i-lucide-flask-conical" class="size-4 text-primary" />
          <p class="font-semibold">
            Przykład
          </p>
        </div>
        <p class="text-muted">
          Szukamy <MathTex tex="x" /> takiego, że
          <MathTex :tex="`${example.g}^{x} \\equiv ${example.b}\\pmod ${example.p}`" />.
          Widać, że <MathTex :tex="`${example.g}^{${example.x}} = 8`" />, a <MathTex :tex="`8\\bmod ${example.p} = ${example.b}`" />,
          więc <MathTex :tex="`x = ${example.x}`" />.
        </p>
      </div>

      <p>
        Problem jest ważny w kryptografii: jego „trudność” jest fundamentem m.in. <strong>Diffie–Hellmana</strong> oraz <strong>ElGamala</strong>.
        Dla dużych parametrów nie znamy algorytmu, który rozwiązuje go w czasie wielomianowym w ogólności.
      </p>
    </div>
  </UCard>
</template>
