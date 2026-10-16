<template>
  <div class="max-w-6xl mx-auto px-4 py-12 lg:py-16">
    <AdminHeading code="ADM · 02" title="Projects" note="File, order, and edit the drawing index.">
      <NuxtLink
        to="/dashboard/projects/new"
        class="btn-primary min-h-11"
      >
        <BaseIcon class="text-base">add</BaseIcon>
        New project
      </NuxtLink>
    </AdminHeading>

    <BaseLoader v-if="pending" />

    <div v-else-if="error" class="rounded-xl border border-error/50 bg-error/10 px-4 py-3.5 text-sm text-error">
      Could not load projects: {{ error.message }}
    </div>

    <template v-else>
      <AdminSearch v-model="searchQuery" placeholder="Search by title or tag" />

      <div class="glass overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-outline-variant/30 text-xs font-semibold tracking-wider text-outline">
              <th class="px-4 py-3 font-normal">TITLE</th>
              <th class="px-4 py-3 font-normal hidden md:table-cell">YEAR</th>
              <th class="px-4 py-3 font-normal hidden md:table-cell">PRIORITY</th>
              <th class="px-4 py-3 font-normal hidden md:table-cell">FILED</th>
              <th class="px-4 py-3 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in filteredProjects" :key="project.id" class="border-b border-outline-variant/20 last:border-b-0 hover:bg-primary/5 transition-colors">
              <td class="px-4 py-4 min-w-[14rem]">
                <div class="flex items-center gap-3">
                  <img v-if="project.image_url" :src="project.image_url" alt="" class="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <span v-else class="bp-hatch w-10 h-10 rounded-lg shrink-0" aria-hidden="true"></span>
                  <span class="font-headline font-semibold text-on-surface">{{ project.title }}</span>
                </div>
                <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-x-2 gap-y-1 mt-2">
                  <span v-for="tag in project.tags" :key="tag" class="text-mono text-[0.6875rem] text-secondary">#{{ tag }}</span>
                </div>
              </td>
              <td class="px-4 py-4 text-mono text-[0.8125rem] text-on-surface-variant hidden md:table-cell">{{ project.year }}</td>
              <td class="px-4 py-4 text-mono text-[0.8125rem] text-on-surface-variant hidden md:table-cell">{{ project.priority ?? 0 }}</td>
              <td class="px-4 py-4 text-mono text-[0.8125rem] text-on-surface-variant hidden md:table-cell">{{ sheetDate(project.created_at) }}</td>
              <td class="px-4 py-4">
                <div class="flex justify-end gap-1.5">
                  <a
                    v-if="project.demo_link"
                    :href="project.demo_link"
                    target="_blank"
                    rel="noopener"
                    :aria-label="`Open live demo of ${project.title}`"
                    title="Live demo"
                    class="admin-icon-btn"
                  >
                    <BaseIcon class="text-lg">open_in_new</BaseIcon>
                  </a>
                  <NuxtLink :to="`/dashboard/projects/edit/${project.id}`" :aria-label="`Edit ${project.title}`" title="Edit" class="admin-icon-btn text-primary">
                    <BaseIcon class="text-lg">edit</BaseIcon>
                  </NuxtLink>
                  <button :aria-label="`Delete ${project.title}`" title="Delete" class="admin-icon-btn text-error hover:border-error" @click="deleteProjectWithConfirm(project.id, refresh)">
                    <BaseIcon class="text-lg">delete</BaseIcon>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredProjects.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-outline">
                {{ projects?.length ? 'No projects match that search.' : 'No projects yet. Start with “New project”.' }}
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
import { useProjectActions } from '~/composables/useProjectActions'
import { sheetDate } from '~/composables/useSheetRefs'

const { fetchProjects, deleteProjectWithConfirm } = useProjectActions()

const { data: projects, pending, error, refresh } = await useAsyncData('dashboard-projects', () => fetchProjects())

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
