<template>
  <div class="flex-grow flex items-center justify-center px-5 py-16">
    <div class="relative w-full max-w-md border border-outline-variant/60 bg-background/80 p-6 sm:p-8">
      <span class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-primary"></span>
      <span class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary"></span>

      <header class="mb-8">
        <div class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary mb-2.5">ADMIN</div>
        <h1 class="font-headline text-[2rem] font-semibold -tracking-[0.02em] text-on-surface">Sign in</h1>
        <p class="text-[0.9375rem] text-on-surface-variant mt-1.5">For editing the blog and projects. Visitors don't need an account.</p>
      </header>

      <form class="flex flex-col gap-5" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-2">
          <label for="login-email" class="text-mono text-[0.6875rem] tracking-[0.1em] text-on-surface-variant">EMAIL</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            autocomplete="username"
            required
            class="admin-input"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="login-password" class="text-mono text-[0.6875rem] tracking-[0.1em] text-on-surface-variant">PASSWORD</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="admin-input"
          />
        </div>

        <p v-if="errorMsg" role="alert" class="border border-error/60 bg-error/10 px-4 py-3 text-mono text-[0.8125rem] text-error">
          {{ errorMsg }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="inline-flex items-center justify-center gap-2 min-h-11 px-5 bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] font-medium transition-colors disabled:opacity-60"
        >
          <BaseIcon v-if="loading" class="text-base animate-spin" aria-hidden="true">progress_activity</BaseIcon>
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const { login } = useAuthActions()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    await login(email.value, password.value)
  } catch (e: any) {
    errorMsg.value = e.message || 'Sign-in failed. Check the email and password.'
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign in | Gilang Ramadan',
  robots: 'noindex'
})
</script>
