<template>
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <div class="flex items-center gap-4 mb-7 lg:mb-11">
      <span class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary">SHEET 05</span>
      <span class="flex-1 h-px bg-outline-variant/45"></span>
      <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.14em] text-outline">LOG REGISTER — WRITTEN NOTES</span>
    </div>

    <div v-reveal class="flex flex-wrap items-end gap-x-6 gap-y-4 mb-8">
      <h1 class="font-headline text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold -tracking-[0.02em] text-on-surface">Blog</h1>
      <span class="flex-1 basis-24 h-px bg-outline-variant/45 mb-3"></span>
      <p class="text-[0.9375rem] text-outline max-w-sm mb-1">
        Notes on software architecture, backend engineering, and systems that stay up.
      </p>
    </div>

    <div v-reveal class="flex items-center gap-3 border border-outline-variant/55 bg-surface-container/40 px-4 mb-10 max-w-xl">
      <span class="text-mono text-[0.8125rem] text-primary">/</span>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="filter by title, content, or tag"
        aria-label="Search articles"
        class="w-full bg-transparent py-3.5 text-mono text-[0.8125rem] text-on-surface placeholder:text-outline focus:outline-none"
      />
      <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.1em] text-outline shrink-0">{{ filteredPosts.length }} / {{ posts?.length || 0 }}</span>
    </div>

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="border border-error/60 bg-error/10 px-4 py-3.5 text-mono text-[0.8125rem] text-error">
      ERR — could not load posts: {{ error.message }}
    </div>

    <div v-else-if="filteredPosts.length === 0" class="border border-dashed border-outline-variant/60 px-4 py-16 text-center text-mono text-[0.8125rem] text-outline">
      no entries match this filter
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-outline-variant/50">
      <NuxtLink
        v-for="(post, index) in filteredPosts"
        :key="post.id"
        v-reveal
        :to="`/blog/${post.slug}`"
        class="group flex flex-col border-r border-b border-outline-variant/50 bg-surface-container/35 hover:bg-surface-container/70 transition-colors min-w-0"
      >
        <div class="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-outline-variant/40">
          <span class="text-mono text-[0.625rem] tracking-[0.12em] text-primary">LOG · {{ String(index + 1).padStart(2, '0') }}</span>
          <span class="text-mono text-[0.625rem] tracking-[0.1em] text-outline">
            {{ new Date(post.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() }}
          </span>
        </div>

        <div v-if="post.image_url" class="aspect-video overflow-hidden border-b border-outline-variant/40 bg-surface-container-lowest">
          <img
            :src="post.image_url"
            :alt="post.title"
            class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
        </div>

        <div class="flex-grow flex flex-col gap-3 p-4">
          <h2 class="font-headline text-[1.0625rem] font-semibold leading-snug text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
            {{ post.title }}
          </h2>
          <p v-if="post.excerpt" class="text-sm leading-[1.55] text-on-surface-variant line-clamp-3">{{ post.excerpt }}</p>

          <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-[0.375rem] mt-auto pt-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-mono text-[0.625rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-1.5 py-0.5"
            >{{ tag }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2.5 px-4 py-3 border-t border-outline-variant/40 text-mono text-[0.6875rem] tracking-[0.08em] text-primary">
          Read entry
          <span class="flex-1 h-px bg-outline-variant/40"></span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="group-hover:translate-x-1 transition-transform" aria-hidden="true">
            <path d="M4 12h15" /><path d="M13 6l6 6-6 6" />
          </svg>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '~/components/atoms/BaseLoader.vue'
const { fetchBlogs } = useBlogActions()

const { data: posts, pending, error } = useLazyAsyncData('blogs', () => fetchBlogs(true))

const searchQuery = ref('')
const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!searchQuery.value) return posts.value
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post =>
    post.title.toLowerCase().includes(query) ||
    (post.content && post.content.toLowerCase().includes(query)) ||
    post.tags?.some(tag => tag.toLowerCase().includes(query))
  )
})

useSeoMeta({
  title: 'Blog | Gilang Ramadan',
  description: 'Sharing thoughts on software architecture and backend engineering.'
})
</script>
