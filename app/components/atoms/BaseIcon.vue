<template>
  <span 
    class="material-symbols-outlined"
    :style="[
      filled ? 'font-variation-settings: \'FILL\' 1;' : '',
      'font-family: \'Material Symbols Outlined\';'
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  filled?: boolean
}>()
</script>
