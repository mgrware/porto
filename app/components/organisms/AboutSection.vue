<template>
  <section id="about" class="py-20 bg-surface-container/20 scroll-mt-24">
    <div class="max-w-6xl mx-auto px-4">
      <SheetHeading :title="m.about.title" :note="m.about.note" />

      <div v-reveal class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-16">
        <img
          src="~/assets/images/avatar.jpg"
          alt="Gilang Ramadan"
          class="w-36 h-36 shrink-0 rounded-3xl object-cover ring-4 ring-primary/40 shadow-xl shadow-primary/20"
        />
        <p class="text-lg md:text-xl text-on-surface-variant leading-relaxed text-center md:text-left">
          {{ m.hero.bio }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="stat in m.hero.stats"
          :key="stat.label"
          v-reveal
          class="group relative overflow-hidden glass glass-hover p-6 md:p-8 text-center"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <div class="relative">
            <div class="font-headline text-2xl md:text-4xl font-bold text-gradient mb-2 inline-flex items-center gap-2">
              <span v-if="stat.running" class="w-2.5 h-2.5 rounded-full bg-secondary animate-bp-pulse"></span>
              {{ stat.value }}
            </div>
            <div class="text-xs md:text-sm font-medium tracking-wider text-on-surface-variant">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SheetHeading from '../molecules/SheetHeading.vue'

const { m } = useLocale()
</script>
