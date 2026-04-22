<template>
  <div class="min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary">
    <TheNavbar />
    <TheSidebar />
    
    <main class="md:ml-20 pt-16">
      <HeroSection />
      <TechStack />
      <ExperienceTimeline />
      <MeshSection />
      <TheFooter />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from './components/organisms/TheNavbar.vue'
import TheSidebar from './components/organisms/TheSidebar.vue'
import HeroSection from './components/organisms/HeroSection.vue'
import TechStack from './components/organisms/TechStack.vue'
import ExperienceTimeline from './components/organisms/ExperienceTimeline.vue'
import MeshSection from './components/organisms/MeshSection.vue'
import TheFooter from './components/organisms/TheFooter.vue'
</script>

