<template>
  <footer class="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-surface-container-high">
    <div class="font-headline text-[10px] text-outline uppercase tracking-widest mb-4 md:mb-0">
      SYS.RUNTIME.2024 // ALL RIGHTS RESERVED
    </div>
    
    <div class="flex gap-8">
      <a 
        v-for="social in socials" 
        :key="social.label"
        :href="social.link"
        class="font-headline text-[10px] text-outline hover:text-secondary transition-colors uppercase tracking-widest"
      >
        {{ social.label }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = [
  { label: 'GIT_HUB', link: 'https://github.com/mgrware' },
  { label: 'LINKED_IN', link: 'https://www.linkedin.com/in/mgrdev' },
]
</script>
