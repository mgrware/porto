<template>
  <div class="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink
        to="/projects"
        class="group inline-flex items-center gap-2 text-mono text-[0.6875rem] tracking-[0.12em] text-outline hover:text-primary transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="group-hover:-translate-x-1 transition-transform" aria-hidden="true">
          <path d="M20 12H5" /><path d="M11 6l-6 6 6 6" />
        </svg>
        BACK TO ASSEMBLY INDEX
      </NuxtLink>
      <span class="flex-1 h-px bg-outline-variant/45"></span>
      <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.14em] text-outline">SHEET 06 · DRAWING</span>
    </div>

    <BaseLoader v-if="pending" />

    <div v-else-if="error || !project" class="border border-dashed border-outline-variant/60 px-4 py-16 text-center">
      <h1 class="font-headline text-2xl font-semibold text-on-surface mb-2">Drawing not found</h1>
      <p class="text-mono text-[0.8125rem] text-outline mb-6">this project is not in the index</p>
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-2 px-[1.125rem] py-3 bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] transition-colors"
      >Back to projects</NuxtLink>
    </div>

    <article v-else>
      <header class="mb-10">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-outline-variant/50 text-mono text-[0.6875rem] tracking-[0.1em] text-outline">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span class="text-primary">{{ project.year }}</span>
            <span class="w-1 h-1 bg-outline-variant"></span>
            <span>PROJECT RECORD</span>
          </div>

          <NuxtLink
            v-if="user"
            :to="`/dashboard/projects/edit/${project.id}`"
            class="inline-flex items-center gap-2 px-2.5 py-1.5 border border-outline-variant/60 text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
          >
            <BaseIcon class="text-sm">edit</BaseIcon>
            EDIT PROJECT
          </NuxtLink>
        </div>

        <h1 class="font-headline text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] -tracking-[0.025em] text-on-surface mb-6 text-pretty">
          {{ project.title }}
        </h1>

        <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-[0.4375rem] mb-8">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="text-mono text-[0.6875rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-2 py-1"
          >{{ tag }}</span>
        </div>

        <div class="relative border border-outline-variant/55 p-1.5 bg-surface-container/40 mb-8">
          <span class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-primary"></span>
          <span class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary"></span>
          <img
            v-if="project.image_url"
            :src="project.image_url"
            :alt="project.title"
            class="w-full aspect-video object-cover"
          />
          <div v-else class="relative w-full aspect-video bg-surface-container-lowest flex items-center justify-center">
            <div class="bp-grid absolute inset-0"></div>
            <BaseIcon class="relative text-[96px] text-outline-variant">{{ project.icon || 'folder' }}</BaseIcon>
          </div>
        </div>

        <div v-if="project.demo_link || project.repo_link" class="flex flex-wrap gap-3">
          <a
            v-if="project.demo_link"
            :href="project.demo_link"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2.5 px-[1.375rem] py-[0.9375rem] bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] tracking-[0.04em] transition-colors"
          >
            Live demo
            <BaseIcon class="text-base">open_in_new</BaseIcon>
          </a>
          <a
            v-if="project.repo_link"
            :href="project.repo_link"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2.5 px-[1.375rem] py-[0.9375rem] border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-[0.8125rem] tracking-[0.04em] transition-colors"
          >
            Source code
            <BaseIcon class="text-base">code</BaseIcon>
          </a>
        </div>
      </header>

      <div class="relative border border-outline-variant/55 bg-background/60">
        <div class="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-outline-variant/45 bg-surface-container/90">
          <span class="text-mono text-[0.6875rem] tracking-[0.08em] text-secondary">notes — about the project</span>
          <span class="text-mono text-[0.625rem] tracking-[0.1em] text-outline">NTS</span>
        </div>
        <div class="prose prose-invert max-w-none p-5 sm:p-8">
          <div class="text-[1.0625rem] leading-[1.7] text-on-surface-variant" v-html="project.description" @click="handleContentClick"></div>
        </div>
      </div>
    </article>

    <Teleport to="body">
      <div v-if="selectedImage" class="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4" @click="closeLightbox">
        <div class="absolute top-6 right-6 flex items-center gap-3 z-50">
          <div class="flex items-center gap-1 border border-outline-variant/60 bg-surface-container/90 p-1" @click.stop>
            <button
              class="grid place-items-center w-8 h-8 text-on-surface-variant hover:text-primary disabled:opacity-40 transition-colors"
              :disabled="zoomLevel <= 0.5"
              aria-label="Zoom out"
              @click="zoomOut"
            >
              <BaseIcon class="text-base">remove</BaseIcon>
            </button>
            <span class="text-mono text-[0.6875rem] text-on-surface min-w-[4ch] text-center">{{ Math.round(zoomLevel * 100) }}%</span>
            <button
              class="grid place-items-center w-8 h-8 text-on-surface-variant hover:text-primary disabled:opacity-40 transition-colors"
              :disabled="zoomLevel >= 3"
              aria-label="Zoom in"
              @click="zoomIn"
            >
              <BaseIcon class="text-base">add</BaseIcon>
            </button>
          </div>

          <button
            class="grid place-items-center w-10 h-10 border border-outline-variant/60 bg-surface-container/90 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Close"
            @click="closeLightbox"
          >
            <BaseIcon class="text-base">close</BaseIcon>
          </button>
        </div>

        <div class="w-full h-full overflow-hidden flex items-center justify-center relative">
          <img
            :src="selectedImage"
            :style="{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }"
            class="max-w-full max-h-[90vh] object-contain border border-outline-variant/50 origin-center"
            :class="zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'"
            @click.stop
            @wheel.prevent="handleWheel"
            @mousedown.prevent="startDrag"
            @mousemove="onDrag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
            draggable="false"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import { useProjectActions } from '~/composables/useProjectActions'

const route = useRoute()
const { fetchProjectBySlug } = useProjectActions()
const user = useSupabaseUser()

const { data: project, pending, error } = useLazyAsyncData(`project-detail-${route.params.slug}`, () =>
  fetchProjectBySlug(route.params.slug as string)
)

watchEffect(() => {
  if (project.value) {
    useSeoMeta({
      title: `${project.value.title} | Gilang Ramadan`,
      description: project.value.description || undefined
    })
  }
})

const selectedImage = ref<string | null>(null)
const zoomLevel = ref(1)
const pan = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const closeLightbox = () => {
  selectedImage.value = null
  zoomLevel.value = 1
  pan.value = { x: 0, y: 0 }
}

const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.25, 3)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.25, 0.5)
}

const handleWheel = (e: WheelEvent) => {
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

const startDrag = (e: MouseEvent) => {
  if (zoomLevel.value > 1) {
    isDragging.value = true
    dragStart.value = { x: e.clientX - pan.value.x, y: e.clientY - pan.value.y }
  }
}

const onDrag = (e: MouseEvent) => {
  if (isDragging.value) {
    pan.value = { x: e.clientX - dragStart.value.x, y: e.clientY - dragStart.value.y }
  }
}

const stopDrag = () => {
  isDragging.value = false
}

const handleContentClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.tagName.toLowerCase() === 'img') {
    selectedImage.value = (target as HTMLImageElement).src
  }
}
</script>

<style scoped lang="postcss">
:deep(.prose h2) {
  @apply font-headline text-2xl font-semibold mt-12 mb-5 -tracking-[0.02em] text-on-surface first:mt-0;
}
:deep(.prose h3) {
  @apply font-headline text-xl font-semibold mt-10 mb-4 text-on-surface;
}
:deep(.prose p) {
  @apply mb-6 leading-[1.7] text-on-surface-variant;
}
:deep(.prose a) {
  @apply text-primary underline underline-offset-4 hover:text-secondary transition-colors;
}
:deep(.prose ul) {
  @apply list-disc list-outside pl-5 mb-6 space-y-2 marker:text-outline-variant;
}
:deep(.prose ol) {
  @apply list-decimal list-outside pl-5 mb-6 space-y-2 marker:text-outline-variant;
}
:deep(.prose blockquote) {
  @apply border-l-2 border-primary pl-4 my-6 text-on-surface-variant;
}
:deep(.prose pre) {
  @apply bg-surface-container-lowest border border-outline-variant/55 p-5 my-8 overflow-x-auto text-sm leading-relaxed !important;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply bg-surface-container px-1.5 py-0.5 text-primary text-sm border border-outline-variant/40;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose img) {
  @apply cursor-zoom-in hover:opacity-90 transition-opacity border border-outline-variant/55 p-1.5 my-8 mx-auto block;
}
</style>
