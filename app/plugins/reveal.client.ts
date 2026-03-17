export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      const opts = (binding.value && typeof binding.value === 'object')
        ? binding.value as { threshold?: number, rootMargin?: string, once?: boolean }
        : {}

      el.classList.add('revealOnEnter')

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        el.classList.add('is-visible')
        return
      }

      const threshold = opts.threshold ?? 0.15
      const rootMargin = opts.rootMargin ?? '0px 0px -10% 0px'
      const once = opts.once ?? true

      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            if (once) io.unobserve(el)
          } else if (!once) {
            el.classList.remove('is-visible')
          }
        }
      }, { threshold, rootMargin })

      io.observe(el)

      // store for cleanup
      ;(el as any).__revealIo = io
    },
    unmounted(el) {
      const io = (el as any).__revealIo as IntersectionObserver | undefined
      if (io) io.disconnect()
    }
  })
})

