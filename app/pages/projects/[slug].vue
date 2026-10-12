<template>
  <div class="max-w-6xl mx-auto px-4 py-12 lg:py-16">
    <NuxtLink
      to="/projects"
      class="group inline-flex items-center gap-2 mb-8 text-sm font-medium text-secondary hover:text-primary transition-colors"
    >
      <BaseIcon class="text-base group-hover:-translate-x-1 transition-transform">arrow_back</BaseIcon>
      {{ m.projects.back }}
    </NuxtLink>

    <BaseLoader v-if="pending" />

    <div v-else-if="error || !project" class="glass px-6 py-16 text-center">
      <h1 class="font-headline text-2xl font-bold text-on-surface mb-2">{{ m.projects.notFound }}</h1>
      <p class="text-sm text-outline mb-6">{{ m.projects.notFoundBody }}</p>
      <NuxtLink to="/projects" class="btn-primary">{{ m.projects.backToProjects }}</NuxtLink>
    </div>

    <template v-else>
      <header v-reveal class="text-center max-w-4xl mx-auto mb-10">
        <div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-6 text-sm">
          <span v-if="project.year" class="text-primary font-semibold">{{ project.year }}</span>
          <span class="text-outline">{{ m.projects.spec.disciplineValue }}</span>
          <NuxtLink
            v-if="user"
            :to="`/dashboard/projects/edit/${project.id}`"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-outline-variant/50 text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
          >
            <BaseIcon class="text-sm">edit</BaseIcon>
            {{ m.projects.edit }}
          </NuxtLink>
        </div>

        <h1 class="font-headline text-4xl md:text-6xl font-bold leading-tight text-on-surface mb-6 text-balance">
          {{ project.title }}
        </h1>

        <div v-if="project.tags && project.tags.length" class="flex flex-wrap justify-center gap-2 mb-8">
          <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
        </div>

        <div v-if="project.demo_link || project.repo_link" class="flex flex-wrap justify-center gap-3">
          <a v-if="project.demo_link" :href="project.demo_link" target="_blank" rel="noopener" class="btn-primary">
            <BaseIcon class="text-base">open_in_new</BaseIcon>
            {{ m.projects.liveDemo }}
          </a>
          <a v-if="project.repo_link" :href="project.repo_link" target="_blank" rel="noopener" class="btn-ghost">
            <BaseIcon class="text-base">code</BaseIcon>
            {{ m.projects.sourceCode }}
          </a>
        </div>
      </header>

      <div v-reveal class="overflow-hidden rounded-3xl border border-outline-variant/30 shadow-2xl shadow-primary/10 mb-12">
        <img v-if="project.image_url" :src="project.image_url" :alt="project.title" class="w-full aspect-[21/9] object-cover" />
        <div v-else class="bp-hatch aspect-[21/9] grid place-items-center">
          <BaseIcon class="text-7xl text-primary/60">folder_open</BaseIcon>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div class="lg:col-span-2 min-w-0">
          <h2 class="font-headline text-2xl font-bold text-on-surface mb-6">
            {{ m.projects.about }}
          </h2>
          <div class="prose prose-invert max-w-none" v-html="project.description" @click="handleContentClick"></div>
        </div>

        <aside class="min-w-0 lg:sticky lg:top-28 flex flex-col gap-6">
          <div class="glass p-5">
            <div class="text-sm font-semibold text-secondary mb-3">{{ m.projects.specification }}</div>
            <div
              v-for="row in spec"
              :key="row.label"
              class="flex justify-between gap-4 py-2 border-b border-outline-variant/20 last:border-b-0 min-w-0"
            >
              <span class="text-xs text-outline shrink-0">{{ row.label }}</span>
              <span class="text-xs font-medium text-on-surface text-right min-w-0 truncate">{{ row.value }}</span>
            </div>
          </div>

          <div v-if="project.tags && project.tags.length" class="glass p-5">
            <div class="text-sm font-semibold text-secondary mb-3">{{ m.projects.technicalStack }}</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
            </div>
          </div>
        </aside>
      </div>

      <div v-if="prev || next" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        <NuxtLink v-if="prev" :to="`/projects/${prev.slug || prev.id}`" class="group glass glass-hover p-6 min-w-0">
          <div class="flex items-center gap-1 text-xs text-outline mb-2"><BaseIcon class="text-sm">arrow_back</BaseIcon>{{ m.projects.prevSheet }}</div>
          <div class="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">{{ prev.title }}</div>
        </NuxtLink>
        <span v-else class="hidden sm:block"></span>
        <NuxtLink v-if="next" :to="`/projects/${next.slug || next.id}`" class="group glass glass-hover p-6 sm:text-right min-w-0">
          <div class="flex items-center sm:justify-end gap-1 text-xs text-outline mb-2">{{ m.projects.nextSheet }}<BaseIcon class="text-sm">arrow_forward</BaseIcon></div>
          <div class="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">{{ next.title }}</div>
        </NuxtLink>
      </div>
    </template>

    <Teleport to="body">
      <div v-if="selectedImage" class="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4" @click="closeLightbox">
        <div class="absolute top-6 right-6 flex items-center gap-3 z-50">
          <div class="flex items-center gap-1 glass bg-surface-container/90 p-1" @click.stop>
            <button
              class="grid place-items-center w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary disabled:opacity-40 transition-colors"
              :disabled="zoomLevel <= 0.5"
              :aria-label="m.projects.zoomOut"
              @click="zoomOut"
            >
              <BaseIcon class="text-base">remove</BaseIcon>
            </button>
            <span class="text-xs text-on-surface min-w-[4ch] text-center">{{ Math.round(zoomLevel * 100) }}%</span>
            <button
              class="grid place-items-center w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary disabled:opacity-40 transition-colors"
              :disabled="zoomLevel >= 3"
              :aria-label="m.projects.zoomIn"
              @click="zoomIn"
            >
              <BaseIcon class="text-base">add</BaseIcon>
            </button>
          </div>

          <button class="icon-btn" :aria-label="m.projects.close" @click="closeLightbox">
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
            class="max-w-full max-h-[90vh] object-contain rounded-xl origin-center"
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
import { useProjectActions, type Project } from '~/composables/useProjectActions'
import { drawingNo, sheetNo } from '~/composables/useSheetRefs'

const route = useRoute()
const { fetchProjects, fetchProjectBySlug } = useProjectActions()
const user = useSupabaseUser()
const { m } = useLocale()

const { data: project, pending, error } = useLazyAsyncData(`project-detail-${route.params.slug}`, () =>
  fetchProjectBySlug(route.params.slug as string)
)

// Shares the index page's cache key, so navigating from the list costs nothing.
const { data: projects } = useLazyAsyncData('projects', () => fetchProjects())

const position = computed(() => (projects.value || []).findIndex((p: Project) => p.id === project.value?.id))
const sheet = computed(() => (position.value >= 0 ? sheetNo('05', position.value) : '05'))
const drawingRef = computed(() => (project.value ? drawingNo(project.value, Math.max(position.value, 0)) : ''))
const prev = computed(() => (position.value > 0 ? projects.value?.[position.value - 1] : null))
const next = computed(() => (position.value >= 0 ? projects.value?.[position.value + 1] : null))

const spec = computed(() => {
  if (!project.value) return []
  return [
    { label: m.value.projects.spec.drawingNo, value: drawingRef.value },
    { label: m.value.projects.spec.sheet, value: sheet.value },
    { label: m.value.projects.spec.year, value: project.value.year || '—' },
    { label: m.value.projects.spec.discipline, value: m.value.projects.spec.disciplineValue },
    { label: m.value.projects.spec.demo, value: project.value.demo_link ? m.value.projects.spec.available : '—' },
    { label: m.value.projects.spec.source, value: project.value.repo_link ? m.value.projects.spec.available : '—' }
  ]
})

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
  @apply font-headline text-[1.375rem] font-semibold mt-10 mb-4 pb-3 -tracking-[0.02em] text-on-surface border-b border-outline-variant/30 first:mt-0;
}
:deep(.prose h3) {
  @apply font-headline text-lg font-semibold mt-8 mb-3 text-on-surface;
}
:deep(.prose p) {
  @apply mb-4 text-[1.0625rem] leading-[1.68] text-on-surface-variant;
}
:deep(.prose strong) {
  @apply font-semibold text-on-surface;
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
  @apply rounded-r-xl border-l-4 border-primary bg-surface-container/50 pl-5 pr-4 py-4 my-6 text-on-background;
}
:deep(.prose pre) {
  @apply rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-5 my-7 overflow-x-auto text-[0.8125rem] leading-[1.75] !important;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply rounded-md bg-primary/10 text-primary text-[0.9375rem] px-1.5 py-px;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose img) {
  @apply cursor-zoom-in hover:opacity-90 transition-opacity rounded-2xl border border-outline-variant/30 shadow-xl my-8 mx-auto block;
}
</style>
