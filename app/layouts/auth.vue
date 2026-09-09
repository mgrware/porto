<template>
  <div class="relative min-h-screen flex flex-col text-on-background bg-gradient-to-b from-background via-surface-container to-background">
    <div class="bp-grid fixed inset-0 pointer-events-none z-0"></div>
    <div class="relative z-10 flex flex-col flex-grow">
      <main class="flex-grow flex flex-col">
        <slot />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheFooter from '~/components/organisms/TheFooter.vue'
</script>
