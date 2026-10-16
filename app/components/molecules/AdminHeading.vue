<template>
  <header class="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 mb-10">
    <div class="min-w-0">
      <div class="inline-flex items-center px-3 py-1 mb-4 rounded-full glass text-xs font-semibold tracking-wider text-primary">{{ code }}</div>
      <h1 class="font-headline text-4xl md:text-5xl font-bold text-on-surface">
        {{ head }} <span class="text-gradient">{{ tail }}</span>
      </h1>
      <p v-if="note" class="text-on-surface-variant mt-2">{{ note }}</p>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  title: string
  note?: string
}>()

// Last word gets the gradient accent, same as the public section headings.
const words = computed(() => props.title.trim().split(' '))
const head = computed(() => words.value.slice(0, -1).join(' '))
const tail = computed(() => words.value.at(-1))
</script>
