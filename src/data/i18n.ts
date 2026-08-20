import { defaultLocale, localeConfig, locales, translations } from './locales';
import type { Locale } from './locales';
import type { TranslationDictionary } from './types';

export { defaultLocale, localeConfig, locales } from './locales';
export type { Locale } from './locales';

export const getTranslation = (locale: Locale, key: string, replacements: Record<string, string> = {}): string => {
  const value = key.split('.').reduce<string | TranslationDictionary | undefined>(
    (current, part) => (typeof current === 'object' && current !== null ? current[part] : undefined),
    translations[locale],
  );

  if (typeof value !== 'string') {
    throw new Error(`Missing translation: ${locale}.${key}`);
  }

  return Object.entries(replacements).reduce(
    (translated, [placeholder, replacement]) => translated.replaceAll(`{${placeholder}}`, replacement),
    value,
  );
};

export const getLocalePrefix = (locale: Locale): string => localeConfig[locale].prefix;

export const getLocaleLabel = (locale: Locale): string => localeConfig[locale].label;

export const getLocaleName = (locale: Locale): string => localeConfig[locale].name;

export const getLocalizedPath = (locale: Locale, path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${getLocalePrefix(locale)}${path.startsWith('/') ? path : `/${path}`}`;

export const getCanonicalPath = (pathname: string): string => {
  const localizedPrefix = locales.filter((locale) => locale !== defaultLocale).find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!localizedPrefix) return pathname || '/';
  const canonicalPath = pathname.slice(localizedPrefix.length + 1);
  return canonicalPath || '/';
};
