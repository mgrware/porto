<template>
  <nav class="sticky top-0 z-50 bg-background/[0.88] backdrop-blur-sm border-b border-outline-variant/45">
    <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
      <NuxtLink to="/#hero" class="flex items-center gap-2.5 shrink-0">
        <span class="w-[22px] h-[22px] border border-primary grid place-items-center">
          <span class="w-2 h-2 bg-primary"></span>
        </span>
        <span class="font-headline text-[0.9375rem] font-semibold -tracking-[0.01em] text-on-surface">Gilang Ramadan</span>
        <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.06em] text-outline">/ backend systems</span>
      </NuxtLink>

      <div class="hidden lg:flex items-center gap-7">
        <NuxtLink
          v-for="item in sheets"
          :key="item.href"
          :to="'/' + item.href"
          :aria-current="activeSection === item.href.replace('#', '') ? 'true' : 'false'"
          :class="[
            'flex items-baseline gap-[0.4375rem] py-1.5 border-b-2 transition-colors',
            activeSection === item.href.replace('#', '')
              ? 'border-primary text-on-surface'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          ]"
        >
          <span
            :class="[
              'text-mono text-[0.625rem]',
              activeSection === item.href.replace('#', '') ? 'text-primary' : 'text-outline'
            ]"
          >{{ item.code }}</span>
          <span class="text-[0.8125rem] font-medium">{{ item.label }}</span>
        </NuxtLink>

        <span class="w-px h-5 bg-outline-variant/50"></span>

        <NuxtLink
          v-for="page in pages"
          :key="page.href"
          :to="page.href"
          :class="[
            'text-[0.8125rem] transition-colors',
            $route.path.startsWith(page.href) ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
          ]"
        >{{ page.label }}</NuxtLink>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <NuxtLink
          v-if="user"
          to="/dashboard"
          class="hidden sm:inline-flex text-mono text-[0.6875rem] tracking-[0.08em] text-on-surface-variant hover:text-on-surface px-2 py-1.5 border border-outline-variant/60 transition-colors"
        >DASHBOARD</NuxtLink>
        <button
          v-if="user"
          class="hidden sm:grid place-items-center w-[34px] h-[34px] border border-outline-variant/60 text-on-surface-variant hover:text-error transition-colors"
          title="Log out"
          @click="logout"
        >
          <BaseIcon class="text-base">logout</BaseIcon>
        </button>

        <a
          href="/uploads/CV Gilang_Ramadan_-_Senior_Backend_Developer.pdf"
          download="gilang_ramadan_-_senior_backend_developer.pdf"
          class="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 border border-primary text-primary hover:bg-primary/[0.14] transition-colors text-mono text-[0.6875rem] tracking-[0.08em]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <path d="M12 3v13" /><path d="M6 12l6 6 6-6" /><path d="M4 21h16" />
          </svg>
          Download CV
        </a>

        <button
          class="lg:hidden grid place-items-center w-[34px] h-[34px] border border-outline-variant/60 text-secondary"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <template v-if="isMobileMenuOpen"><path d="M5 5l14 14" /><path d="M19 5L5 19" /></template>
            <template v-else><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></template>
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden border-t border-outline-variant/35 px-5 sm:px-8 pt-3 pb-5 flex flex-col bg-background/95"
    >
      <NuxtLink
        v-for="(item, index) in [...sheets, ...pages]"
        :key="item.href"
        :to="item.href.startsWith('#') ? '/' + item.href : item.href"
        class="flex items-baseline gap-3 py-2.5 border-b border-outline-variant/20 last:border-b-0"
        @click="isMobileMenuOpen = false"
      >
        <span
          :class="['text-mono text-[0.625rem]', index < sheets.length ? 'text-primary' : 'text-outline']"
        >{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="text-[0.9375rem] text-on-surface">{{ item.label }}</span>
      </NuxtLink>

      <div class="flex flex-col gap-3 pt-4 sm:hidden">
        <a
          href="/uploads/CV Gilang_Ramadan_-_Senior_Backend_Developer.pdf"
          download="gilang_ramadan_-_senior_backend_developer.pdf"
          class="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 border border-primary text-primary text-mono text-[0.6875rem] tracking-[0.08em]"
          @click="isMobileMenuOpen = false"
        >Download CV</a>
        <NuxtLink
          v-if="user"
          to="/dashboard"
          class="text-mono text-[0.6875rem] tracking-[0.08em] text-on-surface-variant"
          @click="isMobileMenuOpen = false"
        >DASHBOARD</NuxtLink>
        <button
          v-if="user"
          class="text-mono text-[0.6875rem] tracking-[0.08em] text-error text-left"
          @click="() => { logout(); isMobileMenuOpen = false }"
        >LOGOUT</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseIcon from '../atoms/BaseIcon.vue'

const { user, logout } = useAuthActions()
const activeSection = ref('')
const isMobileMenuOpen = ref(false)

const sheets = [
  { code: '01', label: 'Overview', href: '#hero' },
  { code: '02', label: 'Tech stack', href: '#stack' },
  { code: '03', label: 'Experience', href: '#experience' },
  { code: '04', label: 'Practice', href: '#architecture' }
]

const pages = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' }
]

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { rootMargin: '-64px 0px -55% 0px', threshold: 0 }
  )

  sheets.forEach(({ href }) => {
    const element = document.getElementById(href.replace('#', ''))
    if (element) observer?.observe(element)
  })
})

onUnmounted(() => observer?.disconnect())
</script>
