<template>
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <AdminHeading code="ADM · 01" title="Blog entries" note="Draft, publish, and edit field notes.">
      <NuxtLink
        to="/dashboard/blogs/new"
        class="inline-flex items-center min-h-11 gap-2 px-[1.125rem] bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] transition-colors"
      >
        <BaseIcon class="text-base">add</BaseIcon>
        New entry
      </NuxtLink>
    </AdminHeading>

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="border border-error/60 bg-error/10 px-4 py-3.5 text-mono text-[0.8125rem] text-error">
      Could not load entries: {{ error.message }}
    </div>

    <template v-else>
      <AdminSearch v-model="searchQuery" placeholder="Search by title or tag" />

      <div class="border border-outline-variant/55 bg-surface-container/40 overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-outline-variant/55 text-mono text-[0.625rem] tracking-[0.12em] text-outline">
              <th class="px-4 py-3 font-normal">TITLE</th>
              <th class="px-4 py-3 font-normal">STATUS</th>
              <th class="px-4 py-3 font-normal hidden md:table-cell">VIEWS</th>
              <th class="px-4 py-3 font-normal hidden md:table-cell">FILED</th>
              <th class="px-4 py-3 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in filteredPosts" :key="post.id" class="border-b border-outline-variant/[0.28] last:border-b-0 hover:bg-outline-variant/[0.08] transition-colors">
              <td class="px-4 py-4 min-w-[14rem]">
                <div class="font-headline font-semibold text-on-surface">{{ post.title }}</div>
                <div class="text-mono text-xs text-outline mt-1">/blog/{{ post.slug }}</div>
                <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-x-2 gap-y-1 mt-2">
                  <span v-for="tag in post.tags" :key="tag" class="text-mono text-[0.6875rem] text-secondary">#{{ tag }}</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <button
                  role="switch"
                  :aria-checked="post.status === 'published'"
                  :aria-label="`Published: ${post.title}`"
                  class="inline-flex items-center gap-2.5 min-h-11 text-mono text-[0.6875rem] tracking-[0.08em]"
                  :class="post.status === 'published' ? 'text-primary' : 'text-on-surface-variant'"
                  @click="toggleBlogStatus(post, refresh)"
                >
                  <span
                    class="relative inline-flex w-9 h-5 border transition-colors"
                    :class="post.status === 'published' ? 'border-primary bg-primary/20' : 'border-outline-variant'"
                  >
                    <span
                      class="absolute top-[3px] w-3 h-3 transition-transform"
                      :class="post.status === 'published' ? 'bg-primary translate-x-[19px]' : 'bg-outline translate-x-[3px]'"
                    ></span>
                  </span>
                  {{ post.status === 'published' ? 'PUBLISHED' : 'DRAFT' }}
                </button>
              </td>
              <td class="px-4 py-4 text-mono text-[0.8125rem] text-on-surface-variant hidden md:table-cell">{{ post.views || 0 }}</td>
              <td class="px-4 py-4 text-mono text-[0.8125rem] text-on-surface-variant hidden md:table-cell">{{ sheetDate(post.created_at) }}</td>
              <td class="px-4 py-4">
                <div class="flex justify-end gap-1.5">
                  <NuxtLink :to="`/blog/${post.slug}`" target="_blank" :aria-label="`Preview ${post.title}`" :title="'Preview'" class="admin-icon-btn">
                    <BaseIcon class="text-lg">visibility</BaseIcon>
                  </NuxtLink>
                  <NuxtLink :to="`/dashboard/blogs/edit/${post.id}`" :aria-label="`Edit ${post.title}`" :title="'Edit'" class="admin-icon-btn text-primary">
                    <BaseIcon class="text-lg">edit</BaseIcon>
                  </NuxtLink>
                  <button :aria-label="`Delete ${post.title}`" title="Delete" class="admin-icon-btn text-error hover:border-error" @click="deleteBlogWithConfirm(post.id, refresh)">
                    <BaseIcon class="text-lg">delete</BaseIcon>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredPosts.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-mono text-[0.8125rem] text-outline">
                {{ posts?.length ? 'No entries match that search.' : 'No entries yet. Start with “New entry”.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import AdminHeading from '~/components/molecules/AdminHeading.vue'
import AdminSearch from '~/components/molecules/AdminSearch.vue'
import { sheetDate } from '~/composables/useSheetRefs'

const { fetchBlogs, toggleBlogStatus, deleteBlogWithConfirm } = useBlogActions()

const { data: posts, pending, error, refresh } = await useAsyncData('dashboard-blogs', () => fetchBlogs())

const searchQuery = ref('')
const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!searchQuery.value) return posts.value
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.tags?.some(tag => tag.toLowerCase().includes(query))
  )
})

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})
</script>
