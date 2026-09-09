<template>
  <div class="flex items-center gap-4 mb-7 lg:mb-9">
    <span class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary shrink-0">SHEET {{ sheet }}</span>
    <span class="flex-1 h-px bg-outline-variant/45"></span>
    <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.14em] text-outline text-right">{{ caption }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sheet: string
  caption: string
}>()
</script>
