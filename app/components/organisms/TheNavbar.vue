<template>
  <nav class="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-background/80 backdrop-blur-sm border-b border-surface-container-high">
    <div class="text-xl font-bold tracking-tighter text-primary font-headline">ROOT@SYSTEM</div>
    
    <div class="hidden md:flex gap-8 items-center">
      <template v-for="item in navItems" :key="item.label">
        <NuxtLink 
          :to="item.href.startsWith('#') ? '/' + item.href : item.href"
          :class="[
            'font-headline uppercase tracking-widest text-xs transition-colors',
            (item.href.startsWith('#') ? activeSection === item.href.replace('#', '') : $route.path === item.href) 
              ? 'text-primary border-l-2 border-primary pl-2' 
              : 'text-on-surface-variant hover:text-primary'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </template>
    </div>

    <div class="flex items-center gap-4">
      <NuxtLink v-if="user" to="/dashboard" class="hidden sm:block text-xs font-mono uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 rounded-lg hover:bg-primary/10 transition-colors">
        DASHBOARD
      </NuxtLink>
      <button v-if="user" @click="logout" class="hidden sm:block material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">
        logout
      </button>
      <ThemeToggle />
      <a 
        href="/uploads/CV Gilang_Ramadan_-_Senior_Backend_Developer.pdf" 
        download="gilang_ramadan_-_senior_backend_developer.pdf"
        class="hidden sm:block"
      >
        <BaseButton variant="primary" size="sm">
          DOWNLOAD_CV
        </BaseButton>
      </a>
      <button 
        class="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span class="material-symbols-outlined">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="absolute top-16 left-0 w-full bg-background border-b border-surface-container-high md:hidden flex flex-col px-8 py-6 gap-6 shadow-xl z-40"
    >
      <template v-for="item in navItems" :key="item.label">
        <NuxtLink 
          :to="item.href.startsWith('#') ? '/' + item.href : item.href"
          @click="isMobileMenuOpen = false"
          :class="[
            'font-headline uppercase tracking-widest text-sm transition-colors',
            (item.href.startsWith('#') ? activeSection === item.href.replace('#', '') : $route.path === item.href) 
              ? 'text-primary border-l-2 border-primary pl-2' 
              : 'text-on-surface-variant hover:text-primary'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </template>

      <div class="flex flex-col gap-4 pt-4 border-t border-surface-container-high sm:hidden">
        <NuxtLink v-if="user" to="/dashboard" @click="isMobileMenuOpen = false" class="text-sm font-mono uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
          DASHBOARD
        </NuxtLink>
        <button v-if="user" @click="() => { logout(); isMobileMenuOpen = false }" class="text-sm font-mono uppercase tracking-widest text-error hover:text-error/80 transition-colors text-left">
          LOGOUT
        </button>
        <a 
          href="/uploads/CV Gilang_Ramadan_-_Senior_Backend_Developer.pdf" 
          download="gilang_ramadan_-_senior_backend_developer.pdf"
          class="block w-full"
          @click="isMobileMenuOpen = false"
        >
          <BaseButton variant="primary" size="sm" class="w-full">
            DOWNLOAD_CV
          </BaseButton>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '../atoms/BaseButton.vue'
import ThemeToggle from '../molecules/ThemeToggle.vue'

const { user, logout } = useAuthActions()
const activeSection = ref('')
const isMobileMenuOpen = ref(false)

const navItems = [
  { label: 'TERMINAL', href: '#terminal' },
  { label: 'TECH_STACK', href: '#tech-stack' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ARCHITECTURE', href: '#architecture' },
  { label: 'BLOG', href: '/blog' },
]

const scrollToSection = (href: string) => {
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    const offset = 64 // Navbar height
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-64px 0px -50% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  const sections = ['architecture', 'tech-stack', 'experience', 'terminal']
  sections.forEach((id) => {
    const element = document.getElementById(id)
    if (element) observer?.observe(element)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
