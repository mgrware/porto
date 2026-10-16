<template>
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <AdminHeading code="ADMIN" title="Dashboard" note="Everything published on the public sheets is managed here." />

    <div class="grid grid-cols-1 md:grid-cols-2 border-t border-l border-outline-variant/50">
      <NuxtLink
        v-for="module in modules"
        :key="module.to"
        :to="module.to"
        class="group border-r border-b border-outline-variant/50 px-6 pt-6 pb-7 bg-surface-container/35 hover:bg-outline-variant/[0.12] transition-colors min-w-0"
      >
        <div class="flex items-center justify-between gap-3 mb-5">
          <span class="text-mono text-[0.625rem] tracking-[0.12em] text-outline">{{ module.code }}</span>
          <BaseIcon class="text-xl text-primary" aria-hidden="true">{{ module.icon }}</BaseIcon>
        </div>
        <h2 class="font-headline text-xl font-semibold text-on-surface group-hover:text-primary transition-colors mb-2">{{ module.title }}</h2>
        <p class="text-[0.9375rem] leading-[1.6] text-on-surface-variant">{{ module.body }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import AdminHeading from '~/components/molecules/AdminHeading.vue'

const modules = [
  { to: '/dashboard/blogs', code: 'ADM · 01', icon: 'article', title: 'Blog entries', body: 'Write, tag, and publish posts for the revision log.' },
  { to: '/dashboard/projects', code: 'ADM · 02', icon: 'folder', title: 'Projects', body: 'Manage projects with their stack, links, cover image, and order.' }
]

definePageMeta({
  middleware: ['auth']
})

useSeoMeta({
  title: 'Dashboard | Gilang Ramadan',
  robots: 'noindex'
})
</script>
