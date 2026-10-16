<template>
  <label class="flex items-center gap-3 glass px-4 max-w-xl mb-6 focus-within:border-primary/60 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary transition-colors">
    <BaseIcon class="text-xl text-outline" aria-hidden="true">search</BaseIcon>
    <span class="sr-only">{{ placeholder }}</span>
    <input
      v-model="model"
      type="search"
      :placeholder="placeholder"
      class="flex-1 min-w-0 bg-transparent border-0 outline-none py-3.5 text-sm text-on-surface placeholder:text-outline"
    />
  </label>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const model = defineModel<string>({ default: '' })
defineProps<{ placeholder: string }>()
</script>
