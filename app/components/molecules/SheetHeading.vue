<template>
  <div v-reveal class="text-center mb-12 lg:mb-16">
    <h2 class="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-4">
      {{ head }} <span class="text-gradient">{{ tail }}</span>
    </h2>
    <p v-if="note" class="text-lg text-on-surface-variant max-w-2xl mx-auto">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  note?: string
}>()

// Last word gets the gradient accent, like "About <Me>" in the mock.
const words = computed(() => props.title.trim().split(' '))
const head = computed(() => words.value.slice(0, -1).join(' '))
const tail = computed(() => words.value.at(-1))
</script>
