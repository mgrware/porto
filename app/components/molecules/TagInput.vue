<template>
  <div class="relative w-full tag-input-container">
    <!-- Selected Tags Display -->
    <div 
      class="min-h-[54px] w-full bg-background border border-surface-container-high rounded-xl px-4 py-2 flex flex-wrap gap-2 items-center focus-within:border-primary transition-colors cursor-text shadow-inner"
      @click="focusInput"
    >
      <span 
        v-for="tag in modelValue" 
        :key="tag"
        class="bg-primary/10 text-primary text-[10px] font-mono font-bold px-2 py-1.5 rounded-lg flex items-center gap-2 uppercase tracking-widest border border-primary/20 animate-in zoom-in-95 duration-200"
      >
        {{ tag }}
        <button 
          type="button" 
          @click.stop="removeTag(tag)"
          class="hover:text-error transition-colors leading-none flex items-center"
        >
          <span class="material-symbols-outlined text-[14px]">close</span>
        </button>
      </span>
      
      <input 
        ref="inputRef"
        v-model="query"
        type="text"
        :placeholder="modelValue.length === 0 ? 'TYPE_TAG_AND_ENTER...' : ''"
        class="flex-1 bg-transparent border-none focus:outline-none text-on-background text-sm min-w-[150px] font-mono placeholder:text-on-surface-variant/30"
        @keydown.enter.prevent="handleEnter"
        @keydown.down.prevent="moveHighlight(1)"
        @keydown.up.prevent="moveHighlight(-1)"
        @keydown.backspace="handleBackspace"
        @input="onInput"
        @focus="onFocus"
      />
    </div>

    <!-- Suggestions Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="isOpen && (filteredSuggestions.length > 0 || (query.trim() && !isCurrentTagInValue))"
        class="absolute z-[100] w-full mt-2 bg-surface-container border border-surface-container-high rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        <ul v-if="filteredSuggestions.length > 0" class="divide-y divide-surface-container-high max-h-60 overflow-y-auto">
          <li 
            v-for="(s, index) in filteredSuggestions" 
            :key="s"
            @click="selectSuggestion(s)"
            @mouseenter="activeIndex = index"
            class="px-5 py-4 cursor-pointer flex justify-between items-center group transition-colors"
            :class="activeIndex === index ? 'bg-primary/20' : 'hover:bg-primary/10'"
          >
            <span class="text-xs font-mono uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors" :class="{'text-primary': activeIndex === index}">{{ s }}</span>
            <span class="text-[9px] font-mono text-on-surface-variant opacity-40 uppercase tracking-widest">EXISTING_TAG</span>
          </li>
        </ul>
        
        <div 
          v-if="query.trim() && !isExactMatchInSuggestions && !isCurrentTagInValue"
          @click="addCurrentTag"
          @mouseenter="activeIndex = filteredSuggestions.length"
          class="px-5 py-4 cursor-pointer border-t border-surface-container-high flex justify-between items-center group transition-colors"
          :class="activeIndex === filteredSuggestions.length ? 'bg-primary/20' : 'hover:bg-primary/10'"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">add_circle</span>
            <span class="text-xs font-mono uppercase tracking-widest text-primary">CREATE "{{ query.trim().toUpperCase() }}"</span>
          </div>
          <span class="text-[9px] font-mono text-on-surface-variant opacity-40 uppercase tracking-widest">NEW_TAG</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits(['update:modelValue'])

const { searchTags } = useBlogActions()
const query = ref('')
const isOpen = ref(false)
const suggestions = ref<string[]>([])
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const focusInput = () => {
  inputRef.value?.focus()
}

const filteredSuggestions = computed(() => {
  return suggestions.value.filter(s => !props.modelValue.includes(s.toUpperCase()))
})

const isExactMatchInSuggestions = computed(() => {
  const q = query.value.trim().toUpperCase()
  return suggestions.value.some(s => s.toUpperCase() === q)
})

const isCurrentTagInValue = computed(() => {
  const q = query.value.trim().toUpperCase()
  return props.modelValue.includes(q)
})

const onInput = async () => {
  activeIndex.value = 0
  if (query.value.length < 1) {
    await fetchInitialTags()
    return
  }
  try {
    suggestions.value = await searchTags(query.value)
    isOpen.value = true
  } catch (e) {
    console.error('Search tags error:', e)
  }
}

const fetchInitialTags = async () => {
  try {
    suggestions.value = await searchTags('')
  } catch (e) {
    console.error(e)
  }
}

const onFocus = async () => {
  isOpen.value = true
  if (query.value === '') {
    await fetchInitialTags()
  }
}

const moveHighlight = (delta: number) => {
  const max = filteredSuggestions.value.length + (query.value.trim() && !isExactMatchInSuggestions.value && !isCurrentTagInValue.value ? 1 : 0)
  if (max === 0) return
  activeIndex.value = (activeIndex.value + delta + max) % max
}

const handleEnter = () => {
  if (isOpen.value) {
    const suggestion = filteredSuggestions.value[activeIndex.value]
    if (activeIndex.value < filteredSuggestions.value.length && suggestion) {
      selectSuggestion(suggestion)
    } else {
      addCurrentTag()
    }
  } else {
    addCurrentTag()
  }
}

const addCurrentTag = () => {
  const tag = query.value.trim().toUpperCase()
  if (tag && !props.modelValue.includes(tag)) {
    emit('update:modelValue', [...props.modelValue, tag])
  }
  query.value = ''
  suggestions.value = []
  isOpen.value = false
}

const selectSuggestion = (tag: string) => {
  const upperTag = tag.toUpperCase()
  if (!props.modelValue.includes(upperTag)) {
    emit('update:modelValue', [...props.modelValue, upperTag])
  }
  query.value = ''
  suggestions.value = []
  isOpen.value = false
}

const removeTag = (tag: string) => {
  emit('update:modelValue', props.modelValue.filter(t => t !== tag))
}

const handleBackspace = () => {
  if (query.value === '' && props.modelValue.length > 0) {
    const newTags = [...props.modelValue]
    newTags.pop()
    emit('update:modelValue', newTags)
  }
}

// Close dropdown on click outside
if (import.meta.client) {
  const handleClickOutside = (e: MouseEvent) => {
    const container = document.querySelector('.tag-input-container')
    if (container && !container.contains(e.target as Node)) {
      isOpen.value = false
    }
  }
  
  onMounted(() => {
    window.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside)
  })
}
</script>
