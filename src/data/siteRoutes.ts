import { getLocalizedPath } from "./i18n";
import type { Locale } from "./locales";

export const localizedSectionNames = [
  "books",
  "routes",
  "sagas",
  "independents",
  "planets",
  "magic-systems",
  "credits",
] as const;

export type LocalizedSection = (typeof localizedSectionNames)[number];

export const getSectionPath = (
  locale: Locale,
  section: LocalizedSection,
): string => getLocalizedPath(locale, `/${section}`);

export const getEntryPath = (
  locale: Locale,
  section: string,
  slug: string,
): string => getLocalizedPath(locale, `/${section}/${slug}`);
