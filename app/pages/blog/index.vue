<template>
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <SheetRule sheet="06" :caption="m.blog.caption" />

    <div v-reveal class="flex flex-wrap items-end gap-x-8 gap-y-4 mb-8">
      <h1 class="font-headline text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold -tracking-[0.03em] leading-[1.05] text-on-surface">{{ m.blog.title }}</h1>
      <p class="text-[1.0625rem] leading-[1.6] text-on-surface-variant max-w-[34rem] mb-1.5">
        {{ m.blog.intro }}
      </p>
    </div>

    <div v-reveal class="flex items-center gap-3 border border-outline-variant/60 bg-surface-container/50 px-3.5 max-w-[34rem] mb-7">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="text-outline shrink-0" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" />
      </svg>
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="m.blog.searchPlaceholder"
        :aria-label="m.blog.searchAria"
        class="flex-1 min-w-0 bg-transparent border-0 outline-none py-3.5 text-mono text-[0.8125rem] text-on-surface placeholder:text-outline"
      />
      <span class="hidden sm:inline text-mono text-[0.625rem] tracking-[0.1em] text-outline shrink-0">
        {{ String(filteredPosts.length).padStart(2, '0') }} / {{ String(posts?.length || 0).padStart(2, '0') }}
      </span>
    </div>

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="border border-error/60 bg-error/10 px-4 py-3.5 text-mono text-[0.8125rem] text-error">
      {{ m.blog.loadError }} {{ error.message }}
    </div>

    <template v-else>
      <div class="flex flex-wrap gap-x-8 gap-y-2 py-3 border-t-2 border-outline-variant/55 border-b border-outline-variant/40 text-mono text-[0.625rem] tracking-[0.12em] text-outline">
        <span>{{ m.blog.entries }} · {{ String(posts?.length || 0).padStart(2, '0') }}</span>
        <span v-if="latest">{{ m.blog.latest }} · {{ latest }}</span>
        <span class="flex-1"></span>
        <span class="text-primary">{{ m.blog.sorted }}</span>
      </div>

      <div v-if="filteredPosts.length" class="flex flex-col">
        <article
          v-for="(post, index) in filteredPosts"
          :key="post.id"
          v-reveal
          class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-x-8 lg:gap-x-12 py-5 lg:py-7 border-b border-outline-variant/40 min-w-0"
        >
          <div class="flex items-start gap-3 min-w-0">
            <span
              :class="['shrink-0 w-[9px] h-[9px] mt-1.5 rotate-45', index === 0 ? 'bg-primary' : 'bg-outline-variant']"
            ></span>
            <div class="min-w-0">
              <div class="text-mono text-xs tracking-[0.06em] text-primary">{{ sheetDate(post.created_at) }}</div>
              <div class="text-mono text-[0.625rem] tracking-[0.1em] text-outline mt-1.5">
                {{ readTime(post.content) }} {{ m.blog.minRead }} · {{ post.views || 0 }} {{ m.blog.views }}
              </div>
            </div>
          </div>

          <div class="md:col-span-2 min-w-0 flex flex-col gap-3">
            <h2 class="font-headline text-[clamp(1.1875rem,2.1vw,1.5rem)] font-semibold -tracking-[0.02em] leading-[1.25] text-on-surface text-pretty">
              <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-primary transition-colors">{{ post.title }}</NuxtLink>
            </h2>

            <p v-if="post.excerpt" class="text-[0.9375rem] leading-[1.6] text-on-surface-variant max-w-[52rem] text-pretty">
              {{ post.excerpt }}
            </p>

            <div class="flex flex-wrap items-center gap-x-3.5 gap-y-[0.4375rem]">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-mono text-[0.6875rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-2 py-1"
              >{{ tag }}</span>
              <span class="flex-1"></span>
              <NuxtLink
                :to="`/blog/${post.slug}`"
                class="group inline-flex items-center gap-[0.4375rem] text-mono text-xs tracking-[0.06em] text-primary"
              >
                {{ m.blog.readEntry }}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  <path d="M4 12h15" /><path d="M13 6l6 6-6 6" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="border border-dashed border-outline-variant/60 px-6 py-16 text-center text-mono text-[0.8125rem] text-outline mt-6">
        {{ m.blog.noMatch }}
      </div>

      <div class="pt-8">
        <NuxtLink
          to="/#hero"
          class="inline-flex items-center gap-2 px-[1.125rem] py-3 border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-[0.8125rem] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <path d="M20 12H5" /><path d="M11 18l-6-6 6-6" />
          </svg>
          {{ m.blog.backHome }}
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import SheetRule from '~/components/molecules/SheetRule.vue'
import { readTime, sheetDate } from '~/composables/useSheetRefs'

const { fetchBlogs } = useBlogActions()
const { m } = useLocale()

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

const latest = computed(() => {
  const newest = posts.value?.[0]?.created_at
  return newest
    ? new Date(newest).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()
    : ''
})

useSeoMeta({
  title: () => m.value.blog.seoTitle,
  description: () => m.value.blog.seoDescription
})
</script>
