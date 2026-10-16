<template>
  <header class="sticky top-3 z-50 px-4 sm:px-6" @keydown.esc="isMobileMenuOpen = false">
    <nav class="max-w-6xl mx-auto glass bg-surface-container/70 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div class="h-16 px-4 sm:px-5 flex items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
          <img src="~/assets/images/avatar.jpg" alt="" class="w-9 h-9 rounded-full object-cover ring-2 ring-primary/60" />
          <span class="font-headline text-base font-semibold text-on-surface">
            Gilang <span class="text-gradient">Ramadan</span>
          </span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-7">
          <NuxtLink
            v-for="link in links"
            :key="link.href"
            :to="link.href"
            :class="[
              'relative text-sm font-medium py-1 transition-colors group',
              isActive(link.href) ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
            ]"
          >
            {{ link.label }}
            <span
              :class="[
                'absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300',
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <NuxtLink v-if="user" to="/dashboard" class="hidden sm:grid icon-btn" :title="m.nav.dashboard" :aria-label="m.nav.dashboard">
            <BaseIcon class="text-lg">dashboard</BaseIcon>
          </NuxtLink>
          <button v-if="user" class="hidden sm:grid icon-btn hover:!text-error" :title="m.nav.logout" :aria-label="m.nav.logout" @click="logout">
            <BaseIcon class="text-lg">logout</BaseIcon>
          </button>

          <a
            :href="cvHref"
            :download="cvName"
            class="hidden sm:inline-flex btn-primary !px-4 !py-2.5 !text-xs"
          >
            <BaseIcon class="text-base">download</BaseIcon>
            {{ m.nav.downloadCv }}
          </a>

          <button class="icon-btn text-xs font-semibold" :title="m.nav.switchLang" :aria-label="m.nav.switchLang" @click="toggle">
            {{ locale === 'en' ? 'ID' : 'EN' }}
          </button>

          <ClientOnly>
            <button
              class="icon-btn"
              :title="colorMode.value === 'dark' ? m.nav.toLight : m.nav.toDark"
              :aria-label="colorMode.value === 'dark' ? m.nav.toLight : m.nav.toDark"
              @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
            >
              <BaseIcon class="text-lg">{{ colorMode.value === 'dark' ? 'light_mode' : 'dark_mode' }}</BaseIcon>
            </button>
            <template #fallback>
              <span class="w-11 h-11"></span>
            </template>
          </ClientOnly>

          <button
            class="md:hidden icon-btn"
            :aria-expanded="isMobileMenuOpen"
            :aria-label="m.nav.toggleNav"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <BaseIcon class="text-lg">{{ isMobileMenuOpen ? 'close' : 'menu' }}</BaseIcon>
          </button>
        </div>
      </div>

      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-outline-variant/30 p-3 flex flex-col gap-1">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          :class="[
            'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
            isActive(link.href) ? 'bg-primary/15 text-primary' : 'text-on-surface hover:bg-on-surface/5'
          ]"
          @click="isMobileMenuOpen = false"
        >{{ link.label }}</NuxtLink>

        <a :href="cvHref" :download="cvName" class="sm:hidden btn-primary mt-2" @click="isMobileMenuOpen = false">
          <BaseIcon class="text-base">download</BaseIcon>
          {{ m.nav.downloadCv }}
        </a>
        <NuxtLink v-if="user" to="/dashboard" class="sm:hidden px-4 py-3 rounded-xl text-sm text-on-surface-variant" @click="isMobileMenuOpen = false">
          {{ m.nav.dashboard }}
        </NuxtLink>
        <button
          v-if="user"
          class="sm:hidden px-4 py-3 rounded-xl text-sm text-error text-left"
          @click="() => { logout(); isMobileMenuOpen = false }"
        >{{ m.nav.logout }}</button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'

const { user, logout } = useAuthActions()
const colorMode = useColorMode()
const route = useRoute()
const { m, locale, toggle } = useLocale()
const isMobileMenuOpen = ref(false)

const cvHref = '/uploads/CV Gilang_Ramadan_-_Senior_Backend_Developer.pdf'
const cvName = 'gilang_ramadan_-_senior_backend_developer.pdf'

const links = computed(() => [{ label: m.value.nav.sheets[0]!.label, href: '/' }, ...m.value.nav.pages])
const isActive = (href: string) => (href === '/' ? route.path === '/' : route.path.startsWith(href))
</script>
