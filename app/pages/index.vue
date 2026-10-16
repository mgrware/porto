<template>
  <div>
    <FloatingNav />
    <HeroSection />
    <AboutSection />
    <TechStack />
    <ExperienceTimeline />
    <FeaturedProjects />
    <PracticeSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import FloatingNav from '~/components/organisms/FloatingNav.vue'
import HeroSection from '~/components/organisms/HeroSection.vue'
import AboutSection from '~/components/organisms/AboutSection.vue'
import TechStack from '~/components/organisms/TechStack.vue'
import ExperienceTimeline from '~/components/organisms/ExperienceTimeline.vue'
import FeaturedProjects from '~/components/organisms/FeaturedProjects.vue'
import PracticeSection from '~/components/organisms/PracticeSection.vue'
import ContactSection from '~/components/organisms/ContactSection.vue'
</script>
