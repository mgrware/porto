<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <NuxtLink to="/projects" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 group">
      <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
      <span class="text-xs font-mono uppercase tracking-widest">BACK_TO_PROJECTS</span>
    </NuxtLink>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error || !project" class="text-center py-20">
      <h1 class="text-3xl font-bold mb-4">Project Not Found</h1>
      <p class="text-on-surface-variant mb-8">The requested project could not be found or there was an error.</p>
      <NuxtLink to="/projects">
        <button class="bg-primary text-on-primary px-6 py-2 rounded-full font-bold">Go Back</button>
      </NuxtLink>
    </div>

    <article v-else class="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <span class="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
              {{ project.year }}
            </span>
            <span class="w-1 h-1 bg-on-surface-variant rounded-full"></span>
            <span class="text-xs text-on-surface-variant font-mono uppercase tracking-widest">PROJECT_DETAILS</span>
          </div>
          
          <NuxtLink v-if="user" :to="`/dashboard/projects/edit/${project.id}`">
            <button class="bg-surface-container-high hover:bg-primary/20 text-primary px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors border border-outline-variant/30">
              <span class="material-symbols-outlined text-sm">edit</span>
              EDIT_PROJECT
            </button>
          </NuxtLink>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-bold font-headline mb-8 tracking-tighter leading-[0.9]">
          {{ project.title }}
        </h1>

        <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 bg-surface-container text-on-surface-variant font-mono text-[10px] rounded-full uppercase tracking-widest border border-outline-variant">
            #{{ tag }}
          </span>
        </div>
        
        <div class="aspect-video w-full bg-surface-container-highest rounded-3xl mb-12 overflow-hidden border border-surface-container-high relative flex items-center justify-center">
          <div :class="['absolute inset-0 bg-gradient-to-br opacity-80', project.color_class]"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=')] opacity-30"></div>
          <span class="material-symbols-outlined text-[120px] text-white/90 relative z-10">{{ project.icon || 'folder' }}</span>
        </div>
        
        <div class="flex flex-wrap gap-4 mb-12" v-if="project.demo_link || project.repo_link">
          <a :href="project.demo_link" target="_blank" v-if="project.demo_link" class="flex-1 md:flex-none min-w-[200px]">
            <BaseButton variant="primary" size="lg" class="w-full">
              LIVE DEMO
              <BaseIcon size="sm">open_in_new</BaseIcon>
            </BaseButton>
          </a>
          <a :href="project.repo_link" target="_blank" v-if="project.repo_link" class="flex-1 md:flex-none min-w-[200px]">
            <BaseButton variant="surface" size="lg" class="w-full">
              SOURCE CODE
              <BaseIcon size="sm">code</BaseIcon>
            </BaseButton>
          </a>
        </div>
      </header>

      <div class="prose prose-invert prose-primary max-w-none bg-surface-container border border-surface-container-high p-8 md:p-12 rounded-3xl shadow-xl">
        <h2 class="text-2xl font-bold font-headline tracking-tighter mb-6 text-primary">ABOUT_THE_PROJECT</h2>
        <div class="text-on-background/80 leading-relaxed text-lg font-body" v-html="project.description">
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/atoms/BaseButton.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import { useProjectActions } from '~/composables/useProjectActions'

const route = useRoute()
const { fetchProjectById } = useProjectActions()
const user = useSupabaseUser()

const { data: project, pending, error } = await useAsyncData(`project-detail-${route.params.id}`, () => 
  fetchProjectById(route.params.id as string)
)

watchEffect(() => {
  if (project.value) {
    useSeoMeta({
      title: `${project.value.title} | Gilang Ramadan`,
      description: project.value.description || undefined
    })
  }
})
</script>

<style scoped lang="postcss">
:deep(.prose h2) {
  @apply text-2xl font-bold mt-12 mb-6 font-headline tracking-tight text-primary;
}
:deep(.prose p) {
  @apply mb-6 text-on-background/80 leading-relaxed;
}
:deep(.prose ul) {
  @apply list-disc list-inside mb-6 space-y-2;
}
:deep(.prose ol) {
  @apply list-decimal list-inside mb-6 space-y-2;
}
:deep(.prose pre) {
  @apply bg-[#282c34] border border-outline-variant p-6 my-8 overflow-x-auto text-sm leading-relaxed !important;
  font-family: 'Space Grotesk', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply bg-surface-container px-2 py-1 text-primary text-sm border border-surface-container-high;
  font-family: 'Space Grotesk', monospace;
}
</style>
