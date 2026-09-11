<template>
  <div v-reveal class="flex flex-wrap items-end gap-x-6 gap-y-4 mb-8">
    <div class="min-w-0">
      <div class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary mb-2.5">{{ m.sheet }} {{ sheet }}</div>
      <h2 class="font-headline text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold -tracking-[0.02em] text-on-surface">
        {{ title }}
      </h2>
    </div>
    <span class="flex-1 basis-24 h-px bg-outline-variant/45 mb-3"></span>
    <p class="text-[0.9375rem] text-outline max-w-sm mb-2">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
const { m } = useLocale()
defineProps<{
  sheet: string
  title: string
  note: string
}>()
</script>
