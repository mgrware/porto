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
            <td class="px-6 py-5 text-sm text-on-surface-variant font-mono hidden md:table-cell">
              {{ new Date(post.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-5 text-right space-x-2">
              <NuxtLink :to="`/dashboard/edit/${post.id}`">
                <button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <span class="material-symbols-outlined">edit</span>
                </button>
              </NuxtLink>
              <button @click="handleDelete(post.id)" class="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>
          <tr v-if="posts?.length === 0">
            <td colspan="3" class="px-6 py-20 text-center text-on-surface-variant font-mono">
              NO_ENTRIES_FOUND_IN_DATABASE
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchBlogs, deleteBlog } = useBlogActions()

const { data: posts, pending, refresh } = await useAsyncData('dashboard-blogs', () => fetchBlogs())

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await deleteBlog(id)
      await refresh()
    } catch (e: any) {
      alert('Error deleting post: ' + e.message)
    }
  }
}

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})
</script>
