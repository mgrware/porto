<template>
  <div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
    <SheetHeading :title="m.blog.title" :note="m.blog.intro" />

    <div v-reveal class="flex items-center gap-3 glass px-4 max-w-xl mx-auto mb-12 focus-within:border-primary/60 transition-colors">
      <BaseIcon class="text-xl text-outline">search</BaseIcon>
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="m.blog.searchPlaceholder"
        :aria-label="m.blog.searchAria"
        class="flex-1 min-w-0 bg-transparent border-0 outline-none py-4 text-sm text-on-surface placeholder:text-outline"
      />
      <span class="hidden sm:inline text-xs text-outline shrink-0">{{ filteredPosts.length }} / {{ posts?.length || 0 }}</span>
    </div>

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="glass !border-error/50 bg-error/10 px-5 py-4 text-sm text-error">
      {{ m.blog.loadError }} {{ error.message }}
    </div>

    <template v-else>
      <div v-if="filteredPosts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          v-reveal
          class="group relative overflow-hidden glass glass-hover flex flex-col min-w-0"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="block overflow-hidden aspect-[16/9]">
            <img
              v-if="post.image_url"
              :src="post.image_url"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div v-else class="bp-hatch w-full h-full grid place-items-center">
              <BaseIcon class="text-5xl text-primary/60">article</BaseIcon>
            </div>
          </NuxtLink>

          <div class="p-6 flex flex-col gap-3 flex-1">
            <div class="flex items-center gap-2 text-xs text-outline">
              <BaseIcon class="text-sm">calendar_month</BaseIcon>
              {{ sheetDate(post.created_at) }}
              <span>·</span>
              {{ readTime(post.content) }} {{ m.blog.minRead }}
              <span>·</span>
              {{ post.views || 0 }} {{ m.blog.views }}
            </div>

            <h2 class="font-headline text-xl font-bold leading-snug text-on-surface group-hover:text-primary transition-colors text-pretty">
              <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
            </h2>

            <p v-if="post.excerpt" class="text-sm leading-relaxed text-on-surface-variant line-clamp-3">{{ post.excerpt }}</p>

            <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
              <span v-for="tag in post.tags" :key="tag" class="chip">{{ tag }}</span>
            </div>

            <NuxtLink :to="`/blog/${post.slug}`" class="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {{ m.blog.readEntry }}
              <BaseIcon class="text-base group-hover:translate-x-1 transition-transform">arrow_forward</BaseIcon>
            </NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="glass px-6 py-16 text-center text-outline">
        {{ posts?.length ? m.blog.noMatch : m.blog.empty }}
      </div>

      <div class="pt-12 text-center">
        <NuxtLink to="/" class="btn-ghost">
          <BaseIcon class="text-base">arrow_back</BaseIcon>
          {{ m.blog.backHome }}
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import SheetHeading from '~/components/molecules/SheetHeading.vue'
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

useSeoMeta({
  title: () => m.value.blog.seoTitle,
  description: () => m.value.blog.seoDescription
})
</script>
