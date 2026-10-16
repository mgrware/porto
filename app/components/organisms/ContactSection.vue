<template>
  <section id="contact" class="py-20 scroll-mt-24">
    <div class="max-w-6xl mx-auto px-4">
      <SheetHeading :title="m.footer.heading" :note="m.footer.body" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <a
          v-for="social in socials"
          :key="social.label"
          v-reveal
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-5 glass glass-hover p-6"
        >
          <span class="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-outline-variant/30 text-primary group-hover:scale-110 transition-transform duration-300">
            <BaseIcon class="text-2xl">{{ social.icon }}</BaseIcon>
          </span>
          <span class="min-w-0">
            <span class="block text-sm text-outline mb-1">{{ social.label }}</span>
            <span class="block font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
              {{ social.link.replace('https://', '') }}
            </span>
          </span>
          <BaseIcon class="ml-auto text-xl text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_outward</BaseIcon>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import SheetHeading from '../molecules/SheetHeading.vue'
import { socials } from '~/composables/useSocials'

const { m } = useLocale()
</script>
