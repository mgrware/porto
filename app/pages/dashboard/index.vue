<template>
  <div class="max-w-6xl mx-auto px-4 py-12 lg:py-16">
    <AdminHeading code="ADMIN" title="Dashboard" note="Everything published on the public site is managed here." />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="module in modules"
        :key="module.to"
        :to="module.to"
        class="group relative overflow-hidden glass glass-hover p-8 min-w-0"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div class="relative">
          <div class="w-14 h-14 mb-6 rounded-2xl grid place-items-center bg-gradient-to-br from-primary/20 to-secondary/20 border border-outline-variant/30 text-primary group-hover:scale-110 transition-transform duration-500">
            <BaseIcon class="text-3xl" aria-hidden="true">{{ module.icon }}</BaseIcon>
          </div>
          <h2 class="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors mb-2">{{ module.title }}</h2>
          <p class="text-on-surface-variant leading-relaxed mb-6">{{ module.body }}</p>
          <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Open
            <BaseIcon class="text-base group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</BaseIcon>
          </span>
        </div>
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
