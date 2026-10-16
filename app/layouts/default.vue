<template>
  <div class="relative min-h-screen flex flex-col text-on-background bg-background">
    <ScrollProgress />
    <EnhancedBackground />

    <div class="relative z-10 flex flex-col flex-grow">
      <TheNavbar />
      <main class="flex-grow">
        <slot />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollProgress from '~/components/atoms/ScrollProgress.vue'
import EnhancedBackground from '~/components/organisms/EnhancedBackground.vue'
import TheNavbar from '~/components/organisms/TheNavbar.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'
</script>
