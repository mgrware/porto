<template>
  <div class="flex-grow flex items-center justify-center px-5 py-16">
    <div class="relative w-full max-w-md glass bg-surface-container/60 backdrop-blur-xl shadow-2xl shadow-primary/10 p-6 sm:p-8">
      <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl -z-10"></div>

      <header class="text-center mb-8">
        <div class="w-14 h-14 mx-auto mb-5 rounded-2xl grid place-items-center text-on-primary bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/30">
          <BaseIcon class="text-2xl" aria-hidden="true">lock</BaseIcon>
        </div>
        <h1 class="font-headline text-3xl font-bold text-on-surface">Sign <span class="text-gradient">in</span></h1>
        <p class="text-sm text-on-surface-variant mt-2">For editing the blog and projects. Visitors don't need an account.</p>
      </header>

      <form class="flex flex-col gap-5" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-2">
          <label for="login-email" class="admin-label">EMAIL</label>
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
          <label for="login-password" class="admin-label">PASSWORD</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="admin-input"
          />
        </div>

        <p v-if="errorMsg" role="alert" class="rounded-xl border border-error/50 bg-error/10 px-4 py-3 text-sm text-error">
          {{ errorMsg }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="btn-primary w-full min-h-11 disabled:opacity-60 disabled:hover:translate-y-0"
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
