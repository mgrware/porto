<template>
  <div class="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px]"></div>
    </div>

    <div class="w-full max-w-md animate-in fade-in zoom-in duration-700">
      <div class="bg-surface-container/60 backdrop-blur-xl border border-surface-container-high p-8 rounded-[2rem] shadow-2xl relative">
        <div class="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <header class="text-center mb-10">
          <div class="inline-block p-3 rounded-2xl bg-primary/10 mb-4">
            <span class="material-symbols-outlined text-primary text-3xl">lock</span>
          </div>
          <h1 class="text-3xl font-bold font-headline tracking-tighter mb-1">AUTH<span class="text-primary">.SYS</span></h1>
          <p class="text-on-surface-variant text-[10px] font-mono uppercase tracking-[0.2em]">ACCESS_RESTRICTED_ZONE</p>
        </header>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="group space-y-2">
            <label class="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant ml-1 group-focus-within:text-primary transition-colors">IDENTITY_EMAIL</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">alternate_email</span>
              <input 
                v-model="email" 
                type="email" 
                placeholder="admin@mgrware.com"
                class="w-full bg-background/50 border border-surface-container-high rounded-2xl pl-12 pr-4 py-3 text-on-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div class="group space-y-2">
            <label class="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant ml-1 group-focus-within:text-primary transition-colors">ACCESS_CODE</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">key</span>
              <input 
                v-model="password" 
                type="password" 
                placeholder="••••••••"
                class="w-full bg-background/50 border border-surface-container-high rounded-2xl pl-12 pr-4 py-3 text-on-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div v-if="errorMsg" class="text-error text-[10px] font-mono bg-error/10 p-3 rounded-xl border border-error/20 animate-in shake duration-300">
            {{ errorMsg }}
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-primary text-on-primary font-bold py-4 rounded-2xl hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 group/btn"
          >
            <span v-if="loading" class="animate-spin material-symbols-outlined text-sm">sync</span>
            <template v-else>
              <span class="font-mono tracking-widest text-sm">INITIATE_SESSION</span>
              <span class="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">login</span>
            </template>
          </button>
        </form>
      </div>
      
      <div class="flex justify-center items-center gap-4 mt-8 opacity-40">
        <div class="h-px w-8 bg-on-surface-variant"></div>
        <p class="text-[10px] font-mono tracking-[0.3em] uppercase">MGRWARE_OS_V2.4</p>
        <div class="h-px w-8 bg-on-surface-variant"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    errorMsg.value = e.message || 'Authentication failed'
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'auth'
})
</script>
