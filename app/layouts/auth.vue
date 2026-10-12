<template>
  <div class="relative min-h-screen flex flex-col text-on-background bg-background">
    <EnhancedBackground />
    <div class="relative z-10 flex flex-col flex-grow">
      <main class="flex-grow flex flex-col">
        <slot />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import EnhancedBackground from '~/components/organisms/EnhancedBackground.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'
</script>
