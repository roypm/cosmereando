import ca from './translations/ca.json';
import en from './translations/en.json';
import es from './translations/es.json';
import type { TranslationDictionary } from './types';

export const localeConfig = {
  en: {
    label: 'EN',
    name: 'English',
    prefix: '',
    languageTag: 'en',
    openGraphLocale: 'en_US',
    translation: en,
  },
  es: {
    label: 'ES',
    name: 'Español',
    prefix: '/es',
    languageTag: 'es',
    openGraphLocale: 'es_ES',
    translation: es,
  },
  ca: {
    label: 'CA',
    name: 'Català',
    prefix: '/ca',
    languageTag: 'ca',
    openGraphLocale: 'ca_ES',
    translation: ca,
  },
} as const;

export type Locale = keyof typeof localeConfig;
export const locales = Object.keys(localeConfig) as Locale[];
export const defaultLocale: Locale = 'en';
export const translations: Record<Locale, TranslationDictionary> = Object.fromEntries(
  Object.entries(localeConfig).map(([locale, config]) => [locale, config.translation]),
) as unknown as Record<Locale, TranslationDictionary>;
