<template>
  <span 
    class="material-symbols-outlined"
    :style="filled ? 'font-variation-settings: \'FILL\' 1;' : ''"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  filled?: boolean
}>()
</script>
