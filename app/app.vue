<script setup>
const siteName = 'DLog Visualizer'
const title = 'Logarytm dyskretny (DLP) — Baby-step Giant-step'
const description = 'Edukacyjne narzędzie do obliczania logarytmu dyskretnego (DLP) z wizualizacją krok po kroku algorytmu Baby-step Giant-step.'

const route = useRoute()
const canonicalPath = computed(() => (route.path || '/'))

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: description },
    { name: 'application-name', content: siteName },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    { name: 'theme-color', content: '#00DC82' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg' },
    // Relative canonical (works in dev + static hosting without knowing base URL)
    { rel: 'canonical', href: canonicalPath.value }
  ],
  htmlAttrs: {
    lang: 'pl'
  }
})

useSeoMeta({
  title,
  description,
  ogSiteName: siteName,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'pl_PL',
  ogImage: '/og.png',
  ogImageAlt: 'Logarytm dyskretny Baby-step Giant-step (wizualizacja)',
  twitterImage: '/og.png',
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="hidden sm:flex flex-col items-start leading-tight"
        >
          <span class="whitespace-nowrap text-sm font-semibold tracking-tight text-foreground">
            DLOG Visualizer
          </span>
          <span class="whitespace-nowrap text-sm font-semibold tracking-tight text-primary">
            Baby-step Giant-step
          </span>
        </NuxtLink>

        <TemplateMenu />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="/#kalkulator"
          icon="i-lucide-play"
          aria-label="Przejdź do kalkulatora"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span>Baby-step Giant-step • © {{ new Date().getFullYear() }}</span>
          <span class="opacity-60">•</span>
          <NuxtLink
            to="/licencja"
            rel="nofollow"
            class="underline decoration-dotted underline-offset-4 hover:text-foreground"
          >
            Licencja (MIT)
          </NuxtLink>
          <span class="opacity-60">•</span>
          <span class="whitespace-nowrap">
            Strona:
            <a
              href="https://cv.tomasz-slapinski.pl"
              rel="nofollow"
              target="_blank"
              class="underline decoration-dotted underline-offset-4 hover:text-foreground"
            >Tomasz Słapiński</a>
          </span>
        </div>
      </template>

      <template #right>
        <div class="flex items-center gap-1">
          <UButton
            to="/#kalkulator"
            icon="i-lucide-calculator"
            aria-label="Kalkulator"
            color="neutral"
            variant="ghost"
          />
          <UButton
            to="/#teoria"
            icon="i-lucide-book-open"
            aria-label="Teoria"
            color="neutral"
            variant="ghost"
          />
          <UButton
            to="/#algorytm"
            icon="i-lucide-route"
            aria-label="Baby-step Giant-step"
            color="neutral"
            variant="ghost"
          />
          <UButton
            to="/#faq"
            icon="i-lucide-circle-help"
            aria-label="FAQ"
            color="neutral"
            variant="ghost"
          />

          <AppLogo
            class="ml-2 h-5 w-auto text-muted"
            aria-hidden="true"
          />
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
