<template>
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <SheetRule sheet="05" :caption="m.projects.caption" />

    <div v-reveal class="flex flex-wrap items-end gap-x-8 gap-y-4 mb-8">
      <h1 class="font-headline text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold -tracking-[0.03em] leading-[1.05] text-on-surface">{{ m.projects.title }}</h1>
      <p class="text-[1.0625rem] leading-[1.6] text-on-surface-variant max-w-[34rem] mb-1.5">
        {{ m.projects.intro }}
      </p>
    </div>

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="border border-error/60 bg-error/10 px-4 py-3.5 text-mono text-[0.8125rem] text-error">
      {{ m.projects.loadError }} {{ error.message }}
    </div>

    <div v-else-if="!projects || projects.length === 0" class="border border-dashed border-outline-variant/60 px-4 py-16 text-center text-mono text-[0.8125rem] text-outline">
      {{ m.projects.empty }}
    </div>

    <template v-else>
      <div class="flex flex-wrap gap-x-8 gap-y-2 py-3 border-t-2 border-outline-variant/55 border-b border-outline-variant/40 text-mono text-[0.625rem] tracking-[0.12em] text-outline">
        <span>{{ m.projects.totalSheets }} · {{ String(projects.length).padStart(2, '0') }}</span>
        <span v-if="span">{{ m.projects.span }} · {{ span }}</span>
        <span>{{ m.projects.discipline }}</span>
        <span class="flex-1"></span>
        <span class="text-primary">{{ m.projects.rev }}</span>
      </div>

      <div class="flex flex-col">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          v-reveal
          class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 py-6 lg:py-8 border-b border-outline-variant/40 min-w-0"
        >
          <div class="max-w-[320px] min-w-0">
            <NuxtLink
              :to="`/projects/${project.slug || project.id}`"
              class="group relative block aspect-[4/3] border border-outline-variant/55 bg-surface-container/75 overflow-hidden"
            >
              <span class="absolute -top-px -left-px w-[11px] h-[11px] border-t-2 border-l-2 border-primary z-10"></span>
              <span class="absolute -bottom-px -right-px w-[11px] h-[11px] border-b-2 border-r-2 border-primary z-10"></span>
              <img
                v-if="project.image_url"
                :src="project.image_url"
                :alt="project.title"
                class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
              <div v-else class="bp-hatch w-full h-full flex items-center justify-center">
                <span class="text-mono text-[0.625rem] tracking-[0.12em] text-outline">{{ m.projects.plate }} — {{ drawingNo(project, index) }}</span>
              </div>
            </NuxtLink>
            <div class="flex justify-between gap-4 pt-2 text-mono text-[0.625rem] tracking-[0.1em] text-outline">
              <span class="truncate">{{ drawingNo(project, index) }}</span>
              <span class="text-primary shrink-0">{{ project.year }}</span>
            </div>
          </div>

          <div class="md:col-span-2 min-w-0 flex flex-col gap-3.5">
            <h2 class="font-headline text-[clamp(1.25rem,2.2vw,1.625rem)] font-semibold -tracking-[0.02em] text-on-surface">
              <NuxtLink :to="`/projects/${project.slug || project.id}`" class="hover:text-primary transition-colors">
                {{ project.title }}
              </NuxtLink>
            </h2>

            <p class="text-[0.9375rem] leading-[1.6] text-on-surface-variant max-w-[52rem] text-pretty">
              {{ summary(project.description) }}
            </p>

            <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-[0.4375rem]">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-mono text-[0.6875rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-2 py-1"
              >{{ tag }}</span>
            </div>

            <div class="flex flex-wrap gap-2.5 pt-1">
              <NuxtLink
                :to="`/projects/${project.slug || project.id}`"
                class="inline-flex items-center gap-2 px-4 py-[0.6875rem] border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-xs transition-colors"
              >
                {{ m.projects.details }}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
                  <path d="M4 12h15" /><path d="M13 6l6 6-6 6" />
                </svg>
              </NuxtLink>
              <a
                v-if="project.demo_link"
                :href="project.demo_link"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 px-4 py-[0.6875rem] border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-xs transition-colors"
              >
                {{ m.projects.liveDemo }}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
                  <path d="M14 4h6v6" /><path d="M20 4L10 14" /><path d="M18 14v6H4V6h6" />
                </svg>
              </a>
              <a
                v-if="project.repo_link"
                :href="project.repo_link"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 px-4 py-[0.6875rem] border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-xs transition-colors"
              >
                {{ m.projects.sourceCode }}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
                  <path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>

      <div class="pt-8">
        <NuxtLink
          to="/#hero"
          class="inline-flex items-center gap-2 px-[1.125rem] py-3 border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-[0.8125rem] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <path d="M20 12H5" /><path d="M11 18l-6-6 6-6" />
          </svg>
          {{ m.projects.backHome }}
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import SheetRule from '~/components/molecules/SheetRule.vue'
import { useProjectActions, type Project } from '~/composables/useProjectActions'
import { drawingNo } from '~/composables/useSheetRefs'

const { fetchProjects } = useProjectActions()
const { m } = useLocale()
const { data: projects, pending, error } = useLazyAsyncData('projects', () => fetchProjects())

const span = computed(() => {
  const years = (projects.value || []).map((p: Project) => parseInt(p.year, 10)).filter(Boolean)
  if (!years.length) return ''
  const [min, max] = [Math.min(...years), Math.max(...years)]
  return min === max ? `${min}` : `${min}–${max}`
})

// ponytail: index blurb only — the full description lives on the detail sheet.
const summary = (html: string) => {
  const text = (html || '').replace(/<[^>]*>?/gm, '').trim()
  return text.length > 420 ? `${text.slice(0, 420)}…` : text
}

useSeoMeta({
  title: () => m.value.projects.seoTitle,
  description: () => m.value.projects.seoDescription
})
</script>
