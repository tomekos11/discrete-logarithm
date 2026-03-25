<template>
  <div>
    <UPageHero
      title="Logarytm dyskretny"
      description="Wpisz parametry i zobacz, jak algorytm Shanksa prowadzi krok po kroku do wyniku."
      :links="[{
        label: 'Przejdź do kalkulatora',
        to: '/#kalkulator',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }]"
    >
      <template #title>
        <span class="inline-flex w-full max-w-full flex-col items-start leading-tight sm:items-center">
          <span class="max-w-full text-[0.92em] whitespace-normal wrap-break-word text-center sm:whitespace-nowrap">
            Logarytm dyskretny
          </span>
          <TypewriterHeaderTitle class="max-w-full text-[0.6em] text-primary sm:text-[1em] sm:text-primary h-[40px]" />
        </span>
      </template>
    </UPageHero>

    <div class="mx-auto -mt-6 mb-10 max-w-5xl px-4">
      <div class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated px-4 py-2 text-sm text-muted">
        <span>Rozwiązujemy:</span>
        <MathTex tex="G^{x} \equiv B\pmod P" />
      </div>
    </div>

    <div
      v-reveal
      class="sectionBackplate"
    >
      <UPageSection
        id="kalkulator"
        title="Kalkulator"
        description="Wprowadź parametry i przejdź przez obliczenia krok po kroku."
        class="relative"
      >
        <div class="mx-auto max-w-5xl">
          <BabyGiantCalculator />
        </div>
      </UPageSection>
    </div>

    <div
      v-reveal
      class="sectionBackplate sectionBackplate--alt"
    >
      <UPageSection
        id="teoria"
        title="Teoria"
        description="Czym jest logarytm dyskretny i dlaczego jest ważny?"
        class="relative"
      >
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6">
          <DiscreteLogTheory />
        </div>
      </UPageSection>
    </div>

    <div
      v-reveal
      class="sectionBackplate"
    >
      <UPageSection
        id="algorytm"
        title="Baby-step Giant-step"
        description="Intuicja meet-in-the-middle oraz złożoność."
        class="relative"
      >
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6">
          <BabyGiantApproach />
        </div>
      </UPageSection>
    </div>

    <div
      v-reveal
      class="sectionBackplate sectionBackplate--alt"
    >
      <UPageSection
        id="faq"
        title="FAQ"
        description="Najczęstsze pytania i odpowiedzi."
        class="relative"
      >
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6">
          <DiscreteLogFAQ />
        </div>
      </UPageSection>
    </div>
  </div>
</template>
