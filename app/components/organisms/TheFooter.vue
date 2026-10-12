<template>
  <footer class="py-10 bg-surface-container/30 border-t border-outline-variant/30 backdrop-blur-sm">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
      <p class="text-sm text-on-surface-variant text-center md:text-left">
        © {{ year }} <span class="text-gradient font-bold">Gilang Ramadan</span>. {{ m.footer.copyright }}
      </p>

      <div class="flex gap-3">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="icon-btn !w-11 !h-11 hover:scale-110 hover:-translate-y-1"
        >
          <BaseIcon class="text-xl">{{ social.icon }}</BaseIcon>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import { socials } from '~/composables/useSocials'

const year = new Date().getFullYear()
const { m } = useLocale()
</script>
