// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vercel/analytics',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: process.env.NUXT_SITE_URL || 'https://discrete-logarithm.vercel.app',
    name: 'DLog Visualizer'
  },

  sitemap: {
    strictNuxtContentPaths: true,
    // Only static pages; build-time sitemap, no runtime
    zeroRuntime: true
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/licencja': { prerender: true },
    '/sitemap.xml': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})