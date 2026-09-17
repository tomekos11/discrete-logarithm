<template>
  <UApp>
    <UHeader
      v-model:open="mobileNavOpen"
      mode="slideover"
      class="sticky top-0 z-40 border-b border-default/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70"
    >
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
        <div class="flex items-center gap-1">
          <UColorModeButton />

          <UButton
            to="/#kalkulator"
            icon="i-lucide-play"
            aria-label="Przejdź do kalkulatora"
            color="neutral"
            variant="ghost"
            class="hidden sm:inline-flex"
          />
        </div>
      </template>

      <template #body>
        <nav class="flex h-full flex-col gap-2 p-2">
          <NuxtLink
            to="/"
            class="flex flex-col items-start rounded-md px-3 py-2 leading-tight hover:bg-elevated"
            @click="() => { mobileNavOpen = false }"
          >
            <span class="whitespace-nowrap text-sm font-semibold tracking-tight text-foreground">
              DLOG Visualizer
            </span>
            <span class="whitespace-nowrap text-sm font-semibold tracking-tight text-primary">
              Baby-step Giant-step
            </span>
          </NuxtLink>

          <USeparator class="my-1" />

          <UButton
            to="/#kalkulator"
            color="neutral"
            variant="ghost"
            icon="i-lucide-calculator"
            label="Kalkulator"
            class="justify-start"
            @click="() => { mobileNavOpen = false }"
          />
          <UButton
            to="/#teoria"
            color="neutral"
            variant="ghost"
            icon="i-lucide-book-open"
            label="Teoria"
            class="justify-start"
            @click="() => { mobileNavOpen = false }"
          />
          <UButton
            to="/#algorytm"
            color="neutral"
            variant="ghost"
            icon="i-lucide-route"
            label="Algorytm"
            class="justify-start"
            @click="() => { mobileNavOpen = false }"
          />
          <UButton
            to="/#faq"
            color="neutral"
            variant="ghost"
            icon="i-lucide-circle-help"
            label="FAQ"
            class="justify-start"
            @click="() => { mobileNavOpen = false }"
          />

          <USeparator class="mt-auto mb-1" />

          <div class="px-3 py-2 text-sm text-muted">
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
        </nav>
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
    </UFooter>
  </UApp>
</template>

<script setup lang="ts">
const mobileNavOpen = ref(false)

const siteName = 'DLog Visualizer'
const title = 'Logarytm dyskretny (DLP) — Baby-step Giant-step'
const description = 'Edukacyjne narzędzie do obliczania logarytmu dyskretnego (DLP) z wizualizacją krok po kroku algorytmu Baby-step Giant-step.'

const route = useRoute()
const siteConfig = useSiteConfig()
const canonicalUrl = computed(() => new URL(route.path || '/', siteConfig.url).toString())

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
    { rel: 'canonical', href: canonicalUrl.value }
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
