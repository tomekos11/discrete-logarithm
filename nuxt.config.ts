// https://nuxt.com/docs/api/configuration/nuxt-config
import { env } from 'node:process'

export default defineNuxtConfig({
  modules: [
    'nuxt-security',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vercel/analytics',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Kanoniczny URL dla SEO / sitemap. Na Vercelu ustaw NUXT_SITE_URL na tę samą
  // domenę co w przeglądarce (np. https://discrete-logarithm.tomasz-slapinski.pl),
  // inaczej przy braku zmiennej użyty zostanie fallback poniżej.
  site: {
    url:
      env.NUXT_SITE_URL
      || 'https://discrete-logarithm.tomasz-slapinski.pl',
    name: 'DLog Visualizer',
    trailingSlash: false
  },

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
  },

  // OWASP / Helmet-like nagłówki + CSP z nuxt-security. W prod dokładamy
  // connect-src (telemetria Vercel Analytics / skrypt dev).
  security: {
    headers: {
      contentSecurityPolicy: {
        ...(env.NODE_ENV === 'production'
          ? {
              'connect-src': [
                '\'self\'',
                'https://vitals.vercel-insights.com',
                'https://va.vercel-scripts.com'
              ]
            }
          : {})
      }
    }
  },

  sitemap: {
    strictNuxtContentPaths: true,
    // Only static pages; build-time sitemap, no runtime
    zeroRuntime: true
  }
})
