<template>
  <div
    v-if="isPreview && isAllowed"
    class="sticky top-0 z-[60] bg-primary/15 backdrop-blur-md border-b border-primary/30 px-4 py-2.5 flex justify-center items-center gap-2 text-xs font-semibold text-primary"
  >
    <span class="w-2 h-2 rounded-full bg-primary animate-bp-pulse"></span>
    {{ m.blog.preview }}
  </div>

  <div class="max-w-6xl mx-auto px-4 py-12 lg:py-16">
    <NuxtLink
      to="/blog"
      class="group inline-flex items-center gap-2 mb-8 text-sm font-medium text-secondary hover:text-primary transition-colors"
    >
      <BaseIcon class="text-base group-hover:-translate-x-1 transition-transform">arrow_back</BaseIcon>
      {{ m.blog.back }}
    </NuxtLink>

    <BaseLoader v-if="pending" />

    <div v-else-if="error || !post || !isAllowed" class="glass px-6 py-16 text-center">
      <h1 class="font-headline text-2xl font-bold text-on-surface mb-2">{{ m.blog.notFound }}</h1>
      <p class="text-sm text-outline mb-6">{{ m.blog.notFoundBody }}</p>
      <NuxtLink to="/blog" class="btn-primary">{{ m.blog.backToBlog }}</NuxtLink>
    </div>

    <template v-else>
      <header v-reveal class="text-center max-w-4xl mx-auto mb-10">
        <div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-6 text-sm text-outline">
          <span class="inline-flex items-center gap-1.5 text-primary font-medium">
            <BaseIcon class="text-base">calendar_month</BaseIcon>{{ sheetDate(post.created_at) }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <BaseIcon class="text-base">schedule</BaseIcon>{{ readTime(post.content) }} {{ m.blog.minRead }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <BaseIcon class="text-base">visibility</BaseIcon>{{ post.views || 0 }} {{ m.blog.views }}
          </span>
          <NuxtLink
            v-if="user"
            :to="`/dashboard/blogs/edit/${post.id}`"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-outline-variant/50 text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
          >
            <BaseIcon class="text-sm">edit</BaseIcon>
            {{ m.blog.edit }}
          </NuxtLink>
        </div>

        <h1 class="font-headline text-4xl md:text-6xl font-bold leading-tight text-on-surface mb-6 text-balance">
          {{ post.title }}
        </h1>

        <div v-if="post.tags && post.tags.length" class="flex flex-wrap justify-center gap-2">
          <span v-for="tag in post.tags" :key="tag" class="chip">{{ tag }}</span>
        </div>
      </header>

      <div v-reveal class="overflow-hidden rounded-3xl border border-outline-variant/30 shadow-2xl shadow-primary/10 mb-12">
        <img v-if="post.image_url" :src="post.image_url" :alt="post.title" class="w-full aspect-[21/9] object-cover" />
        <div v-else class="bp-hatch aspect-[21/9] grid place-items-center">
          <BaseIcon class="text-7xl text-primary/60">article</BaseIcon>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <article class="lg:col-span-2 min-w-0">
          <div ref="contentEl" class="prose prose-invert max-w-none" v-html="post.content"></div>

          <div class="glass flex items-center gap-5 p-6 mt-12">
            <img src="~/assets/images/avatar.jpg" alt="Gilang Ramadan" class="w-16 h-16 shrink-0 rounded-2xl object-cover ring-2 ring-primary/50" />
            <div class="min-w-0">
              <div class="text-xs text-outline mb-1">{{ m.blog.drawnBy }}</div>
              <div class="font-headline text-lg font-bold text-on-surface">Gilang Ramadan</div>
              <p class="text-sm leading-relaxed text-on-surface-variant">{{ m.blog.authorBio }}</p>
            </div>
          </div>
        </article>

        <aside class="min-w-0 lg:sticky lg:top-28 flex flex-col gap-6">
          <nav v-if="toc.length" class="glass p-5">
            <div class="text-sm font-semibold text-secondary mb-3">{{ m.blog.onThisSheet }}</div>
            <a
              v-for="(item, index) in toc"
              :key="item.id"
              :href="`#${item.id}`"
              class="flex gap-3 px-3 py-2 rounded-lg text-sm leading-snug text-on-surface-variant hover:text-on-surface hover:bg-primary/10 transition-colors"
            >
              <span class="text-primary font-semibold shrink-0">{{ index + 1 }}.</span>
              {{ item.text }}
            </a>
          </nav>

          <div class="glass p-5">
            <div class="text-sm font-semibold text-secondary mb-3">{{ m.blog.entryRecord }}</div>
            <div
              v-for="row in entryRecord"
              :key="row.label"
              class="flex justify-between gap-4 py-2 border-b border-outline-variant/20 last:border-b-0 min-w-0"
            >
              <span class="text-xs text-outline shrink-0">{{ row.label }}</span>
              <span class="text-xs font-medium text-on-surface text-right min-w-0 truncate">{{ row.value }}</span>
            </div>
          </div>
        </aside>
      </div>

      <div v-if="prev || next" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        <NuxtLink v-if="prev" :to="`/blog/${prev.slug}`" class="group glass glass-hover p-6 min-w-0">
          <div class="flex items-center gap-1 text-xs text-outline mb-2"><BaseIcon class="text-sm">arrow_back</BaseIcon>{{ m.blog.prevSheet }}</div>
          <div class="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">{{ prev.title }}</div>
        </NuxtLink>
        <span v-else class="hidden sm:block"></span>
        <NuxtLink v-if="next" :to="`/blog/${next.slug}`" class="group glass glass-hover p-6 sm:text-right min-w-0">
          <div class="flex items-center sm:justify-end gap-1 text-xs text-outline mb-2">{{ m.blog.nextSheet }}<BaseIcon class="text-sm">arrow_forward</BaseIcon></div>
          <div class="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">{{ next.title }}</div>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import type { BlogPost } from '~/composables/useBlogActions'
import { entryNo, readTime, sheetDate } from '~/composables/useSheetRefs'

const route = useRoute()
const { fetchBlogs, fetchBlogBySlug, incrementBlogViews } = useBlogActions()
const user = useSupabaseUser()
const { m } = useLocale()

const { data: post, pending, error } = useLazyAsyncData(`blog-${route.params.slug}`, () =>
  fetchBlogBySlug(route.params.slug as string)
)

// Shares the index page's cache key, so navigating from the list costs nothing.
const { data: posts } = useLazyAsyncData('blogs', () => fetchBlogs(true))

const isPreview = computed(() => post.value && post.value.status !== 'published')
const isAllowed = computed(() => !isPreview.value || user.value)

const position = computed(() => (posts.value || []).findIndex((p: BlogPost) => p.slug === post.value?.slug))
const entryRef = computed(() => (post.value ? entryNo(post.value, Math.max(position.value, 0)) : ''))
// The list is newest first, so the previous sheet sits after this one.
const prev = computed(() => (position.value > 0 ? posts.value?.[position.value - 1] : null))
const next = computed(() => (position.value >= 0 ? posts.value?.[position.value + 1] : null))

const entryRecord = computed(() => {
  if (!post.value) return []
  return [
    { label: m.value.blog.record.entry, value: entryRef.value },
    { label: m.value.blog.record.filed, value: sheetDate(post.value.created_at) },
    { label: m.value.blog.record.status, value: (post.value.status || 'draft').toUpperCase() },
    { label: m.value.blog.record.readTime, value: `${readTime(post.value.content)} ${m.value.blog.record.min}` },
    { label: m.value.blog.record.views, value: String(post.value.views || 0) },
    { label: m.value.blog.record.tags, value: String(post.value.tags?.length || 0) }
  ]
})

// Table of contents, built from the headings the editor actually produced.
const contentEl = ref<HTMLElement | null>(null)
const toc = ref<{ id: string; text: string }[]>([])

const buildToc = () => {
  const root = contentEl.value
  if (!root) return
  toc.value = Array.from(root.querySelectorAll('h2')).map((heading, index) => {
    const text = heading.textContent?.trim() || `Section ${index + 1}`
    if (!heading.id) heading.id = `s${index + 1}`
    return { id: heading.id, text }
  })
}

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
        buildToc()
      })
    }
  }
})
</script>

<style scoped lang="postcss">
:deep(.prose > p:first-child) {
  @apply text-[1.125rem] text-on-background;
}
:deep(.prose h2) {
  @apply font-headline text-2xl font-semibold mt-10 mb-4 pb-3 -tracking-[0.02em] text-on-surface border-b border-outline-variant/30 scroll-mt-24;
}
:deep(.prose h3) {
  @apply font-headline text-lg font-semibold mt-8 mb-3 text-on-surface;
}
:deep(.prose p) {
  @apply mb-5 text-[1.0625rem] leading-[1.7] text-on-surface-variant;
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
:deep(.prose img) {
  @apply my-8 rounded-2xl border border-outline-variant/30 shadow-xl;
}
:deep(.prose pre) {
  @apply rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-5 my-7 overflow-x-auto text-[0.8125rem] leading-[1.75] !important;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply rounded-md bg-primary/10 text-primary text-[0.9375rem] px-1.5 py-px;
  font-family: 'IBM Plex Mono', monospace;
}
</style>
