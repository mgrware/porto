<template>
  <button
    class="flex items-center justify-center p-2 rounded-none hover:bg-surface-container transition-all text-on-surface-variant hover:text-primary"
    @click="toggleTheme"
  >
    <BaseIcon v-if="colorMode.value === 'dark'">light_mode</BaseIcon>
    <BaseIcon v-else>dark_mode</BaseIcon>
  </button>

</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
