<template>
  <div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
    <SheetHeading :title="m.projects.title" :note="m.projects.intro" />

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="glass !border-error/50 bg-error/10 px-5 py-4 text-sm text-error">
      {{ m.projects.loadError }} {{ error.message }}
    </div>

    <div v-else-if="!projects || projects.length === 0" class="glass px-5 py-16 text-center text-outline">
      {{ m.projects.empty }}
    </div>

    <template v-else>
      <div class="space-y-12">
        <ProjectRow v-for="(project, index) in projects" :key="project.id" :project="project" :reverse="index % 2 === 1" />
      </div>

      <div class="pt-12 text-center">
        <NuxtLink to="/" class="btn-ghost">
          <BaseIcon class="text-base">arrow_back</BaseIcon>
          {{ m.projects.backHome }}
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import SheetHeading from '~/components/molecules/SheetHeading.vue'
import ProjectRow from '~/components/molecules/ProjectRow.vue'
import { useProjectActions } from '~/composables/useProjectActions'

const { fetchProjects } = useProjectActions()
const { m } = useLocale()
const { data: projects, pending, error } = useLazyAsyncData('projects', () => fetchProjects())

useSeoMeta({
  title: () => m.value.projects.seoTitle,
  description: () => m.value.projects.seoDescription
})
</script>
