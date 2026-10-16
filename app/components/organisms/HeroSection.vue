<template>
  <section id="hero" class="min-h-[calc(100vh-5rem)] flex items-center justify-center relative px-4 py-20 scroll-mt-24">
    <div class="max-w-5xl mx-auto text-center">
      <div v-reveal class="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass text-sm text-on-surface-variant">
        <span class="w-2 h-2 rounded-full bg-primary animate-bp-pulse"></span>
        {{ m.hero.open }}
        <span class="hidden sm:inline text-outline">· {{ m.hero.location }}</span>
      </div>

      <h1 v-reveal class="font-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-on-surface mb-6 text-balance">
        {{ m.hero.title[0] }}<br />
        <span class="text-gradient">{{ m.hero.title[1] }}</span>
      </h1>

      <p v-reveal class="text-lg md:text-2xl text-on-surface-variant mb-10 max-w-3xl mx-auto leading-relaxed">
        {{ m.hero.subtitle }}
      </p>

      <div v-reveal class="flex gap-4 justify-center flex-wrap mb-12">
        <a href="#projects" class="btn-primary !px-8 !py-4 !text-base">
          {{ m.hero.viewProjects }}
          <BaseIcon class="text-lg">arrow_forward</BaseIcon>
        </a>
        <a href="#experience" class="btn-ghost !px-8 !py-4 !text-base">
          {{ m.hero.experienceLog }}
        </a>
      </div>

      <div v-reveal class="flex gap-5 justify-center">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="p-4 rounded-2xl glass text-on-surface-variant hover:text-on-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-container hover:border-transparent hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-primary/40 transition-all duration-300"
        >
          <BaseIcon class="text-2xl">{{ social.icon }}</BaseIcon>
        </a>
      </div>
    </div>

    <a href="#about" class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-outline hover:text-primary" aria-label="Scroll">
      <BaseIcon class="text-3xl">arrow_downward</BaseIcon>
    </a>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import { socials } from '~/composables/useSocials'

const { m } = useLocale()
</script>
