<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <header class="mb-16">
      <h1 class="text-5xl font-bold font-headline mb-4 tracking-tighter text-primary">
        BLOG<span class="text-on-background/20">.EXE</span>
      </h1>
      <p class="text-on-surface-variant max-w-2xl text-lg">
        Sharing thoughts on software architecture, backend engineering, and building high-performance systems.
      </p>
    </header>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-error/10 border border-error text-error p-6 rounded-lg">
      <p>Error loading blog posts: {{ error.message }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink 
        v-for="post in posts" 
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="group bg-surface-container border border-surface-container-high rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
      >
        <div class="aspect-video bg-surface-container-highest relative overflow-hidden">
          <img v-if="post.image_url" :src="post.image_url" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
          <div class="absolute bottom-4 left-4 z-20">
            <span class="text-[10px] font-mono bg-primary/20 text-primary px-2 py-1 rounded uppercase tracking-widest">
              {{ new Date(post.created_at).toLocaleDateString() }}
            </span>
          </div>
        </div>
        
        <div class="p-6 flex-grow">
          <h2 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {{ post.title }}
          </h2>
          <p class="text-on-surface-variant text-sm line-clamp-3 mb-4">
            {{ post.excerpt }}
          </p>
        </div>

        <div class="px-6 py-4 border-t border-surface-container-high flex justify-between items-center bg-surface-container-high/30">
          <span class="text-xs font-mono uppercase tracking-widest text-primary font-bold">READ_MORE</span>
          <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </NuxtLink>
    </div>

    <div v-if="!pending && posts?.length === 0" class="text-center py-20 bg-surface-container rounded-2xl border border-dashed border-surface-container-high">
      <p class="text-on-surface-variant">No blog posts found. Check back later!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchBlogs } = useBlogActions()

const { data: posts, pending, error } = await useAsyncData('blogs', () => fetchBlogs())

useSeoMeta({
  title: 'Blog | Gilang Ramadan',
  description: 'Sharing thoughts on software architecture and backend engineering.'
})
</script>
