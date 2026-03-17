import { inject } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  // Vercel Analytics does not track in development by default,
  // but we also avoid injecting the script during dev explicitly.
  if (import.meta.dev) return

  inject()
})
