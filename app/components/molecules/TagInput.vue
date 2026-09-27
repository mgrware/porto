<template>
  <div class="relative w-full tag-input-container">
    <!-- Selected Tags Display -->
    <div 
      class="min-h-11 w-full bg-background border border-outline-variant/60 px-2 py-1 flex flex-wrap gap-1.5 items-center focus-within:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary transition-colors cursor-text"
      @click="focusInput"
    >
      <span 
        v-for="tag in modelValue" 
        :key="tag"
        class="text-secondary text-mono text-[0.6875rem] tracking-[0.04em] pl-2 flex items-center border border-outline-variant/55"
      >
        {{ tag }}
        <button 
          type="button" 
          :aria-label="`Remove tag ${tag}`"
          @click.stop="removeTag(tag)"
          class="grid place-items-center w-11 h-11 hover:text-error transition-colors"
        >
          <BaseIcon class="text-[14px]" aria-hidden="true">close</BaseIcon>
        </button>
      </span>
      
      <input 
        ref="inputRef"
        v-model="query"
        type="text"
        :aria-label="label"
        role="combobox"
        :aria-expanded="isOpen"
        aria-autocomplete="list"
        :placeholder="modelValue.length === 0 ? 'Type a tag, press Enter' : ''"
        class="flex-1 min-h-9 bg-transparent border-none outline-none text-on-surface text-mono text-[0.8125rem] min-w-[150px] px-1.5 placeholder:text-outline"
        @keydown.enter.prevent="handleEnter"
        @keydown.down.prevent="moveHighlight(1)"
        @keydown.up.prevent="moveHighlight(-1)"
        @keydown.backspace="handleBackspace"
        @keydown.esc="isOpen = false"
        @input="onInput"
        @focus="onFocus"
      />
    </div>

    <!-- Suggestions Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen && (filteredSuggestions.length > 0 || (query.trim() && !isCurrentTagInValue))"
        class="absolute z-[100] w-full mt-1 bg-surface-container border border-outline-variant/60 overflow-hidden"
      >
        <ul v-if="filteredSuggestions.length > 0" role="listbox" class="divide-y divide-outline-variant/[0.28] max-h-60 overflow-y-auto">
          <li 
            v-for="(s, index) in filteredSuggestions" 
            :key="s"
            @click="selectSuggestion(s)"
            @mouseenter="activeIndex = index"
            role="option"
            :aria-selected="activeIndex === index"
            class="px-4 py-3 cursor-pointer flex justify-between items-center group transition-colors"
            :class="activeIndex === index ? 'bg-primary/20' : 'hover:bg-primary/10'"
          >
            <span class="text-mono text-xs tracking-[0.04em] text-on-surface group-hover:text-primary transition-colors" :class="{'text-primary': activeIndex === index}">{{ s }}</span>
            <span class="text-mono text-[0.625rem] tracking-[0.1em] text-outline">EXISTING</span>
          </li>
        </ul>
        
        <div 
          v-if="query.trim() && !isExactMatchInSuggestions && !isCurrentTagInValue"
          @click="addCurrentTag"
          @mouseenter="activeIndex = filteredSuggestions.length"
          class="px-4 py-3 cursor-pointer border-t border-outline-variant/[0.28] flex justify-between items-center group transition-colors"
          :class="activeIndex === filteredSuggestions.length ? 'bg-primary/20' : 'hover:bg-primary/10'"
        >
          <div class="flex items-center gap-2">
            <BaseIcon class="text-primary text-sm" aria-hidden="true">add</BaseIcon>
            <span class="text-mono text-xs tracking-[0.04em] text-primary">Create “{{ query.trim().toUpperCase() }}”</span>
          </div>
          <span class="text-mono text-[0.625rem] tracking-[0.1em] text-outline">NEW</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const props = withDefaults(defineProps<{
  modelValue: string[]
  label?: string
}>(), { label: 'Tags' })

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
