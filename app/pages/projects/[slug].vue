<template>
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <NuxtLink
      to="/projects"
      class="group inline-flex items-center gap-2 mb-7 text-mono text-xs tracking-[0.08em] text-secondary hover:text-primary transition-colors"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="group-hover:-translate-x-1 transition-transform" aria-hidden="true">
        <path d="M20 12H5" /><path d="M11 18l-6-6 6-6" />
      </svg>
      {{ m.projects.back }}
    </NuxtLink>

    <BaseLoader v-if="pending" />

    <div v-else-if="error || !project" class="border border-dashed border-outline-variant/60 px-4 py-16 text-center">
      <h1 class="font-headline text-2xl font-semibold text-on-surface mb-2">{{ m.projects.notFound }}</h1>
      <p class="text-mono text-[0.8125rem] text-outline mb-6">{{ m.projects.notFoundBody }}</p>
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-2 px-[1.125rem] py-3 bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] transition-colors"
      >{{ m.projects.backToProjects }}</NuxtLink>
    </div>

    <template v-else>
      <SheetRule :sheet="sheet" :caption="`${m.projects.dwg} ${drawingRef}`" />

      <div class="flex flex-wrap items-center gap-x-5 gap-y-3 mb-4 text-mono text-xs tracking-[0.1em]">
        <span class="text-primary">{{ project.year }}</span>
        <span class="w-1.5 h-1.5 bg-outline-variant rotate-45"></span>
        <span class="text-outline">{{ m.projects.disciplineShort }}</span>
        <span class="flex-1"></span>
        <NuxtLink
          v-if="user"
          :to="`/dashboard/projects/edit/${project.id}`"
          class="inline-flex items-center gap-2 px-2.5 py-1.5 border border-outline-variant/60 text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
        >
          <BaseIcon class="text-sm">edit</BaseIcon>
          {{ m.projects.edit }}
        </NuxtLink>
      </div>

      <h1 class="font-headline text-[clamp(2.25rem,4.8vw,3.75rem)] font-semibold leading-[1.04] -tracking-[0.03em] text-on-surface mb-5 max-w-[24ch] text-pretty">
        {{ project.title }}
      </h1>

      <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-[0.4375rem] mb-7">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="text-mono text-[0.6875rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-2 py-1"
        >{{ tag }}</span>
      </div>

      <!-- plate -->
      <div class="relative border border-outline-variant/55 bg-background/60 mb-7">
        <span class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-outline-variant z-10"></span>
        <span class="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-outline-variant z-10"></span>
        <span class="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-outline-variant z-10"></span>
        <span class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-outline-variant z-10"></span>
        <img v-if="project.image_url" :src="project.image_url" :alt="project.title" class="w-full aspect-[21/9] object-cover" />
        <div v-else class="bp-hatch aspect-[21/9] flex items-center justify-center">
          <span class="text-mono text-xs tracking-[0.12em] text-outline">{{ m.projects.plate }} {{ sheet }} — {{ m.projects.screenshotMissing }}</span>
        </div>
        <div class="flex flex-wrap justify-between gap-x-4 gap-y-2 px-4 py-2.5 border-t border-outline-variant/45 text-mono text-[0.625rem] tracking-[0.1em] text-outline">
          <span class="truncate max-w-[70%]">{{ m.projects.fig }} — {{ project.title.toUpperCase() }}</span>
          <span>{{ m.projects.scale }}</span>
        </div>
      </div>

      <div v-if="project.demo_link || project.repo_link" class="flex flex-wrap gap-3 mb-8 lg:mb-12">
        <a
          v-if="project.demo_link"
          :href="project.demo_link"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2.5 px-5 py-3.5 bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] font-medium transition-colors"
        >
          {{ m.projects.liveDemo }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <path d="M14 4h6v6" /><path d="M20 4L10 14" /><path d="M18 14v6H4V6h6" />
          </svg>
        </a>
        <a
          v-if="project.repo_link"
          :href="project.repo_link"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2.5 px-5 py-3.5 border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-[0.8125rem] transition-colors"
        >
          {{ m.projects.sourceCode }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div class="lg:col-span-2 min-w-0">
          <div class="flex items-center gap-4 pb-3 mb-5 border-b-2 border-outline-variant/55">
            <h2 class="font-headline text-[1.375rem] font-semibold -tracking-[0.02em] text-on-surface">{{ m.projects.about }}</h2>
            <span class="flex-1"></span>
            <span class="text-mono text-[0.625rem] tracking-[0.12em] text-outline">{{ m.projects.generalNotes }}</span>
          </div>

          <div class="prose prose-invert max-w-none" v-html="project.description" @click="handleContentClick"></div>
        </div>

        <aside class="min-w-0 lg:sticky lg:top-[88px] flex flex-col gap-5">
          <div class="border border-outline-variant/55 bg-surface-container/50">
            <div class="px-4 py-2.5 border-b border-outline-variant/45 text-mono text-[0.625rem] tracking-[0.12em] text-secondary">
              {{ m.projects.specification }}
            </div>
            <div
              v-for="row in spec"
              :key="row.label"
              class="flex justify-between gap-4 px-4 py-[0.6875rem] border-b border-outline-variant/[0.28] last:border-b-0 min-w-0"
            >
              <span class="text-mono text-[0.6875rem] tracking-[0.08em] text-outline shrink-0">{{ row.label }}</span>
              <span class="text-mono text-xs text-on-surface text-right min-w-0 truncate">{{ row.value }}</span>
            </div>
          </div>

          <div v-if="project.tags && project.tags.length" class="border border-outline-variant/55 bg-surface-container/50">
            <div class="px-4 py-2.5 border-b border-outline-variant/45 text-mono text-[0.625rem] tracking-[0.12em] text-secondary">
              {{ m.projects.technicalStack }}
            </div>
            <div
              v-for="(tag, index) in project.tags"
              :key="tag"
              class="px-4 py-3 border-b border-outline-variant/[0.28] last:border-b-0 min-w-0"
            >
              <div class="text-mono text-[0.625rem] tracking-[0.12em] text-primary mb-[0.3125rem]">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="text-sm leading-[1.5] text-on-surface-variant">{{ tag }}</div>
            </div>
          </div>
        </aside>
      </div>

      <div v-if="prev || next" class="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-outline-variant/55 mt-8 lg:mt-12">
        <NuxtLink v-if="prev" :to="`/projects/${prev.slug || prev.id}`" class="group py-5 border-b border-outline-variant/40 min-w-0">
          <div class="text-mono text-[0.625rem] tracking-[0.12em] text-outline mb-[0.4375rem]">◀ {{ m.projects.prevSheet }} · {{ prevSheet }}</div>
          <div class="font-headline text-[1.0625rem] font-semibold text-on-surface group-hover:text-primary transition-colors">{{ prev.title }}</div>
        </NuxtLink>
        <span v-else class="hidden sm:block border-b border-outline-variant/40"></span>
        <NuxtLink v-if="next" :to="`/projects/${next.slug || next.id}`" class="group py-5 border-b border-outline-variant/40 sm:text-right min-w-0">
          <div class="text-mono text-[0.625rem] tracking-[0.12em] text-outline mb-[0.4375rem]">{{ m.projects.nextSheet }} · {{ nextSheet }} ▶</div>
          <div class="font-headline text-[1.0625rem] font-semibold text-on-surface group-hover:text-primary transition-colors">{{ next.title }}</div>
        </NuxtLink>
      </div>
    </template>

    <Teleport to="body">
      <div v-if="selectedImage" class="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4" @click="closeLightbox">
        <div class="absolute top-6 right-6 flex items-center gap-3 z-50">
          <div class="flex items-center gap-1 border border-outline-variant/60 bg-surface-container/90 p-1" @click.stop>
            <button
              class="grid place-items-center w-8 h-8 text-on-surface-variant hover:text-primary disabled:opacity-40 transition-colors"
              :disabled="zoomLevel <= 0.5"
              :aria-label="m.projects.zoomOut"
              @click="zoomOut"
            >
              <BaseIcon class="text-base">remove</BaseIcon>
            </button>
            <span class="text-mono text-[0.6875rem] text-on-surface min-w-[4ch] text-center">{{ Math.round(zoomLevel * 100) }}%</span>
            <button
              class="grid place-items-center w-8 h-8 text-on-surface-variant hover:text-primary disabled:opacity-40 transition-colors"
              :disabled="zoomLevel >= 3"
              :aria-label="m.projects.zoomIn"
              @click="zoomIn"
            >
              <BaseIcon class="text-base">add</BaseIcon>
            </button>
          </div>

          <button
            class="grid place-items-center w-10 h-10 border border-outline-variant/60 bg-surface-container/90 text-on-surface-variant hover:text-primary transition-colors"
            :aria-label="m.projects.close"
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
import SheetRule from '~/components/molecules/SheetRule.vue'
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
const prevSheet = computed(() => sheetNo('05', position.value - 1))
const nextSheet = computed(() => sheetNo('05', position.value + 1))

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
  @apply font-headline text-[1.375rem] font-semibold mt-10 mb-4 pb-3 -tracking-[0.02em] text-on-surface border-b-2 border-outline-variant/55 first:mt-0;
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
  @apply border-l-2 border-primary bg-surface-container/50 pl-5 pr-4 py-4 my-6 text-on-background;
}
:deep(.prose pre) {
  @apply bg-surface-container-lowest border border-outline-variant/55 p-[1.125rem] my-7 overflow-x-auto text-[0.8125rem] leading-[1.75] !important;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply text-primary text-[0.9375rem] border border-outline-variant/50 px-1.5 py-px;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose img) {
  @apply cursor-zoom-in hover:opacity-90 transition-opacity border border-outline-variant/55 p-1.5 my-8 mx-auto block;
}
</style>
