<script setup lang="ts">
const items = [
  {
    label: 'Co to jest logarytm dyskretny?',
    slot: 'dlpDefinition'
  },
  {
    label: 'Dlaczego ten problem jest ważny w kryptografii?',
    content:
      'Bezpieczeństwo popularnych schematów (np. Diffie–Hellman, ElGamal) opiera się na założeniu, że dla dużych parametrów logarytm dyskretny jest bardzo trudny do obliczenia.'
  },
  {
    label: 'Jak działa Baby-step Giant-step w jednym zdaniu?',
    slot: 'bsgsOneSentence',
    content:
      'Dzieli szukany wykładnik na x = i·m + j, buduje tabelę G^j (baby steps), a następnie iteruje po B·(G^(-m))^i (giant steps), aż znajdzie wspólną wartość.'
  },
  {
    label: 'Jaka jest złożoność algorytmu?',
    content:
      'W przybliżeniu O(√n) czasu i O(√n) pamięci, gdzie n to rząd grupy (dla Z_P^* zwykle n = P−1). To znacznie lepsze niż brute force O(n), ale pamięć może być ograniczeniem.'
  },
  {
    label: 'Czy zawsze istnieje rozwiązanie?',
    content:
      'Nie zawsze. Zależy od tego, czy B należy do podgrupy generowanej przez G oraz czy działamy w poprawnie dobranej grupie. Dla P pierwszego i G generatora, rozwiązania istnieją dla wszystkich B ≠ 0 (mod P).'
  },
  {
    label: 'Jakie są ograniczenia tej wizualizacji?',
    content:
      'Dla bardzo dużych P (np. kryptograficznych) liczba kroków √(P) jest ogromna, więc przeglądarka nie udźwignie tabel. Narzędzie jest przede wszystkim edukacyjne.'
  },
  {
    label: 'Czy są inne algorytmy?',
    content:
      'Tak: Pollard Rho dla DLP (również ~O(√n), ale mniejsze zużycie pamięci), a dla pewnych grup także algorytmy subeksponencjalne (np. index calculus).'
  }
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Co to jest logarytm dyskretny?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'To zadanie znalezienia x spełniającego równanie G^x ≡ B (mod P) w pewnej grupie (najczęściej modulo liczby pierwszej). To „odwrotność” potęgowania modularnego.'
            }
          },
          ...items
            .filter(i => i.label && i.content)
            .map(i => ({
              '@type': 'Question',
              'name': i.label,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': i.content
              }
            }))
        ]
      })
    }
  ]
})
</script>

<template>
  <UCard class="w-full ring-1 ring-default">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-circle-help"
          class="size-5"
        />
        <h3 class="text-lg font-semibold">
          FAQ
        </h3>
      </div>
    </template>

    <div class="w-full min-w-0 max-w-full">
      <UAccordion
        :items="items"
        class="w-full min-w-0 max-w-full"
        :unmount-on-hide="false"
        :ui="{
          item: 'w-full min-w-0 max-w-full',
          trigger: 'w-full min-w-0 max-w-full',
          label: 'min-w-0',
          content: 'w-full min-w-0 max-w-full whitespace-normal [overflow-wrap:anywhere]',
          body: 'faq-answer text-sm text-muted leading-7 min-w-0 max-w-full pb-3.5'
        }"
      >
        <template #dlpDefinition>
          <p class="faq-answer text-sm text-muted leading-7">
            To zadanie znalezienia <MathTex tex="x" /> spełniającego równanie
            <MathTex tex="G^{x} \equiv B \pmod{P}" />
            w pewnej grupie (najczęściej modulo liczby pierwszej). To „odwrotność” potęgowania modularnego.
          </p>
        </template>
        <template #bsgsOneSentence>
          <p class="faq-answer text-sm text-muted leading-7">
            Dzieli szukany wykładnik na <MathTex tex="x=i\cdot m + j" />, buduje tabelę
            <MathTex tex="G^{j}" /> (baby steps), a następnie iteruje po
            <MathTex tex="B\cdot (G^{-m})^{i}" /> (giant steps), aż znajdzie wspólną wartość.
          </p>
        </template>
      </UAccordion>
    </div>
  </UCard>
</template>

<style scoped>
/* Inline KaTeX uses nowrap — cap width so lines stay in the viewport (scroll inside formula if needed). */
.faq-answer :deep(.katexWrap) {
  display: inline-block;
  max-width: 100%;
  overflow-x: auto;
  vertical-align: text-bottom;
}
</style>
