<template>
  <section id="architecture" class="px-8 lg:px-16 py-20 bg-surface">
    <div class="flex flex-col lg:flex-row gap-12 items-center">
      <div class="flex-1 space-y-6">
        <h2 class="font-headline text-4xl font-black uppercase leading-tight italic">
          Mastering <br/> Metaprogramming
        </h2>
        <p class="font-body text-on-surface-variant text-lg leading-relaxed">
          I specialize in the power of writing code that writes code—leveraging dynamic system generation and advanced abstractions to eliminate boilerplate and build highly adaptable, self-evolving software architectures.
        </p>
        
        <div class="flex flex-col gap-4">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            :class="['flex items-start gap-4 p-4 bg-surface-container border-l-4', feature.borderColor]"
          >
            <BaseIcon :class="feature.iconColor">{{ feature.icon }}</BaseIcon>
            <div>
              <h4 class="font-headline font-bold uppercase text-xs mb-1">{{ feature.title }}</h4>
              <p class="text-xs text-on-surface-variant">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 relative w-full aspect-video bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center group overflow-hidden">
        <img 
          alt="Abstract Neural Data Network" 
          class="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-transform duration-700 group-hover:scale-110" 
          src="~/assets/images/avatar.jpg"
        />

        <div class="relative z-10 text-center p-8 bg-surface-container-highest/80 backdrop-blur-md border border-primary/20">
          <BaseIcon class="text-6xl text-primary mb-4">settings_input_component</BaseIcon>
          <h3 class="font-headline text-xl font-bold uppercase tracking-widest text-primary">Microservices_Mesh</h3>
          <p class="text-mono text-[10px] mt-2 opacity-60 uppercase">DISTRIBUTED_COMPUTING_PROTOCOL_INITIATED</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'

const features = [
  {
    title: 'Observation',
    icon: 'analytics',
    iconColor: 'text-primary',
    borderColor: 'border-primary',
    description: 'Real-time telemetry and predictive scaling logic integrated by default into the system fabric.'
  },
  {
    title: 'Security',
    icon: 'security',
    iconColor: 'text-secondary',
    borderColor: 'border-secondary',
    description: 'Zero-trust architecture with automated certificate management and mTLS enforced at the protocol level.'
  }
]
</script>
