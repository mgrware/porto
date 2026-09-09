// v-reveal — fade/rise an element the first time it scrolls into view.
// Registered on both server and client: SSR renders the hidden state via
// getSSRProps (no hydration flash), the observer only exists in the browser.
// ponytail: one shared observer, styles live in main.css.
let observer: IntersectionObserver | null = null

const watcher = () =>
  (observer ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-reveal', 'shown')
        observer?.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  ))

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({ 'data-reveal': '' }),
    mounted: (el: HTMLElement) => {
      el.setAttribute('data-reveal', '')
      watcher().observe(el)
    },
    unmounted: (el: HTMLElement) => observer?.unobserve(el)
  })
})
