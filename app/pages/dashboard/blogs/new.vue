<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <header class="mb-12">
      <NuxtLink to="/dashboard/blogs" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group">
        <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span class="text-xs font-mono uppercase tracking-widest">RETURN_TO_PANEL</span>
      </NuxtLink>
      <h1 class="text-4xl font-bold font-headline tracking-tighter">NEW<span class="text-primary">_ENTRY</span></h1>
    </header>

    <form @submit.prevent="handleSubmit" class="space-y-8 bg-surface-container border border-surface-container-high p-8 rounded-3xl shadow-xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-2 md:col-span-1">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">ENTRY_TITLE</label>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="How to build systems..."
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
            required
            @input="generateSlug"
          />
        </div>

        <div class="space-y-2 md:col-span-1">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">ENTRY_SLUG</label>
          <input 
            v-model="form.slug" 
            type="text" 
            placeholder="how-to-build-systems"
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        <div class="space-y-2 md:col-span-1">
          <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">ENTRY_STATUS</label>
          <select 
            v-model="form.status" 
            class="w-full bg-background border border-surface-container-high rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary transition-colors appearance-none"
            required
          >
            <option value="draft">DRAFT</option>
            <option value="published">PUBLISHED</option>
          </select>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">ENTRY_TAGS (MULTI_SELECT)</label>
        <MoleculesTagInput v-model="form.tags" />
      </div>

      <div class="space-y-2">
        <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">ENTRY_IMAGE</label>
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
              <span class="text-[10px] font-mono uppercase tracking-widest">UPLOAD_COVER_IMAGE</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">ENTRY_CONTENT (HTML_SUPPORTED)</label>
        <ClientOnly>
          <QuillEditor 
            v-model:content="form.content" 
            contentType="html" 
            theme="snow"
            toolbar="full"
            placeholder="<p>Full content goes here...</p>"
            style="min-height: 300px;"
          />
          <template #fallback>
            <div class="w-full h-[300px] bg-background border border-surface-container-high rounded-xl flex items-center justify-center text-on-surface-variant font-mono text-sm">
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
          <span v-else class="font-mono tracking-widest">PUBLISH_ENTRY</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { createBlog, uploadImage, ensureTagsExist } = useBlogActions()
const router = useRouter()

const form = ref({
  title: '',
  slug: '',
  content: '',
  image_url: '',
  status: 'draft',
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

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    previewUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

const generateSlug = () => {
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const handleSubmit = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    if (form.value.tags.length) {
      await ensureTagsExist(form.value.tags)
    }

    if (selectedFile.value) {
      form.value.image_url = await uploadImage(selectedFile.value)
    }
    await createBlog(form.value)
    router.push('/dashboard')
  } catch (e: any) {
    errorMsg.value = e.message || 'Failed to publish entry'
  } finally {
    loading.value = false
  }
}

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})
</script>
