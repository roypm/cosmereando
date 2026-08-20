import navigationData from './navigation.json';
import planetsData from './planets.json';
import routesData from './routes.json';
import sagasData from './sagas.json';
import worksData from './works.json';
import { defaultLocale, locales, translations } from './locales';
import { getLocalizedPath, getTranslation } from './i18n';
import type { Locale } from './locales';
import type { NavigationEntryData, NavigationGroupData } from './types';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface NavigationGroup {
  id: string;
  label: string;
  href: string;
  items: NavigationItem[];
}

interface CatalogueEntryData extends NavigationEntryData {
  slug?: string;
}

const navigationGroups = navigationData as NavigationGroupData[];
const catalogueSources: Record<NavigationGroupData['source'], CatalogueEntryData[]> = {
  routes: routesData,
  works: worksData,
  sagas: sagasData,
  planets: planetsData,
};

const getItems = (locale: Locale, group: NavigationGroupData): NavigationItem[] =>
  catalogueSources[group.source].map((item) => {
    const anchor = item.slug ?? item.id;

    return {
      id: item.id,
      label: getTranslation(locale, item.labelKey),
      href: `${getLocalizedPath(locale, group.href)}#${anchor}`,
    };
  });

export const getNavigationGroups = (locale: Locale): NavigationGroup[] =>
  navigationGroups.map((group) => ({
    id: group.id,
    label: getTranslation(locale, group.labelKey),
    href: getLocalizedPath(locale, group.href),
    items: getItems(locale, group),
  }));

export const getSections = (source: NavigationGroupData['source'], locale: Locale) =>
  catalogueSources[source].map((item) => ({
    id: item.slug ?? item.id,
    label: getTranslation(locale, item.labelKey),
  }));

const ensureUniqueIds = (items: NavigationEntryData[], source: string) => {
  const ids = new Set<string>();
  items.forEach((item) => {
    if (ids.has(item.id)) throw new Error(`Duplicate ${source} id: ${item.id}`);
    ids.add(item.id);
  });
};

const getTranslationKeys = (value: unknown, prefix = ''): string[] => {
  if (typeof value === 'string') return [prefix];
  if (typeof value !== 'object' || value === null) return [];

  return Object.entries(value).flatMap(([key, child]) =>
    getTranslationKeys(child, prefix ? `${prefix}.${key}` : key),
  );
};

export const validateProjectData = () => {
  ensureUniqueIds(routesData, 'route');
  ensureUniqueIds(worksData, 'work');
  ensureUniqueIds(sagasData, 'saga');
  ensureUniqueIds(planetsData, 'planet');

  const sourceKeys = getTranslationKeys(translations[defaultLocale]);
  locales.forEach((locale) => {
    const localeKeys = getTranslationKeys(translations[locale]);
    const missing = sourceKeys.filter((key) => !localeKeys.includes(key));
    const extra = localeKeys.filter((key) => !sourceKeys.includes(key));
    if (missing.length || extra.length) {
      throw new Error(`Translation mismatch in ${locale}: missing [${missing.join(', ')}], extra [${extra.join(', ')}]`);
    }
  });
};

validateProjectData();
