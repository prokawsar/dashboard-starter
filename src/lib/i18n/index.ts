// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { init, register, getLocaleFromNavigator } from 'svelte-i18n'

const defaultLocale = 'en'

register('en', () => import('./languages/en.json'))
register('de', () => import('./languages/de.json'))

init({
	fallbackLocale: defaultLocale,
	initialLocale: getLocaleFromNavigator()
})
