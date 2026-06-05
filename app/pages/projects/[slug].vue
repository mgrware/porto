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
          <img v-if="project.image_url" :src="project.image_url" :alt="project.title" class="absolute inset-0 w-full h-full object-cover z-0" />
          <div v-else :class="['absolute inset-0 bg-gradient-to-br opacity-80 z-0', project.color_class]"></div>
          <div v-if="!project.image_url" class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=')] opacity-30 z-0"></div>
          <span v-if="!project.image_url" class="material-symbols-outlined text-[120px] text-white/90 relative z-10">{{ project.icon || 'folder' }}</span>
          <div v-if="project.image_url" class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 z-10"></div>
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
        <div class="text-on-background/80 leading-relaxed text-lg font-body" v-html="project.description" @click="handleContentClick">
        </div>
      </div>
    </article>

    <Teleport to="body">
      <div v-if="selectedImage" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200" @click="closeLightbox">
        
        <!-- Controls -->
        <div class="absolute top-6 right-6 flex items-center gap-4 z-50">
          <div class="flex items-center gap-2 bg-white/10 rounded-full p-1 backdrop-blur-sm" @click.stop>
            <button @click="zoomOut" class="text-white hover:bg-white/20 p-2 rounded-full transition-colors flex items-center justify-center" :disabled="zoomLevel <= 0.5">
              <BaseIcon>remove</BaseIcon>
            </button>
            <span class="text-white font-mono text-xs min-w-[3ch] text-center">{{ Math.round(zoomLevel * 100) }}%</span>
            <button @click="zoomIn" class="text-white hover:bg-white/20 p-2 rounded-full transition-colors flex items-center justify-center" :disabled="zoomLevel >= 3">
              <BaseIcon>add</BaseIcon>
            </button>
          </div>

          <button @click="closeLightbox" class="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm">
            <BaseIcon>close</BaseIcon>
          </button>
        </div>

        <!-- Image Container -->
        <div class="w-full h-full overflow-hidden flex items-center justify-center relative">
          <img 
            :src="selectedImage" 
            :style="{ 
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`, 
              transition: isDragging ? 'none' : 'transform 0.2s ease-out' 
            }"
            class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl origin-center" 
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
import BaseButton from '~/components/atoms/BaseButton.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
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
:deep(.prose img) {
  @apply cursor-zoom-in hover:opacity-90 transition-opacity rounded-xl border border-surface-container-high shadow-md my-8 mx-auto block;
}
</style>
