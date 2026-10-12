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
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          v-reveal
          :class="[
            'group flex flex-col md:gap-8 items-center overflow-hidden glass glass-hover shadow-xl shadow-primary/5',
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          ]"
        >
          <NuxtLink :to="`/projects/${project.slug || project.id}`" class="relative block w-full md:w-1/2 self-stretch overflow-hidden">
            <div class="absolute inset-0 z-10 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <img
              v-if="project.image_url"
              :src="project.image_url"
              :alt="project.title"
              class="w-full h-64 md:h-full md:min-h-80 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div v-else class="bp-hatch w-full h-64 md:h-full md:min-h-80 grid place-items-center">
              <BaseIcon class="text-6xl text-primary/60">folder_open</BaseIcon>
            </div>
          </NuxtLink>

          <div class="w-full md:w-1/2 p-8 min-w-0">
            <div v-if="project.year" class="text-sm font-semibold text-primary mb-2">{{ project.year }}</div>
            <h2 class="font-headline text-2xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors">
              <NuxtLink :to="`/projects/${project.slug || project.id}`">{{ project.title }}</NuxtLink>
            </h2>
            <p class="text-on-surface-variant leading-relaxed mb-6 text-pretty">{{ summary(project.description) }}</p>

            <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 mb-6">
              <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
            </div>

            <div class="flex flex-wrap gap-3">
              <NuxtLink :to="`/projects/${project.slug || project.id}`" class="btn-primary !px-4 !py-2.5">
                {{ m.projects.details }}
                <BaseIcon class="text-base">arrow_forward</BaseIcon>
              </NuxtLink>
              <a v-if="project.demo_link" :href="project.demo_link" target="_blank" rel="noopener" class="btn-ghost !px-4 !py-2.5">
                <BaseIcon class="text-base">open_in_new</BaseIcon>
                {{ m.projects.liveDemo }}
              </a>
              <a v-if="project.repo_link" :href="project.repo_link" target="_blank" rel="noopener" class="btn-ghost !px-4 !py-2.5">
                <BaseIcon class="text-base">code</BaseIcon>
                {{ m.projects.sourceCode }}
              </a>
            </div>
          </div>
        </article>
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
import { useProjectActions } from '~/composables/useProjectActions'

const { fetchProjects } = useProjectActions()
const { m } = useLocale()
const { data: projects, pending, error } = useLazyAsyncData('projects', () => fetchProjects())

// ponytail: index blurb only — the full description lives on the detail page.
const summary = (html: string) => {
  const text = (html || '').replace(/<[^>]*>?/gm, '').trim()
  return text.length > 320 ? `${text.slice(0, 320)}…` : text
}

useSeoMeta({
  title: () => m.value.projects.seoTitle,
  description: () => m.value.projects.seoDescription
})
</script>
