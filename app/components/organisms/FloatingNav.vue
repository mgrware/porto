<template>
  <!-- Mobile: floating button with a pop-up list -->
  <div class="fixed bottom-6 right-6 z-50 md:hidden">
    <button
      class="w-14 h-14 rounded-full grid place-items-center text-on-primary bg-gradient-to-r from-primary to-primary-container shadow-lg shadow-primary/40 hover:scale-110 transition-all duration-300"
      :aria-expanded="open"
      :aria-label="m.nav.toggleNav"
      @click="open = !open"
    >
      <BaseIcon class="text-2xl">{{ open ? 'close' : 'explore' }}</BaseIcon>
    </button>

    <div v-if="open" class="absolute bottom-20 right-0 glass bg-surface-container/95 p-2 shadow-2xl min-w-[12rem]">
      <a
        v-for="(item, index) in m.nav.sheets"
        :key="item.href"
        :href="item.href"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
          active === index ? 'bg-gradient-to-r from-primary to-primary-container text-on-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-on-surface/5'
        ]"
        @click="open = false"
      >
        <BaseIcon class="text-xl">{{ icons[index] }}</BaseIcon>
        {{ item.label }}
      </a>
    </div>
  </div>

  <!-- Desktop: vertical pill on the right edge -->
  <nav class="fixed top-1/2 -translate-y-1/2 right-6 lg:right-8 z-50 hidden md:block" :aria-label="m.nav.toggleNav">
    <div class="relative glass bg-surface-container/80 backdrop-blur-xl rounded-3xl p-2 shadow-2xl shadow-primary/20">
      <div class="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl -z-10"></div>
      <div
        class="absolute left-2 top-2 w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-primary-container transition-transform duration-500 ease-out"
        :style="{ transform: `translateY(${active * 56}px)` }"
      ></div>

      <div class="relative flex flex-col gap-2">
        <a
          v-for="(item, index) in m.nav.sheets"
          :key="item.href"
          :href="item.href"
          :aria-current="active === index ? 'true' : undefined"
          :class="[
            'group relative w-12 h-12 grid place-items-center rounded-2xl transition-colors duration-300',
            active === index ? 'text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
          ]"
        >
          <BaseIcon class="text-xl">{{ icons[index] }}</BaseIcon>
          <span class="absolute right-16 px-4 py-2 rounded-xl glass bg-surface-container text-sm font-medium text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none transition-opacity duration-300 shadow-xl">
            {{ item.label }}
          </span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'

const { m } = useLocale()
const icons = ['home', 'person', 'code', 'work', 'architecture', 'mail']
const active = ref(0)
const open = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  const ids = m.value.nav.sheets.map(({ href }) => href.slice(1))
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = ids.indexOf(entry.target.id)
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => observer?.disconnect())
</script>
