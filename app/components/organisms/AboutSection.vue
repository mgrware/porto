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

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="figure in m.hero.figures"
          :key="figure.value + figure.source"
          v-reveal
          class="group relative overflow-hidden glass glass-hover p-6 flex flex-col"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <div class="relative flex flex-col flex-1">
            <div class="font-headline text-3xl md:text-4xl font-bold text-gradient mb-2">{{ figure.value }}</div>
            <p class="text-sm leading-relaxed text-on-surface-variant mb-4">{{ figure.label }}</p>
            <p class="mt-auto text-xs text-outline">{{ figure.source }}</p>
          </div>
        </div>
      </div>
      <p class="text-center text-xs text-outline mt-6">{{ m.hero.figuresNote }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SheetHeading from '../molecules/SheetHeading.vue'

const { m } = useLocale()
</script>
