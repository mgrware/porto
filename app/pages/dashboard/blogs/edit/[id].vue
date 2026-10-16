<template>
  <div class="max-w-4xl mx-auto px-4 py-12 lg:py-16">
    <NuxtLink to="/dashboard/blogs" class="group inline-flex items-center min-h-11 gap-2 mb-4 text-sm font-medium text-secondary hover:text-primary transition-colors">
      <BaseIcon class="text-base group-hover:-translate-x-1 transition-transform" aria-hidden="true">arrow_back</BaseIcon>
      Back to blog entries
    </NuxtLink>
    <AdminHeading code="ADM · 01" title="Edit entry" />

    <BaseLoader v-if="pending" />

    <div v-else-if="loadError" role="alert" class="rounded-xl border border-error/50 bg-error/10 px-4 py-3.5 text-sm text-error">
      Could not load this entry: {{ loadError.message }}
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-7 glass p-5 sm:p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <label class="block space-y-2 md:col-span-1">
          <span class="admin-label">TITLE</span>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="How to build systems..."
            class="admin-input"
            required
          />
        </label>

        <label class="block space-y-2 md:col-span-1">
          <span class="admin-label">SLUG</span>
          <input 
            v-model="form.slug" 
            type="text" 
            placeholder="how-to-build-systems"
            class="admin-input"
            required
          />
        </label>

        <label class="block space-y-2 md:col-span-1">
          <span class="admin-label">STATUS</span>
          <select 
            v-model="form.status" 
            class="admin-input"
            required
          >
            <option value="draft">DRAFT</option>
            <option value="published">PUBLISHED</option>
          </select>
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
            <span v-if="previewUrl || form.image_url" class="block w-full h-full relative">
              <img :src="previewUrl || form.image_url" alt="Cover preview" class="w-full h-full object-cover" />
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
        <p class="admin-label">CONTENT</p>
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
            <div class="w-full h-[300px] rounded-xl bg-background/50 border border-outline-variant/40 flex items-center justify-center text-mono text-[0.8125rem] text-outline">
              Loading editor…
            </div>
          </template>
        </ClientOnly>
      </div>

      <div v-if="errorMsg" role="alert" class="rounded-xl border border-error/50 bg-error/10 px-4 py-3 text-sm text-error">
        {{ errorMsg }}
      </div>

      <div class="flex flex-wrap justify-end gap-3">
        <NuxtLink to="/dashboard/blogs" class="inline-flex items-center min-h-11 px-5 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-on-surface/5 transition-colors">
          Cancel
        </NuxtLink>
        <NuxtLink v-if="form.slug" :to="`/blog/${form.slug}`" target="_blank" class="btn-ghost min-h-11">
          <BaseIcon class="text-base" aria-hidden="true">visibility</BaseIcon>
          Preview
        </NuxtLink>
        <button 
          type="submit" 
          :disabled="loading"
          class="btn-primary min-h-11 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <BaseIcon v-if="loading" class="text-base animate-spin" aria-hidden="true">progress_activity</BaseIcon>
          <span v-if="loading">Saving…</span>
          <span v-else>Save changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import AdminHeading from '~/components/molecules/AdminHeading.vue'
const route = useRoute()
const router = useRouter()
const { fetchBlogById, updateBlog, uploadImage, ensureTagsExist } = useBlogActions()

const id = route.params.id as string
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

const { pending, error: loadError } = await useAsyncData(`edit-blog-${id}`, async () => {
  const data = await fetchBlogById(id)
  form.value = {
    title: data.title,
    slug: data.slug,
    content: data.content,
    image_url: data.image_url || '',
    status: data.status || 'draft',
    tags: data.tags || []
  }
  return data
})

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
    await updateBlog(id, form.value)
    router.push('/dashboard')
  } catch (e: any) {
    errorMsg.value = e.message || 'Failed to update entry'
  } finally {
    loading.value = false
  }
}

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})
</script>
