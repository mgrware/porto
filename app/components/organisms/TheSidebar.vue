<template>
  <aside class="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 bg-background border-r border-surface-container-high z-40 hidden md:flex">
    <div class="mt-20 flex flex-col gap-10 items-center">
      <NuxtLink 
        v-for="item in sideItems" 
        :key="item.icon"
        :to="item.href.startsWith('#') ? '/' + item.href : item.href"
        :class="[
          'group cursor-pointer flex flex-col items-center gap-1 p-2 w-full transition-all duration-200',
          (item.href.startsWith('#') ? activeSection === item.href.replace('#', '') : $route.path === item.href) 
            ? 'text-primary border-l-4 border-primary bg-surface-container' 
            : 'text-outline hover:text-secondary'
        ]"
      >
        <BaseIcon :filled="(item.href.startsWith('#') ? activeSection === item.href.replace('#', '') : $route.path === item.href)">{{ item.icon }}</BaseIcon>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'

const { user } = useAuthActions()
const activeSection = ref('')

const sideItems = computed(() => {
  const items = [
    { icon: 'terminal', href: '#terminal' },
    { icon: 'memory', href: '#tech-stack' },
    { icon: 'account_tree', href: '#experience' },
    { icon: 'alternate_email', href: '#architecture' },
    { icon: 'folder', href: '/projects' },
    { icon: 'article', href: '/blog' },
  ]

  if (user.value) {
    items.push({ icon: 'dashboard', href: '/dashboard' })
  }

  return items
})

const scrollToSection = (href: string) => {
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    const offset = 64
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

  const sections = ['terminal', 'tech-stack', 'experience', 'architecture']
  sections.forEach((id) => {
    const element = document.getElementById(id)
    if (element) observer?.observe(element)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
