<template>
  <UCard class="w-full ring-1 ring-default">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-route" class="size-5" />
        <h3 class="text-lg font-semibold">
          Podejście Baby-step Giant-step (Shanks)
        </h3>
      </div>
    </template>

    <div class="space-y-4 text-sm leading-7">
      <p>
        Algorytm <strong>Baby-step Giant-step</strong> (Daniel Shanks, 1971) to klasyczne podejście typu
        <em>meet-in-the-middle</em>. Zamiast sprawdzać wszystkie wykładniki po kolei, rozbijamy niewiadomą
        <span class="math">x</span> na dwie części:
      </p>

      <div class="rounded-lg border border-default bg-elevated p-4 text-sm">
        <MathTex block tex="x = i\,m + j,\quad m = \lceil\sqrt{n}\rceil" />
      </div>

      <p>
        Dla grupy multiplikatywnej modulo liczby pierwszej <span class="math">P</span> przyjmujemy zwykle
        <span class="math">n = P−1</span>. Po podstawieniu i przekształceniu dostajemy równoważny warunek:
      </p>

      <div class="rounded-lg border border-default bg-elevated p-4 text-sm">
        <MathTex block tex="B\cdot (G^{-m})^{i} \equiv G^{j}\pmod P" />
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <UCard class="p-4">
          <div class="mb-2 flex items-center gap-2">
            <UIcon name="i-lucide-baby" class="size-4 text-primary" />
            <p class="font-semibold">
              Baby steps
            </p>
          </div>
          <p class="text-muted inline-flex items-center gap-1 flex-wrap">
            <span>Liczymy i zapisujemy tabelę wartości</span>
            <MathTex tex="G^{j}\bmod P" />
            <span>dla</span>
            <MathTex tex="j=0,\ldots,m-1" />.
            <span>To koszt pamięci</span>
            <MathTex tex="O(\sqrt{n})" />.
          </p>
        </UCard>

        <UCard class="p-4">
          <div class="mb-2 flex items-center gap-2">
            <UIcon name="i-lucide-mountain" class="size-4 text-primary" />
            <p class="font-semibold">
              Giant steps
            </p>
          </div>
          <p class="text-muted">
            Iterujemy po <span class="math">i</span> i liczymy
            <MathTex tex="B\cdot (G^{-m})^{i}\bmod P" />, aż trafimy na wartość obecną w tabeli baby steps.
          </p>
        </UCard>
      </div>

      <UAlert
        color="neutral"
        variant="subtle"
        icon="i-lucide-timer"
        title="Złożoność"
        description="Czas ~ O(√n) (plus narzut na wyszukiwanie), pamięć O(√n). To duży skok względem brute force O(n), ale nadal rośnie szybko dla kryptograficznie dużych parametrów."
      />
    </div>
  </UCard>
</template>
