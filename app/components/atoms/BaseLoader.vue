<template>
  <div class="flex flex-col items-center justify-center py-20 relative select-none">
    <!-- Loading Animation Centerpiece -->
    <div class="relative w-48 h-48 flex items-center justify-center">
      <!-- Concentric SVG Orbits -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Supabase Signature Green Gradient -->
          <linearGradient :id="`supabase-grad-${id}`" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10B981" />
            <stop offset="50%" stop-color="#3ECF8E" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>

          <!-- Glow Filter for SVGs -->
          <filter :id="`svg-glow-${id}`" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Outer Ring: Query packets rotating clockwise -->
        <circle cx="50" cy="50" r="45" 
                stroke="currentColor" 
                class="text-emerald-500/20 animate-spin-cw" 
                stroke-width="0.75" 
                stroke-dasharray="10 15 2 4" />
        
        <circle cx="50" cy="50" r="45" 
                stroke="currentColor" 
                class="text-emerald-400/80 animate-spin-cw" 
                :style="{ filter: `url(#svg-glow-${id})` }" 
                stroke-width="1.5" 
                stroke-dasharray="2 40" />

        <!-- Middle Ring: Node connections rotating counter-clockwise -->
        <circle cx="50" cy="50" r="38" 
                stroke="currentColor" 
                class="text-emerald-600/30 animate-spin-ccw" 
                stroke-width="1" 
                stroke-dasharray="5 5 20 8" />

        <circle cx="50" cy="50" r="38" 
                stroke="currentColor" 
                class="text-emerald-400/90 animate-spin-ccw" 
                stroke-width="1.5" 
                stroke-dasharray="1 75" />

        <!-- Inner Ring: Data aligner rotating fast -->
        <circle cx="50" cy="50" r="31" 
                stroke="currentColor" 
                class="text-emerald-500/40 animate-spin-fast" 
                stroke-width="0.5" 
                stroke-dasharray="35 5 10 5" />
        
        <!-- Rotating coordinate indicator dots -->
        <g class="animate-spin-cw" style="transform-origin: 50% 50%; animation-duration: 12s;">
          <circle cx="50" cy="8" r="1.5" fill="#3ECF8E" :style="{ filter: `url(#svg-glow-${id})` }" />
          <circle cx="50" cy="92" r="1" fill="#10B981" />
        </g>
      </svg>

      <!-- Center Logo Container -->
      <div class="absolute w-24 h-24 flex items-center justify-center animate-logo-float">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
             class="w-14 h-14 text-[#3ECF8E] animate-supabase-glow transition-all duration-500"
             :stroke="`url(#supabase-grad-${id})`" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <!-- Left bracket < -->
          <path d="M7 6L2 12L7 18" />
          <!-- Slash / -->
          <path d="M10 19L14 5" />
          <!-- Right bracket > -->
          <path d="M17 6L22 12L17 18" />
        </svg>
      </div>
    </div>
    <!-- Pulse Loading text -->
    <span class="mt-4 font-mono text-[10px] text-emerald-400 uppercase tracking-widest animate-pulse">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'FETCHING_FROM_DATABASE...'
})

const id = useId()
</script>
