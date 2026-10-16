<template>
  <article
    v-reveal
    :class="[
      'group flex flex-col md:gap-8 items-center overflow-hidden glass glass-hover shadow-xl shadow-primary/5',
      reverse ? 'md:flex-row-reverse' : 'md:flex-row'
    ]"
  >
    <NuxtLink :to="href" class="relative block w-full md:w-1/2 overflow-hidden">
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
      <img
        v-if="project.image_url"
        :src="project.image_url"
        :alt="project.title"
        class="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div v-else class="bp-hatch w-full h-64 md:h-80 grid place-items-center">
        <BaseIcon class="text-6xl text-primary/60">folder_open</BaseIcon>
      </div>
    </NuxtLink>

    <div class="w-full md:w-1/2 p-8 min-w-0">
      <div v-if="project.year" class="text-sm font-semibold text-primary mb-2">{{ project.year }}</div>
      <h3 class="font-headline text-2xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors">
        <NuxtLink :to="href">{{ project.title }}</NuxtLink>
      </h3>
      <p class="text-on-surface-variant leading-relaxed mb-6 text-pretty">{{ summary }}</p>

      <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 mb-6">
        <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
      </div>

      <div class="flex flex-wrap gap-3">
        <NuxtLink :to="href" class="btn-primary !px-4 !py-2.5">
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
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import type { Project } from '~/composables/useProjectActions'

const props = defineProps<{
  project: Project
  reverse?: boolean
}>()

const { m } = useLocale()
const href = computed(() => `/projects/${props.project.slug || props.project.id}`)

// ponytail: blurb only — the full description lives on the detail page.
const summary = computed(() => {
  const text = (props.project.description || '').replace(/<[^>]*>?/gm, '').trim()
  return text.length > 320 ? `${text.slice(0, 320)}…` : text
})
</script>
