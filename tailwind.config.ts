import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "surface-container-lowest": "rgb(var(--surface-container-lowest) / <alpha-value>)",
        "on-primary-container": "rgb(var(--on-primary-container) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--on-surface-variant) / <alpha-value>)",
        "tertiary-fixed": "rgb(var(--tertiary) / <alpha-value>)",
        "tertiary-dim": "rgb(var(--tertiary) / <alpha-value>)",
        "on-secondary-fixed": "rgb(var(--on-secondary-fixed) / <alpha-value>)",
        "primary-fixed": "rgb(var(--primary-container) / <alpha-value>)",
        "secondary-container": "rgb(var(--secondary-container) / <alpha-value>)",
        "error-dim": "rgb(var(--error) / <alpha-value>)",
        "on-error-container": "rgb(var(--on-error-container) / <alpha-value>)",
        "tertiary-container": "rgb(var(--tertiary-container) / <alpha-value>)",
        "surface-tint": "rgb(var(--primary) / <alpha-value>)",
        "error-container": "rgb(var(--error-container) / <alpha-value>)",
        "outline": "rgb(var(--outline) / <alpha-value>)",
        "on-tertiary-fixed": "rgb(var(--on-tertiary-container) / <alpha-value>)",
        "outline-variant": "rgb(var(--outline-variant) / <alpha-value>)",
        "on-tertiary": "rgb(var(--on-tertiary) / <alpha-value>)",
        "surface-container-low": "rgb(var(--surface-container-low) / <alpha-value>)",
        "surface-container-high": "rgb(var(--surface-container-high) / <alpha-value>)",
        "primary-container": "rgb(var(--primary-container) / <alpha-value>)",
        "inverse-surface": "rgb(var(--on-background) / <alpha-value>)",
        "on-secondary-fixed-variant": "rgb(var(--on-secondary-container) / <alpha-value>)",
        "secondary": "rgb(var(--secondary) / <alpha-value>)",
        "tertiary": "rgb(var(--tertiary) / <alpha-value>)",
        "error": "rgb(var(--error) / <alpha-value>)",
        "on-surface": "rgb(var(--on-surface) / <alpha-value>)",
        "primary": "rgb(var(--primary) / <alpha-value>)",
        "background": "rgb(var(--background) / <alpha-value>)",
        "secondary-fixed": "rgb(var(--secondary-container) / <alpha-value>)",
        "surface-container-highest": "rgb(var(--surface-container-highest) / <alpha-value>)",
        "on-secondary-container": "rgb(var(--on-secondary-container) / <alpha-value>)",
        "primary-fixed-dim": "rgb(var(--primary) / <alpha-value>)",
        "on-background": "rgb(var(--on-background) / <alpha-value>)",
        "surface": "rgb(var(--surface) / <alpha-value>)",
        "on-tertiary-container": "rgb(var(--on-tertiary-container) / <alpha-value>)",
        "on-primary-fixed-variant": "rgb(var(--on-primary-container) / <alpha-value>)",
        "surface-container": "rgb(var(--surface-container) / <alpha-value>)",
        "on-primary-fixed": "rgb(var(--on-primary-container) / <alpha-value>)",
        "on-tertiary-fixed-variant": "rgb(var(--on-tertiary-container) / <alpha-value>)",
        "primary-dim": "rgb(var(--primary) / <alpha-value>)",
        "surface-dim": "rgb(var(--surface-dim) / <alpha-value>)",
        "on-error": "rgb(var(--on-error) / <alpha-value>)",
        "tertiary-fixed-dim": "rgb(var(--tertiary) / <alpha-value>)",
        "secondary-dim": "rgb(var(--secondary) / <alpha-value>)",
        "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
        "inverse-on-surface": "rgb(var(--background) / <alpha-value>)",
        "on-primary": "rgb(var(--on-primary) / <alpha-value>)",
        "surface-variant": "rgb(var(--surface-container-high) / <alpha-value>)",
        "surface-bright": "rgb(var(--surface-bright) / <alpha-value>)",
        "secondary-fixed-dim": "rgb(var(--secondary) / <alpha-value>)",
        "inverse-primary": "rgb(var(--primary-container) / <alpha-value>)"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "0px"
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Space Grotesk", "sans-serif"]
      }
    }
  }
}
