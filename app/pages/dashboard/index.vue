<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <header class="mb-12">
      <h1 class="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tighter">CONTROL_PANEL</h1>
      <p class="text-on-surface-variant text-lg font-mono tracking-wide">
        SYSTEM MANAGEMENT MODULES
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Blog Management Card -->
      <NuxtLink to="/dashboard/blogs" class="group block">
        <div class="bg-surface-container border border-surface-container-high rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="w-16 h-16 rounded-2xl bg-surface-container-highest border border-surface-container-high flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500 relative z-10">
            <span class="material-symbols-outlined text-3xl">article</span>
          </div>
          
          <h2 class="text-2xl font-bold font-headline mb-3 text-on-surface group-hover:text-primary transition-colors relative z-10">
            Blog Management
          </h2>
          
          <p class="text-on-surface-variant mb-8 flex-grow relative z-10">
            Create, edit, and manage blog posts. Handle markdown content, tags, and publication status.
          </p>
          
          <div class="flex items-center gap-2 text-primary font-mono text-sm tracking-widest mt-auto relative z-10">
            <span>ACCESS_MODULE</span>
            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>
      </NuxtLink>

      <!-- Projects Management Card -->
      <NuxtLink to="/dashboard/projects" class="group block">
        <div class="bg-surface-container border border-surface-container-high rounded-3xl p-8 hover:primary/50 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:border-primary/50">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="w-16 h-16 rounded-2xl bg-surface-container-highest border border-surface-container-high flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500 relative z-10">
            <span class="material-symbols-outlined text-3xl">folder</span>
          </div>
          
          <h2 class="text-2xl font-bold font-headline mb-3 text-on-surface group-hover:text-primary transition-colors relative z-10">
            Projects Management
          </h2>
          
          <p class="text-on-surface-variant mb-8 flex-grow relative z-10">
            Manage portfolio projects, including source code links, live demos, and tags.
          </p>
          
          <div class="flex items-center gap-2 text-primary font-mono text-sm tracking-widest mt-auto relative z-10">
            <span>ACCESS_MODULE</span>
            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

useSeoMeta({
  title: 'Control Panel | System',
  description: 'Manage system modules.'
})
</script>
