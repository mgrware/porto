<template>
  <header class="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 mb-8">
    <div class="min-w-0">
      <div class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary mb-2.5">{{ code }}</div>
      <h1 class="font-headline text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold -tracking-[0.02em] text-on-surface">{{ title }}</h1>
      <p v-if="note" class="text-[0.9375rem] text-on-surface-variant mt-1.5">{{ note }}</p>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
defineProps<{
  code: string
  title: string
  note?: string
}>()
</script>
