<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
      <div>
        <h1 class="text-4xl font-bold font-headline tracking-tighter mb-2">CONTROL<span class="text-primary">_PANEL</span></h1>
        <p class="text-on-surface-variant text-sm font-mono uppercase tracking-widest">BLOG_MANAGEMENT_MODULE</p>
      </div>
      <NuxtLink to="/dashboard/new">
        <button class="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span class="material-symbols-outlined text-sm">add</span>
          <span class="font-mono tracking-widest">NEW_ENTRY</span>
        </button>
      </NuxtLink>
    </header>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else class="bg-surface-container border border-surface-container-high rounded-3xl overflow-hidden shadow-xl">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-container-high/50 border-b border-surface-container-high">
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant">TITLE</th>
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant">STATUS</th>
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant hidden md:table-cell">CREATED_AT</th>
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-container-high">
          <tr v-for="post in posts" :key="post.id" class="hover:bg-surface-container-high/20 transition-colors">
            <td class="px-6 py-5">
              <div class="font-bold text-on-background">{{ post.title }}</div>
              <div class="text-xs text-on-surface-variant font-mono mt-1">/blog/{{ post.slug }}</div>
            </td>
            <td class="px-6 py-5">
              <span 
                class="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-widest font-bold"
                :class="post.status === 'published' ? 'bg-primary/20 text-primary' : 'bg-on-surface-variant/10 text-on-surface-variant'"
              >
                {{ post.status || 'draft' }}
              </span>
            </td>
            <td class="px-6 py-5 text-sm text-on-surface-variant font-mono hidden md:table-cell">
              {{ new Date(post.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-5 text-right space-x-2">
              <button 
                @click="toggleBlogStatus(post, refresh)" 
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none align-middle mr-2"
                :class="post.status === 'published' ? 'bg-primary' : 'bg-surface-container-highest'"
                :title="post.status === 'published' ? 'Unpublish' : 'Publish'"
              >
                <span 
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="post.status === 'published' ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
              <NuxtLink :to="`/blog/${post.slug}`" target="_blank">
                <button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Preview">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </NuxtLink>
              <NuxtLink :to="`/dashboard/edit/${post.id}`">
                <button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                  <span class="material-symbols-outlined">edit</span>
                </button>
              </NuxtLink>
              <button @click="deleteBlogWithConfirm(post.id, refresh)" class="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" title="Delete">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>
          <tr v-if="posts?.length === 0">
            <td colspan="4" class="px-6 py-20 text-center text-on-surface-variant font-mono">
              NO_ENTRIES_FOUND_IN_DATABASE
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchBlogs, toggleBlogStatus, deleteBlogWithConfirm } = useBlogActions()

const { data: posts, pending, refresh } = await useAsyncData('dashboard-blogs', () => fetchBlogs())

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})
</script>
