<template>
  <div v-if="isPreview && isAllowed" class="bg-surface-container-high border-b border-outline-variant p-3 text-center text-xs font-mono tracking-widest text-on-surface-variant flex justify-center items-center gap-2">
    <span class="material-symbols-outlined text-sm">visibility</span>
    PREVIEW_MODE - DRAFT
  </div>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 group">
      <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
      <span class="text-xs font-mono uppercase tracking-widest">BACK_TO_LOGS</span>
    </NuxtLink>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error || !post || !isAllowed" class="text-center py-20">
      <h1 class="text-3xl font-bold mb-4">Post Not Found</h1>
      <p class="text-on-surface-variant mb-8">The requested blog post could not be found or there was an error.</p>
      <NuxtLink to="/blog">
        <button class="bg-primary text-on-primary px-6 py-2 rounded-full font-bold">Go Back</button>
      </NuxtLink>
    </div>

    <article v-else class="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <span class="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">
              {{ new Date(post.created_at).toLocaleDateString() }}
            </span>
            <span class="w-1 h-1 bg-on-surface-variant rounded-full"></span>
            <span class="text-xs text-on-surface-variant font-mono uppercase tracking-widest">5 MIN READ</span>
          </div>
          
          <NuxtLink v-if="user" :to="`/dashboard/edit/${post.id}`">
            <button class="bg-surface-container-high hover:bg-primary/20 text-primary px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors">
              <span class="material-symbols-outlined text-sm">edit</span>
              EDIT_ENTRY
            </button>
          </NuxtLink>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-bold font-headline mb-8 tracking-tighter leading-[0.9]">
          {{ post.title }}
        </h1>
        
        <div v-if="post.image_url" class="aspect-video w-full bg-surface-container rounded-3xl mb-12 overflow-hidden border border-surface-container-high relative">
          <img :src="post.image_url" class="w-full h-full object-cover" />
        </div>
        <div v-else class="aspect-video w-full bg-surface-container rounded-3xl mb-12 overflow-hidden border border-surface-container-high relative">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        </div>
      </header>

      <div class="prose prose-invert prose-primary max-w-none">
        <div class="text-on-background/80 leading-relaxed text-lg" v-html="post.content"></div>
      </div>

      <footer class="mt-20 pt-12 border-t border-surface-container-high">
        <div class="bg-surface-container p-8 rounded-3xl border border-surface-container-high flex flex-col md:flex-row items-center gap-8">
          <div class="w-20 h-20 bg-surface rounded-full overflow-hidden border-2 border-surface-container-highest shrink-0 shadow-lg">
            <img src="~/assets/images/avatar.jpg" alt="Gilang Ramadan" class="w-full h-full object-cover" />
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Written by Gilang Ramadan</h3>
            <p class="text-on-surface-variant text-sm">
              Fullstack Engineer specialized in high-performance backend systems and modern frontend architectures.
            </p>
          </div>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const route = useRoute()
const { fetchBlogBySlug } = useBlogActions()
const user = useSupabaseUser()

const { data: post, pending, error } = await useAsyncData(`blog-${route.params.slug}`, () => 
  fetchBlogBySlug(route.params.slug as string)
)

const isPreview = computed(() => post.value && post.value.status !== 'published')
const isAllowed = computed(() => !isPreview.value || user.value)

watchEffect(() => {
  if (post.value && isAllowed.value) {
    useSeoMeta({
      title: `${post.value.title} | Gilang Ramadan`,
      description: post.value.excerpt || undefined
    })

    if (import.meta.client) {
      nextTick(() => {
        document.querySelectorAll('pre.ql-syntax, pre code').forEach((block) => {
          hljs.highlightElement(block as HTMLElement)
        })
      })
    }
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
:deep(.prose pre) {
  @apply bg-[#282c34] border border-outline-variant p-6 my-8 overflow-x-auto text-sm leading-relaxed !important;
  font-family: 'Space Grotesk', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply bg-surface-container px-2 py-1 text-primary text-sm border border-surface-container-high;
  font-family: 'Space Grotesk', monospace;
}
</style>
