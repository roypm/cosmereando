import navigationData from './navigation.json';
import planetsData from './planets.json';
import routesData from './routes.json';
import sagasData from './sagas.json';
import worksData from './works.json';
import magicSystemsData from './magic-systems.json';
import { defaultLocale, locales, translations } from './locales';
import { getLocalizedPath, getTranslation } from './i18n';
import { getBookImage } from './book-images';
import type { Locale } from './locales';
import type { MagicSystemData, NavigationEntryData, NavigationGroupData, WorkData } from './types';

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

export interface BookCollection {
  id: string;
  label: string;
  sagaHref?: string;
  works: {
    id: string;
    title: string;
    type: string;
    typeKey: WorkData['typeKey'];
    publicationYear: number;
    image: ReturnType<typeof getBookImage>;
    arcanumStatus?: WorkData['arcanumStatus'];
  }[];
  subsections?: { id: string; label: string; works: BookCollection['works'] }[];
}

const navigationGroups = navigationData as NavigationGroupData[];
const catalogueSources: Record<NavigationGroupData['source'], CatalogueEntryData[]> = {
  routes: routesData,
  works: worksData,
  sagas: sagasData,
  planets: planetsData,
  magicSystems: magicSystemsData,
};

const getItems = (locale: Locale, group: NavigationGroupData): NavigationItem[] =>
  catalogueSources[group.source].map((item) => {
    const anchor = item.slug ?? item.id;
    const href = group.source === 'routes' || group.source === 'sagas' || group.source === 'planets'
      ? getLocalizedPath(locale, `${group.href}/${item.id}`)
      : `${getLocalizedPath(locale, group.href)}#${anchor}`;

    return {
      id: item.id,
      label: getTranslation(locale, item.labelKey),
      href,
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

export const getMagicSystems = (locale: Locale) => (magicSystemsData as MagicSystemData[]).map((system) => ({
  ...system,
  label: getTranslation(locale, system.labelKey),
  world: getTranslation(locale, `planets.${system.worldId}`),
}));

export const getBookCollections = (locale: Locale): BookCollection[] => {
  const works = worksData as WorkData[];
  const mapWork = (work: WorkData) => ({
    id: work.id,
    title: getTranslation(locale, work.labelKey),
    type: getTranslation(locale, `books.types.${work.typeKey}`),
    typeKey: work.typeKey,
    publicationYear: work.publicationYear,
    image: getBookImage(work),
    arcanumStatus: work.arcanumStatus,
  });
  const sortWorks = (items: WorkData[]) => [...items].sort((first, second) =>
    (first.publicationOrder ?? Number.MAX_SAFE_INTEGER) - (second.publicationOrder ?? Number.MAX_SAFE_INTEGER));
  const sagaGroups: BookCollection[] = sagasData.map((saga) => ({
    id: saga.id,
    label: getTranslation(locale, saga.labelKey),
    sagaHref: getLocalizedPath(locale, `/sagas/${saga.slug}`),
    works: sortWorks(works.filter((work) => work.sagaId === saga.id && !work.collectionIds?.includes('arcanum-unbounded'))).map(mapWork),
  })).filter((saga) => saga.works.length > 0);

  const mistborn = sagaGroups.find((saga) => saga.id === 'mistborn');
  if (mistborn) {
    const eraWorks = (era: WorkData['era']) => sortWorks(works.filter((work) => work.sagaId === 'mistborn' && work.era === era && !work.collectionIds?.includes('arcanum-unbounded'))).map(mapWork);
    mistborn.subsections = [
      { id: 'mistborn-era-1', label: getTranslation(locale, 'books.subsections.era1'), works: eraWorks('era-1') },
      { id: 'mistborn-era-2', label: getTranslation(locale, 'books.subsections.era2'), works: eraWorks('era-2') },
    ];
    mistborn.works = [];
  }

  const standaloneWorks = sortWorks(works.filter((work) =>
    !work.sagaId && work.id !== 'arcanum-unbounded' && !work.collectionIds?.includes('arcanum-unbounded'),
  )).map(mapWork);

  if (standaloneWorks.length > 0) {
    sagaGroups.push({
      id: 'standalone',
      label: getTranslation(locale, 'books.standalone'),
      sagaHref: undefined,
      works: standaloneWorks,
    });
  }

  const arcanumWorks = works
    .filter((work) => work.id === 'arcanum-unbounded' || work.collectionIds?.includes('arcanum-unbounded'))
    .sort((first, second) => {
      if (first.id === 'arcanum-unbounded') return -1;
      if (second.id === 'arcanum-unbounded') return 1;

      return (first.publicationYear - second.publicationYear)
        || ((first.publicationOrder ?? Number.MAX_SAFE_INTEGER) - (second.publicationOrder ?? Number.MAX_SAFE_INTEGER));
    })
    .map(mapWork);
  if (arcanumWorks.length > 0) {
    sagaGroups.push({
      id: 'arcanum-unbounded',
      label: getTranslation(locale, 'books.arcanumUnbounded'),
      works: arcanumWorks,
    });
  }

  return sagaGroups;
};

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
  ensureUniqueIds(magicSystemsData, 'magic system');

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
