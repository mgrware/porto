<template>
  <div
    v-if="isPreview && isAllowed"
    class="border-b border-outline-variant/60 bg-surface-container px-4 py-2.5 flex justify-center items-center gap-2 text-mono text-[0.6875rem] tracking-[0.12em] text-primary"
  >
    <span class="w-1.5 h-1.5 bg-primary animate-bp-pulse"></span>
    {{ m.blog.preview }}
  </div>

  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <NuxtLink
      to="/blog"
      class="group inline-flex items-center gap-2 mb-7 text-mono text-xs tracking-[0.08em] text-secondary hover:text-primary transition-colors"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="group-hover:-translate-x-1 transition-transform" aria-hidden="true">
        <path d="M20 12H5" /><path d="M11 18l-6-6 6-6" />
      </svg>
      {{ m.blog.back }}
    </NuxtLink>

    <BaseLoader v-if="pending" />

    <div v-else-if="error || !post || !isAllowed" class="border border-dashed border-outline-variant/60 px-4 py-16 text-center">
      <h1 class="font-headline text-2xl font-semibold text-on-surface mb-2">{{ m.blog.notFound }}</h1>
      <p class="text-mono text-[0.8125rem] text-outline mb-6">{{ m.blog.notFoundBody }}</p>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 px-[1.125rem] py-3 bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] transition-colors"
      >{{ m.blog.backToBlog }}</NuxtLink>
    </div>

    <template v-else>
      <SheetRule :sheet="sheet" :caption="`${m.blog.entry} ${entryRef}`" />

      <div class="flex flex-wrap items-center gap-x-5 gap-y-3 mb-5 text-mono text-xs tracking-[0.1em]">
        <span class="text-primary">{{ sheetDate(post.created_at) }}</span>
        <span class="w-1.5 h-1.5 bg-outline-variant rotate-45"></span>
        <span class="text-outline">{{ readTime(post.content) }} {{ m.blog.minRead }}</span>
        <span class="w-1.5 h-1.5 bg-outline-variant rotate-45"></span>
        <span class="inline-flex items-center gap-1.5 text-outline">
          <BaseIcon class="text-sm">visibility</BaseIcon>
          {{ post.views || 0 }} {{ m.blog.views }}
        </span>
        <span class="flex-1"></span>
        <NuxtLink
          v-if="user"
          :to="`/dashboard/blogs/edit/${post.id}`"
          class="inline-flex items-center gap-2 px-2.5 py-1.5 border border-outline-variant/60 text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
        >
          <BaseIcon class="text-sm">edit</BaseIcon>
          {{ m.blog.edit }}
        </NuxtLink>
      </div>

      <h1 class="font-headline text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.06] -tracking-[0.03em] text-on-surface mb-5 max-w-[30ch] text-pretty">
        {{ post.title }}
      </h1>

      <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-[0.4375rem] mb-7">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-mono text-[0.6875rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-2 py-1"
        >{{ tag }}</span>
      </div>

      <!-- plate -->
      <div class="relative border border-outline-variant/55 bg-background/60 mb-8 lg:mb-11">
        <span class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-outline-variant z-10"></span>
        <span class="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-outline-variant z-10"></span>
        <span class="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-outline-variant z-10"></span>
        <span class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-outline-variant z-10"></span>
        <img v-if="post.image_url" :src="post.image_url" :alt="post.title" class="w-full aspect-[21/9] object-cover" />
        <div v-else class="bp-hatch aspect-[21/9] flex items-center justify-center">
          <span class="text-mono text-xs tracking-[0.12em] text-outline">{{ m.blog.plate }} {{ sheet }} — {{ m.blog.coverMissing }}</span>
        </div>
        <div class="flex flex-wrap justify-between gap-x-4 gap-y-2 px-4 py-2.5 border-t border-outline-variant/45 text-mono text-[0.625rem] tracking-[0.1em] text-outline">
          <span class="truncate max-w-[70%]">{{ m.blog.fig }} — {{ post.title.toUpperCase() }}</span>
          <span>{{ m.blog.scale }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <article class="lg:col-span-2 min-w-0 max-w-[46rem]">
          <div ref="contentEl" class="prose prose-invert max-w-none" v-html="post.content"></div>

          <div class="flex items-stretch gap-5 mt-10 lg:mt-14 pt-7 border-t-2 border-outline-variant/55">
            <div class="relative shrink-0 w-[72px] h-[72px] border border-outline-variant/60 p-1 bg-surface-container/60">
              <img src="~/assets/images/avatar.jpg" alt="Gilang Ramadan" class="w-full h-full object-cover grayscale opacity-90" />
              <span class="absolute -top-px -left-px w-[9px] h-[9px] border-t-2 border-l-2 border-primary"></span>
              <span class="absolute -bottom-px -right-px w-[9px] h-[9px] border-b-2 border-r-2 border-primary"></span>
            </div>
            <div class="min-w-0 flex flex-col justify-center gap-1.5">
              <div class="text-mono text-[0.625rem] tracking-[0.12em] text-outline">{{ m.blog.drawnBy }}</div>
              <div class="font-headline text-[1.0625rem] font-semibold text-on-surface">Gilang Ramadan</div>
              <p class="text-sm leading-[1.55] text-on-surface-variant">
                {{ m.blog.authorBio }}
              </p>
            </div>
          </div>
        </article>

        <aside class="min-w-0 lg:sticky lg:top-[88px] flex flex-col gap-5">
          <nav v-if="toc.length" class="border border-outline-variant/55 bg-surface-container/50">
            <div class="px-4 py-2.5 border-b border-outline-variant/45 text-mono text-[0.625rem] tracking-[0.12em] text-secondary">
              {{ m.blog.onThisSheet }}
            </div>
            <a
              v-for="(item, index) in toc"
              :key="item.id"
              :href="`#${item.id}`"
              class="flex gap-3 px-4 py-2.5 border-b border-outline-variant/[0.28] last:border-b-0 text-sm leading-[1.45] text-on-surface-variant hover:text-on-surface hover:bg-outline-variant/[0.14] transition-colors"
            >
              <span class="text-mono text-[0.6875rem] text-primary shrink-0">{{ String(index + 1).padStart(2, '0') }}</span>
              {{ item.text }}
            </a>
          </nav>

          <div class="border border-outline-variant/55 bg-surface-container/50">
            <div class="px-4 py-2.5 border-b border-outline-variant/45 text-mono text-[0.625rem] tracking-[0.12em] text-secondary">
              {{ m.blog.entryRecord }}
            </div>
            <div
              v-for="row in entryRecord"
              :key="row.label"
              class="flex justify-between gap-4 px-4 py-[0.6875rem] border-b border-outline-variant/[0.28] last:border-b-0 min-w-0"
            >
              <span class="text-mono text-[0.6875rem] tracking-[0.08em] text-outline shrink-0">{{ row.label }}</span>
              <span class="text-mono text-xs text-on-surface text-right min-w-0 truncate">{{ row.value }}</span>
            </div>
          </div>
        </aside>
      </div>

      <div v-if="prev || next" class="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-outline-variant/55 mt-8 lg:mt-12">
        <NuxtLink v-if="prev" :to="`/blog/${prev.slug}`" class="group py-5 border-b border-outline-variant/40 min-w-0">
          <div class="text-mono text-[0.625rem] tracking-[0.12em] text-outline mb-[0.4375rem]">◀ {{ m.blog.prevSheet }} · {{ prevSheet }}</div>
          <div class="font-headline text-[1.0625rem] font-semibold text-on-surface group-hover:text-primary transition-colors">{{ prev.title }}</div>
        </NuxtLink>
        <span v-else class="hidden sm:block border-b border-outline-variant/40"></span>
        <NuxtLink v-if="next" :to="`/blog/${next.slug}`" class="group py-5 border-b border-outline-variant/40 sm:text-right min-w-0">
          <div class="text-mono text-[0.625rem] tracking-[0.12em] text-outline mb-[0.4375rem]">{{ m.blog.nextSheet }} · {{ nextSheet }} ▶</div>
          <div class="font-headline text-[1.0625rem] font-semibold text-on-surface group-hover:text-primary transition-colors">{{ next.title }}</div>
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
import SheetRule from '~/components/molecules/SheetRule.vue'
import type { BlogPost } from '~/composables/useBlogActions'
import { entryNo, readTime, sheetDate, sheetNo } from '~/composables/useSheetRefs'

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
const sheet = computed(() => (position.value >= 0 ? sheetNo('06', position.value) : '06'))
const entryRef = computed(() => (post.value ? entryNo(post.value, Math.max(position.value, 0)) : ''))
// The list is newest first, so the previous sheet sits after this one.
const prev = computed(() => (position.value > 0 ? posts.value?.[position.value - 1] : null))
const next = computed(() => (position.value >= 0 ? posts.value?.[position.value + 1] : null))
const prevSheet = computed(() => sheetNo('06', position.value - 1))
const nextSheet = computed(() => sheetNo('06', position.value + 1))

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
  @apply font-headline text-2xl font-semibold mt-10 mb-4 pb-3 -tracking-[0.02em] text-on-surface border-b-2 border-outline-variant/55 scroll-mt-24;
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
  @apply border-l-2 border-primary bg-surface-container/50 pl-5 pr-4 py-4 my-6 text-on-background;
}
:deep(.prose img) {
  @apply my-8 border border-outline-variant/55 p-1.5;
}
:deep(.prose pre) {
  @apply bg-surface-container-lowest border border-outline-variant/55 p-[1.125rem] my-7 overflow-x-auto text-[0.8125rem] leading-[1.75] !important;
  font-family: 'IBM Plex Mono', monospace;
}
:deep(.prose code:not(pre code):not(pre.ql-syntax)) {
  @apply text-primary text-[0.9375rem] border border-outline-variant/50 px-1.5 py-px;
  font-family: 'IBM Plex Mono', monospace;
}
</style>
