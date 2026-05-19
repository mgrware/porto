<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <header class="mb-12">
      <NuxtLink to="/dashboard/projects" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group">
        <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span class="text-xs font-mono uppercase tracking-widest">RETURN_TO_PROJECTS</span>
      </NuxtLink>
      <h1 class="text-4xl font-bold font-headline tracking-tighter">NEW<span class="text-primary">_PROJECT</span></h1>
    </header>

    <form @submit.prevent="handleSubmit" class="space-y-8 bg-surface-container border border-surface-container-high p-8 rounded-3xl shadow-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-2 md:col-span-2">
          <div class="flex justify-between items-center">
            <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">PROJECT_TITLE</label>
            <button type="button" @click="generateSlug" class="text-[10px] text-primary font-mono uppercase tracking-widest hover:underline">
              AUTO-GENERATE SLUG
            </button>
          </div>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="e.g. E-Commerce Microservices Architecture"
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">PROJECT_SLUG</label>
          <input 
            v-model="form.slug" 
            type="text" 
            placeholder="e-commerce-microservices-architecture"
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        <div class="space-y-2 md:col-span-1">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">RELEASE_YEAR</label>
          <input 
            v-model="form.year" 
            type="text" 
            placeholder="e.g. 2025"
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        <div class="space-y-2 md:col-span-1">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">MATERIAL_ICON</label>
          <div class="flex items-center gap-4">
            <input 
              v-model="form.icon" 
              type="text" 
              placeholder="e.g. shopping_cart"
              class="flex-1 bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
              required
            />
            <div class="w-12 h-12 bg-background border border-surface-container-high rounded-xl flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">{{ form.icon || 'help' }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">COLOR_THEME_CLASS</label>
          <select 
            v-model="form.color_class" 
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors appearance-none"
            required
          >
            <option value="from-blue-600 to-cyan-400">Blue to Cyan</option>
            <option value="from-purple-600 to-pink-500">Purple to Pink</option>
            <option value="from-red-600 to-orange-500">Red to Orange</option>
            <option value="from-emerald-600 to-teal-400">Emerald to Teal</option>
            <option value="from-indigo-600 to-blue-500">Indigo to Blue</option>
            <option value="from-yellow-500 to-orange-400">Yellow to Orange</option>
          </select>
          <div class="mt-2 h-4 rounded-full bg-gradient-to-r" :class="form.color_class"></div>
        </div>
        
        <div class="space-y-2 md:col-span-1">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">DEMO_LINK (OPTIONAL)</label>
          <input 
            v-model="form.demo_link" 
            type="url" 
            placeholder="https://..."
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div class="space-y-2 md:col-span-1">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">REPO_LINK (OPTIONAL)</label>
          <input 
            v-model="form.repo_link" 
            type="url" 
            placeholder="https://github.com/..."
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">PROJECT_TAGS (MULTI_SELECT)</label>
        <MoleculesTagInput v-model="form.tags" />
      </div>

      <div class="space-y-2">
        <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">PROJECT_IMAGE</label>
        <div class="flex flex-col gap-4">
          <input 
            type="file" 
            accept="image/*"
            class="hidden"
            ref="fileInput"
            @change="onFileSelected"
          />
          <div 
            @click="triggerFileInput"
            class="w-full h-48 border-2 border-dashed border-surface-container-high rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden bg-background/50 group"
          >
            <div v-if="previewUrl" class="w-full h-full relative">
              <img :src="previewUrl" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span class="material-symbols-outlined text-white">edit</span>
              </div>
            </div>
            <div v-else class="flex flex-col items-center gap-2 text-on-surface-variant">
              <span class="material-symbols-outlined text-4xl">add_photo_alternate</span>
              <span class="text-[10px] font-mono uppercase tracking-widest">UPLOAD_PROJECT_IMAGE</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">PROJECT_DESCRIPTION (HTML_SUPPORTED)</label>
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
            <div class="w-full h-[200px] bg-background border border-surface-container-high rounded-xl flex items-center justify-center text-on-surface-variant font-mono text-sm">
              LOADING_EDITOR...
            </div>
          </template>
        </ClientOnly>
      </div>

      <div v-if="errorMsg" class="text-error text-xs font-mono bg-error/10 p-4 rounded-xl border border-error/20">
        {{ errorMsg }}
      </div>

      <div class="flex justify-end">
        <button 
          type="submit" 
          :disabled="loading"
          class="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          <span v-if="loading" class="animate-spin material-symbols-outlined">sync</span>
          <span v-else class="font-mono tracking-widest">CREATE_PROJECT</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
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
