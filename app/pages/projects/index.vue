<template>
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <div class="flex items-center gap-4 mb-7 lg:mb-11">
      <span class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary">SHEET 06</span>
      <span class="flex-1 h-px bg-outline-variant/45"></span>
      <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.14em] text-outline">ASSEMBLY INDEX — SHIPPED WORK</span>
    </div>

    <div v-reveal class="flex flex-wrap items-end gap-x-6 gap-y-4 mb-8">
      <h1 class="font-headline text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold -tracking-[0.02em] text-on-surface">Projects</h1>
      <span class="flex-1 basis-24 h-px bg-outline-variant/45 mb-3"></span>
      <p class="text-[0.9375rem] text-outline max-w-sm mb-1">
        Scalable systems, backend services, and full-stack builds — drawn and shipped.
      </p>
    </div>

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="border border-error/60 bg-error/10 px-4 py-3.5 text-mono text-[0.8125rem] text-error">
      ERR — could not load projects: {{ error.message }}
    </div>

    <div v-else-if="!projects || projects.length === 0" class="border border-dashed border-outline-variant/60 px-4 py-16 text-center text-mono text-[0.8125rem] text-outline">
      no drawings filed yet
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-outline-variant/50">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        v-reveal
        class="group flex flex-col border-r border-b border-outline-variant/50 bg-surface-container/35 min-w-0"
      >
        <div class="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-outline-variant/40">
          <span class="text-mono text-[0.625rem] tracking-[0.12em] text-primary">PRJ · {{ String(index + 1).padStart(2, '0') }}</span>
          <span class="text-mono text-[0.625rem] tracking-[0.1em] text-outline">{{ project.year }}</span>
        </div>

        <NuxtLink :to="`/projects/${project.slug || project.id}`" class="block aspect-video relative overflow-hidden border-b border-outline-variant/40 bg-surface-container-lowest">
          <img
            v-if="project.image_url"
            :src="project.image_url"
            :alt="project.title"
            class="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
          <template v-else>
            <div class="bp-grid absolute inset-0"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <BaseIcon class="text-6xl text-outline-variant group-hover:text-secondary transition-colors">
                {{ project.icon || 'folder' }}
              </BaseIcon>
            </div>
          </template>
        </NuxtLink>

        <div class="flex-grow flex flex-col gap-3 p-4">
          <NuxtLink :to="`/projects/${project.slug || project.id}`">
            <h2 class="font-headline text-xl font-semibold -tracking-[0.015em] leading-snug text-on-surface group-hover:text-primary transition-colors">
              {{ project.title }}
            </h2>
          </NuxtLink>

          <p class="text-sm leading-[1.55] text-on-surface-variant line-clamp-4">
            {{ summary(project.description) }}
          </p>

          <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-[0.375rem]">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-mono text-[0.625rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-1.5 py-0.5"
            >{{ tag }}</span>
          </div>
        </div>

        <div class="flex border-t border-outline-variant/40 text-mono text-[0.6875rem] tracking-[0.06em]">
          <NuxtLink
            :to="`/projects/${project.slug || project.id}`"
            class="flex-1 px-3 py-3 text-center text-primary hover:bg-primary/[0.12] transition-colors"
          >Details</NuxtLink>
          <a
            v-if="project.demo_link"
            :href="project.demo_link"
            target="_blank"
            rel="noopener"
            class="flex-1 px-3 py-3 text-center border-l border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-outline-variant/[0.14] transition-colors"
          >Demo</a>
          <a
            v-if="project.repo_link"
            :href="project.repo_link"
            target="_blank"
            rel="noopener"
            class="flex-1 px-3 py-3 text-center border-l border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-outline-variant/[0.14] transition-colors"
          >Source</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import { useProjectActions } from '~/composables/useProjectActions'

const { fetchProjects } = useProjectActions()
const { data: projects, pending, error } = useLazyAsyncData('projects', () => fetchProjects())

// ponytail: card blurb only — the full description lives on the detail page.
const summary = (html: string) => {
  const text = (html || '').replace(/<[^>]*>?/gm, '').trim()
  return text.length > 320 ? `${text.slice(0, 320)}…` : text
}

useSeoMeta({
  title: 'Projects | Gilang Ramadan',
  description: 'A collection of scalable systems, backend services, and full-stack applications.'
})
</script>
