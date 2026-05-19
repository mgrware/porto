<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
      <div>
        <h1 class="text-4xl font-bold font-headline tracking-tighter mb-2">PROJECTS<span class="text-primary">_PANEL</span></h1>
        <p class="text-on-surface-variant text-sm font-mono uppercase tracking-widest">PROJECT_MANAGEMENT_MODULE</p>
      </div>
      <NuxtLink to="/dashboard/projects/new">
        <button class="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span class="material-symbols-outlined text-sm">add</span>
          <span class="font-mono tracking-widest">NEW_PROJECT</span>
        </button>
      </NuxtLink>
    </header>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else class="space-y-6">
      <div class="mb-8 relative max-w-md">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="SEARCH_BY_TITLE_OR_TAG..."
          class="w-full bg-surface-container border border-surface-container-high rounded-2xl pl-12 pr-4 py-3 text-sm font-mono focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div class="bg-surface-container border border-surface-container-high rounded-3xl overflow-hidden shadow-xl">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-container-high/50 border-b border-surface-container-high">
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant">TITLE</th>
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant hidden md:table-cell">YEAR</th>
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant hidden md:table-cell">CREATED_AT</th>
            <th class="px-6 py-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-container-high">
          <tr v-for="project in filteredProjects" :key="project.id" class="hover:bg-surface-container-high/20 transition-colors">
            <td class="px-6 py-5">
              <div class="font-bold text-on-background flex items-center gap-3">
                <img v-if="project.image_url" :src="project.image_url" class="w-10 h-10 rounded-lg object-cover border border-surface-container-high shrink-0" />
                <span v-else class="material-symbols-outlined text-xl text-primary w-10 h-10 flex items-center justify-center bg-surface-container-high rounded-lg shrink-0">{{ project.icon || 'folder' }}</span>
                {{ project.title }}
              </div>
              <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-1 mt-2">
                <span v-for="tag in project.tags" :key="tag" class="text-[9px] font-mono text-primary/70">#{{ tag }}</span>
              </div>
            </td>
            <td class="px-6 py-5 text-sm text-on-surface-variant font-mono hidden md:table-cell">
              {{ project.year }}
            </td>
            <td class="px-6 py-5 text-sm text-on-surface-variant font-mono hidden md:table-cell">
              {{ new Date(project.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-5 text-right space-x-2">
              <NuxtLink :to="project.demo_link || '#'" target="_blank">
                <button class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Preview Demo">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </NuxtLink>
              <NuxtLink :to="`/dashboard/projects/edit/${project.id}`">
                <button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                  <span class="material-symbols-outlined">edit</span>
                </button>
              </NuxtLink>
              <button @click="deleteProjectWithConfirm(project.id, refresh)" class="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" title="Delete">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>
          <tr v-if="filteredProjects.length === 0">
            <td colspan="4" class="px-6 py-20 text-center text-on-surface-variant font-mono">
              NO_PROJECTS_FOUND
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useProjectActions } from '~/composables/useProjectActions'

const { fetchProjects, deleteProjectWithConfirm } = useProjectActions()

const { data: projects, pending, refresh } = await useAsyncData('dashboard-projects', () => fetchProjects())

const searchQuery = ref('')
const filteredProjects = computed(() => {
  if (!projects.value) return []
  if (!searchQuery.value) return projects.value
  const query = searchQuery.value.toLowerCase()
  return projects.value.filter(project => 
    project.title.toLowerCase().includes(query) || 
    project.tags?.some(tag => tag.toLowerCase().includes(query))
  )
})

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})
</script>
