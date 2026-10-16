<template>
  <section id="projects" class="py-20 scroll-mt-24">
    <div class="max-w-6xl mx-auto px-4">
      <SheetHeading :title="m.featured.title" :note="m.featured.note" />

      <BaseLoader v-if="pending" />

      <template v-else-if="featured.length">
        <div class="space-y-12">
          <ProjectRow v-for="(project, index) in featured" :key="project.id" :project="project" :reverse="index % 2 === 1" />
        </div>

        <div class="pt-12 text-center">
          <NuxtLink to="/projects" class="btn-ghost">
            {{ m.featured.viewAll }}
            <BaseIcon class="text-base">arrow_forward</BaseIcon>
          </NuxtLink>
        </div>
      </template>

      <div v-else class="glass px-5 py-16 text-center text-outline">
        {{ m.projects.empty }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import BaseLoader from '../atoms/BaseLoader.vue'
import SheetHeading from '../molecules/SheetHeading.vue'
import ProjectRow from '../molecules/ProjectRow.vue'
import { useProjectActions } from '~/composables/useProjectActions'

const { fetchProjects } = useProjectActions()
const { m } = useLocale()

// Same cache key as /projects, so the list page reuses this fetch. Sorted by priority already.
const { data: projects, pending } = useLazyAsyncData('projects', () => fetchProjects())
const featured = computed(() => (projects.value || []).slice(0, 3))
</script>
