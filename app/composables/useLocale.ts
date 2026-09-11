import en from '~/locales/en'
import id from '~/locales/id'

// ponytail: cookie + two dict files instead of @nuxtjs/i18n — no route prefixes,
// no lazy loading. Add the module if hreflang/SEO-per-locale ever matters.
const dicts = { en, id }
export type Locale = keyof typeof dicts

export const useLocale = () => {
  const locale = useCookie<Locale>('locale', { default: () => 'en', maxAge: 60 * 60 * 24 * 365 })
  const m = computed(() => dicts[locale.value] ?? en)
  const toggle = () => { locale.value = locale.value === 'en' ? 'id' : 'en' }
  return { locale, m, toggle }
}
