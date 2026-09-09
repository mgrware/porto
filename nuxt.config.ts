// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
      ],
      // v-reveal hides content until it scrolls in; without JS it never would.
      noscript: [
        { innerHTML: '<style>[data-reveal]{opacity:1!important;transform:none!important}</style>' }
      ]
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  supabase: {
    redirect: false
  }
})
