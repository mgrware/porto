<template>
  <div class="max-w-4xl mx-auto px-4 py-12 lg:py-16">
    <NuxtLink to="/dashboard/projects" class="group inline-flex items-center min-h-11 gap-2 mb-4 text-sm font-medium text-secondary hover:text-primary transition-colors">
      <BaseIcon class="text-base group-hover:-translate-x-1 transition-transform" aria-hidden="true">arrow_back</BaseIcon>
      Back to projects
    </NuxtLink>
    <AdminHeading code="ADM · 02" title="New project" />

    <form @submit.prevent="handleSubmit" class="space-y-7 glass p-5 sm:p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-2 md:col-span-2">
          <div class="flex justify-between items-center">
            <label for="project-title" class="admin-label">TITLE</label>
            <button type="button" @click="generateSlug" class="min-h-11 px-1 text-mono text-[0.6875rem] tracking-[0.08em] text-primary hover:underline">
              Generate slug from title
            </button>
          </div>
          <input 
            id="project-title"
            v-model="form.title" 
            type="text" 
            placeholder="e.g. E-Commerce Microservices Architecture"
            class="admin-input"
            required
          />
        </div>

        <label class="block space-y-2 md:col-span-2">
          <span class="admin-label">SLUG</span>
          <input 
            v-model="form.slug" 
            type="text" 
            placeholder="e-commerce-microservices-architecture"
            class="admin-input"
            required
          />
        </label>

        <label class="block space-y-2 md:col-span-1">
          <span class="admin-label">YEAR</span>
          <input 
            v-model="form.year" 
            type="text" 
            placeholder="e.g. 2025"
            class="admin-input"
            required
          />
        </label>

        <label class="block space-y-2 md:col-span-1">
          <span class="admin-label">PRIORITY</span>
          <input 
            v-model.number="form.priority" 
            type="number" 
            placeholder="e.g. 0"
            class="admin-input"
            min="0"
            required
          />
        </label>

        <label class="block space-y-2 md:col-span-1">
          <span class="admin-label">DEMO LINK (OPTIONAL)</span>
          <input 
            v-model="form.demo_link" 
            type="url" 
            placeholder="https://..."
            class="admin-input"
          />
        </label>

        <label class="block space-y-2 md:col-span-1">
          <span class="admin-label">REPOSITORY LINK (OPTIONAL)</span>
          <input 
            v-model="form.repo_link" 
            type="url" 
            placeholder="https://github.com/..."
            class="admin-input"
          />
        </label>
      </div>

      <div class="space-y-2">
        <p class="admin-label">TAGS</p>
        <MoleculesTagInput v-model="form.tags" label="Tags" />
      </div>

      <div class="space-y-2">
        <p class="admin-label">COVER IMAGE</p>
        <div class="flex flex-col gap-4">
          <input 
            type="file" 
            accept="image/*"
            class="hidden"
            ref="fileInput"
            @change="onFileSelected"
          />
          <button
            type="button"
            @click="triggerFileInput"
            class="w-full h-48 rounded-2xl border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center hover:border-primary transition-colors overflow-hidden bg-background/50 group"
          >
            <span v-if="previewUrl" class="block w-full h-full relative">
              <img :src="previewUrl" alt="Cover preview" class="w-full h-full object-cover" />
              <span class="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 flex items-center justify-center transition-opacity">
                <span class="text-mono text-xs text-on-surface">Replace image</span>
              </span>
            </span>
            <span v-else class="flex flex-col items-center gap-2 text-on-surface-variant">
              <BaseIcon class="text-3xl" aria-hidden="true">add_photo_alternate</BaseIcon>
              <span class="text-mono text-xs">Upload cover image</span>
            </span>
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <p class="admin-label">DESCRIPTION</p>
        <ClientOnly>
          <QuillEditor 
            v-model:content="form.description" 
            contentType="html" 
            theme="snow"
            toolbar="full"
            placeholder="<p>Detailed description of the project, architecture, and your role...</p>"
            style="min-height: 200px;"
          />
          <template #fallback>
            <div class="w-full h-[200px] rounded-xl bg-background/50 border border-outline-variant/40 flex items-center justify-center text-mono text-[0.8125rem] text-outline">
              Loading editor…
            </div>
          </template>
        </ClientOnly>
      </div>

      <div v-if="errorMsg" role="alert" class="rounded-xl border border-error/50 bg-error/10 px-4 py-3 text-sm text-error">
        {{ errorMsg }}
      </div>

      <div class="flex justify-end">
        <button 
          type="submit" 
          :disabled="loading"
          class="btn-primary min-h-11 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <BaseIcon v-if="loading" class="text-base animate-spin" aria-hidden="true">progress_activity</BaseIcon>
          <span v-if="loading">Saving…</span>
          <span v-else>Create project</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import AdminHeading from '~/components/molecules/AdminHeading.vue'
import { useProjectActions } from '~/composables/useProjectActions'

const { createProject, uploadImage } = useProjectActions()
const router = useRouter()

const form = ref({
  title: '',
  slug: '',
  description: '',
  year: '',
  icon: 'shopping_cart',
  color_class: 'from-blue-600 to-cyan-400',
  demo_link: '',
  repo_link: '',
  image_url: '',
  priority: 0,
  tags: [] as string[]
})

const loading = ref(false)
const errorMsg = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')

const triggerFileInput = () => {
  fileInput.value?.click()
}

const generateSlug = () => {
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    previewUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

const handleSubmit = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    const payload = {
      ...form.value,
      demo_link: form.value.demo_link || null,
      repo_link: form.value.repo_link || null,
    }
    
    // We omit ensureTagsExist for projects or add it to useProjectActions. 
    // If the user wants to autocomplete, we can use useBlogActions.ensureTagsExist
    const { ensureTagsExist } = useBlogActions()
    if (payload.tags.length) {
      await ensureTagsExist(payload.tags)
    }

    if (selectedFile.value) {
      payload.image_url = await uploadImage(selectedFile.value)
    }

    await createProject(payload as any)
    router.push('/dashboard/projects')
  } catch (e: any) {
    errorMsg.value = e.message || 'Failed to create project'
  } finally {
    loading.value = false
  }
}

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})
</script>
