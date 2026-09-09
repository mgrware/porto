<template>
  <div
    v-if="isPreview && isAllowed"
    class="border-b border-outline-variant/60 bg-surface-container px-4 py-2.5 flex justify-center items-center gap-2 text-mono text-[0.6875rem] tracking-[0.12em] text-primary"
  >
    <span class="w-1.5 h-1.5 bg-primary animate-bp-pulse"></span>
    PREVIEW — UNPUBLISHED DRAFT
  </div>

  <div class="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink
        to="/blog"
        class="group inline-flex items-center gap-2 text-mono text-[0.6875rem] tracking-[0.12em] text-outline hover:text-primary transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="group-hover:-translate-x-1 transition-transform" aria-hidden="true">
          <path d="M20 12H5" /><path d="M11 6l-6 6 6 6" />
        </svg>
        BACK TO LOG REGISTER
      </NuxtLink>
      <span class="flex-1 h-px bg-outline-variant/45"></span>
      <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.14em] text-outline">SHEET 05 · ENTRY</span>
    </div>

    <BaseLoader v-if="pending" />

    <div v-else-if="error || !post || !isAllowed" class="border border-dashed border-outline-variant/60 px-4 py-16 text-center">
      <h1 class="font-headline text-2xl font-semibold text-on-surface mb-2">Entry not found</h1>
      <p class="text-mono text-[0.8125rem] text-outline mb-6">this drawing is not in the register</p>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 px-[1.125rem] py-3 bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] transition-colors"
      >Back to blog</NuxtLink>
    </div>

    <article v-else>
      <header class="mb-10">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-outline-variant/50 text-mono text-[0.6875rem] tracking-[0.1em] text-outline">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span class="text-primary">
              {{ new Date(post.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() }}
            </span>
            <span class="w-1 h-1 bg-outline-variant"></span>
            <span>5 MIN READ</span>
            <span class="w-1 h-1 bg-outline-variant"></span>
            <span class="flex items-center gap-1.5" title="Views">
              <BaseIcon class="text-sm">visibility</BaseIcon>
              {{ post.views || 0 }}
            </span>
          </div>

          <NuxtLink
            v-if="user"
            :to="`/dashboard/blogs/edit/${post.id}`"
            class="inline-flex items-center gap-2 px-2.5 py-1.5 border border-outline-variant/60 text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
          >
            <BaseIcon class="text-sm">edit</BaseIcon>
            EDIT ENTRY
          </NuxtLink>
        </div>

        <h1 class="font-headline text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] -tracking-[0.025em] text-on-surface mb-6 text-pretty">
          {{ post.title }}
        </h1>

        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-[0.4375rem] mb-8">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-mono text-[0.6875rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-2 py-1"
          >{{ tag }}</span>
        </div>

        <div v-if="post.image_url" class="relative border border-outline-variant/55 p-1.5 bg-surface-container/40 mb-10">
          <span class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-primary"></span>
          <span class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary"></span>
          <img :src="post.image_url" :alt="post.title" class="w-full aspect-video object-cover" />
        </div>
      </header>

      <div class="prose prose-invert max-w-none">
        <div class="text-[1.0625rem] leading-[1.7] text-on-surface-variant" v-html="post.content"></div>
      </div>

      <footer class="mt-16 pt-8 border-t-2 border-outline-variant/60">
        <div class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary mb-4">DRAWN BY</div>
        <div class="flex items-center gap-4 border border-outline-variant/55 bg-surface-container/40 p-4">
          <div class="relative shrink-0 w-16 h-16 border border-outline-variant/60 p-1">
            <img src="~/assets/images/avatar.jpg" alt="Gilang Ramadan" class="w-full h-full object-cover grayscale opacity-90" />
          </div>
          <div class="min-w-0">
            <h2 class="font-headline text-base font-semibold text-on-surface mb-1">Gilang Ramadan</h2>
            <p class="text-sm leading-[1.55] text-on-surface-variant">
              Senior backend engineer — high-performance systems, payment infrastructure, and the telemetry to prove they work.
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
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'

const route = useRoute()
const { fetchBlogBySlug, incrementBlogViews } = useBlogActions()
const user = useSupabaseUser()

const { data: post, pending, error } = useLazyAsyncData(`blog-${route.params.slug}`, () =>
  fetchBlogBySlug(route.params.slug as string)
)

const isPreview = computed(() => post.value && post.value.status !== 'published')
const isAllowed = computed(() => !isPreview.value || user.value)

const viewedBlogs = useCookie<number[]>('viewed_blogs', {
  default: () => [],
  maxAge: 60 * 60 * 24 * 365
})

watchEffect(() => {
  if (post.value && isAllowed.value) {
    useSeoMeta({
      title: `${post.value.title} | Gilang Ramadan`,
      description: post.value.excerpt || undefined
    })

    if (import.meta.client) {
      const viewsArray = viewedBlogs.value || []
      const currentPost = post.value

      if (currentPost?.id && !viewsArray.includes(currentPost.id)) {
        incrementBlogViews(currentPost.id).then(() => {
          viewsArray.push(currentPost.id)
          viewedBlogs.value = viewsArray
          if (post.value) {
            post.value.views = (post.value.views || 0) + 1
          }
        })
      }

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
  @apply font-headline text-2xl font-semibold mt-12 mb-5 -tracking-[0.02em] text-on-surface;
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
:deep(.prose img) {
  @apply my-8 border border-outline-variant/55 p-1.5;
}
:deep(.prose pre) {
  @apply bg-surface-container-lowest border border-outline-variant/55 p-5 my-8 overflow-x-auto text-sm leading-relaxed !important;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply bg-surface-container px-1.5 py-0.5 text-primary text-sm border border-outline-variant/40;
  font-family: 'IBM Plex Mono', monospace;
}
</style>
