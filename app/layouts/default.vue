<template>
  <div class="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary selection:text-on-primary">
    <TheNavbar />
    <TheSidebar />
    
    <div class="flex-grow md:ml-20 pt-16 flex flex-col">
      <main class="flex-grow">
        <slot />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from '~/components/organisms/TheNavbar.vue'
import TheSidebar from '~/components/organisms/TheSidebar.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'
</script>
