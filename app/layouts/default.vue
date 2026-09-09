<template>
  <div class="relative min-h-screen flex flex-col text-on-background bg-gradient-to-b from-background via-surface-container to-background">
    <!-- drafting paper -->
    <div class="bp-grid fixed inset-0 pointer-events-none z-0"></div>

    <!-- sheet corner marks -->
    <div class="fixed inset-[14px] pointer-events-none z-[60]">
      <div class="absolute top-0 left-0 w-[26px] h-[26px] border-t border-l border-outline-variant"></div>
      <div class="absolute top-0 right-0 w-[26px] h-[26px] border-t border-r border-outline-variant"></div>
      <div class="absolute bottom-0 left-0 w-[26px] h-[26px] border-b border-l border-outline-variant"></div>
      <div class="absolute bottom-0 right-0 w-[26px] h-[26px] border-b border-r border-outline-variant"></div>
    </div>

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
import TheNavbar from '~/components/organisms/TheNavbar.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'
</script>
