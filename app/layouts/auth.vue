<template>
  <div class="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary selection:text-on-primary">
    <main class="flex-grow flex flex-col">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheFooter from '~/components/organisms/TheFooter.vue'
</script>
