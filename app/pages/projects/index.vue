<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <header class="mb-16">
      <h1 class="text-5xl font-bold font-headline mb-4 tracking-tighter text-primary">
        PROJECTS<span class="text-on-background/20">.EXE</span>
      </h1>
      <p class="text-on-surface-variant max-w-2xl text-lg">
        A collection of scalable systems, backend services, and full-stack applications I've built.
      </p>
    </header>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-error/10 border border-error text-error p-6 rounded-lg">
      <p>Error loading projects: {{ error.message }}</p>
    </div>

    <div v-else-if="!projects || projects.length === 0" class="text-center py-20 bg-surface-container rounded-2xl border border-dashed border-surface-container-high">
      <p class="text-on-surface-variant">No projects found. Check back later!</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="group bg-surface-container border border-surface-container-high rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
      >
        <div class="aspect-video bg-surface-container-highest relative overflow-hidden flex items-center justify-center">
          <!-- Image Background if available -->
          <img v-if="project.image_url" :src="project.image_url" :alt="project.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0" />
          
          <!-- Fallback Gradient Background -->
          <div v-else :class="['absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-80 transition-opacity duration-500 z-0', project.color_class]"></div>
          <!-- Grid pattern overlay -->
          <div v-if="!project.image_url" class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=')] opacity-30 z-0"></div>
          
          <BaseIcon v-if="!project.image_url" class="text-7xl text-white/70 relative z-10 group-hover:scale-110 transition-transform duration-500">{{ project.icon }}</BaseIcon>
          
          <!-- Overlay to ensure text readability if there's an image -->
          <div v-if="project.image_url" class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 z-10"></div>
          
          <div class="absolute bottom-4 left-4 z-20">
            <span class="text-[10px] font-mono bg-background/50 backdrop-blur text-on-surface px-2 py-1 rounded uppercase tracking-widest border border-outline-variant/20 shadow-sm">
              {{ project.year }}
            </span>
          </div>
        </div>
        
        <div class="p-6 flex-grow flex flex-col">
          <NuxtLink :to="`/projects/${project.slug || project.id}`">
            <h2 class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
              {{ project.title }}
            </h2>
          </NuxtLink>
          <p class="text-on-surface-variant text-sm mb-6 flex-grow">
            {{ stripHtml(project.description)?.length > 500 ? stripHtml(project.description).substring(0, 500) + '...' : stripHtml(project.description) }}
            <NuxtLink v-if="stripHtml(project.description)?.length > 500" :to="`/projects/${project.slug || project.id}`" class="text-primary hover:underline ml-1 font-medium">
              Read more
            </NuxtLink>
          </p>

          <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in project.tags" :key="tag" class="text-[10px] font-mono bg-surface-container-high text-on-surface-variant px-2 py-1 rounded border border-outline-variant/30 uppercase tracking-widest">
              {{ tag }}
            </span>
          </div>
          
          <div class="flex flex-wrap gap-3 mt-auto">
            <NuxtLink :to="`/projects/${project.slug || project.id}`" class="flex-1 min-w-[100px]">
              <BaseButton variant="surface" class="w-full text-xs">
                DETAILS
                <BaseIcon size="sm">arrow_forward</BaseIcon>
              </BaseButton>
            </NuxtLink>
            <NuxtLink :to="project.demo_link" v-if="project.demo_link" class="flex-1 min-w-[100px]">
              <BaseButton variant="primary" class="w-full text-xs">
                DEMO
                <BaseIcon size="sm">open_in_new</BaseIcon>
              </BaseButton>
            </NuxtLink>
            <NuxtLink :to="project.repo_link" v-if="project.repo_link" class="flex-1 min-w-[100px]">
              <BaseButton variant="surface" class="w-full text-xs">
                SOURCE
                <BaseIcon size="sm">code</BaseIcon>
              </BaseButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div class="text-center py-12">
      <NuxtLink to="/" class="inline-block">
        <BaseButton variant="ghost">
          <BaseIcon>arrow_back</BaseIcon>
          RETURN TO HOME
        </BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/atoms/BaseButton.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import { useProjectActions } from '~/composables/useProjectActions'

const { fetchProjects } = useProjectActions()
const { data: projects, pending, error } = useLazyAsyncData('projects', () => fetchProjects())

const stripHtml = (html: string) => {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '')
}

useSeoMeta({
  title: 'Projects | Gilang Ramadan',
  description: 'A collection of scalable systems, backend services, and full-stack applications.'
})
</script>
