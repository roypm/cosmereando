import navigationData from "./navigation.json";
import planetsData from "./planets.json";
import routesData from "./routes.json";
import sagasData from "./sagas.json";
import worksData from "./works.json";
import magicSystemsData from "./magic-systems.json";
import magicSystemProfiles from "./magic-system-profiles.json";
import imageCredits from "./image-credits.json";
import planetProfilesData from "./planet-profiles.json";
import { defaultLocale, locales, translations } from "./locales";
import { getLocalizedPath, getTranslation } from "./i18n";
import { getBookImage } from "./book-images";
import {
  getEntryPath,
  getSectionPath,
  type LocalizedSection,
} from "./siteRoutes";
import type { Locale } from "./locales";
import type {
  MagicSystemData,
  NavigationEntryData,
  NavigationGroupData,
  PlanetProfile,
  RouteData,
  WorkData,
} from "./types";

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
    typeKey: WorkData["typeKey"];
    publicationYear: number;
    image: ReturnType<typeof getBookImage>;
    arcanumStatus?: WorkData["arcanumStatus"];
  }[];
  subsections?: { id: string; label: string; works: BookCollection["works"] }[];
}

const navigationGroups = navigationData as NavigationGroupData[];
const catalogueSources: Record<
  NavigationGroupData["source"],
  CatalogueEntryData[]
> = {
  routes: routesData,
  works: worksData,
  sagas: sagasData,
  planets: planetsData,
  magicSystems: magicSystemsData,
  independents: worksData.filter(
    (work) =>
      !work.sagaId && !work.collectionIds?.includes("arcanum-unbounded"),
  ),
};

const getItems = (
  locale: Locale,
  group: NavigationGroupData,
): NavigationItem[] =>
  catalogueSources[group.source].map((item) => {
    const anchor = item.slug ?? item.id;
    const href =
      group.source === "routes" ||
      group.source === "sagas" ||
      group.source === "planets" ||
      group.source === "magicSystems" ||
      (group.source === "independents" && item.id === "arcanum-unbounded")
        ? getEntryPath(locale, group.href.slice(1), item.slug ?? item.id)
        : `${getSectionPath(locale, group.href.slice(1) as LocalizedSection)}#${anchor}`;

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
    href: getSectionPath(locale, group.href.slice(1) as LocalizedSection),
    items: getItems(locale, group),
  }));

export const getSections = (
  source: NavigationGroupData["source"],
  locale: Locale,
) =>
  catalogueSources[source].map((item) => ({
    id: item.slug ?? item.id,
    label: getTranslation(locale, item.labelKey),
  }));

export const getRoutes = (locale: Locale) =>
  (routesData as RouteData[]).map((route) => ({
    ...route,
    label: getTranslation(locale, route.labelKey),
    summary: getTranslation(locale, route.summaryKey),
  }));

export const getMagicSystems = (locale: Locale) =>
  (magicSystemsData as MagicSystemData[]).map((system) => ({
    ...system,
    label: getTranslation(locale, system.labelKey),
    world: getTranslation(locale, `planets.${system.worldId}`),
  }));

export const getPlanetProfile = (planetId: string): PlanetProfile => {
  const profile = planetProfilesData.find((item) => item.id === planetId);
  if (!profile) throw new Error(`Missing planet profile: ${planetId}`);
  return profile as PlanetProfile;
};

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
  const sortWorks = (items: WorkData[]) =>
    [...items].sort(
      (first, second) =>
        (first.publicationOrder ?? Number.MAX_SAFE_INTEGER) -
        (second.publicationOrder ?? Number.MAX_SAFE_INTEGER),
    );
  const sagaGroups: BookCollection[] = sagasData
    .map((saga) => ({
      id: saga.id,
      label: getTranslation(locale, saga.labelKey),
      sagaHref: getLocalizedPath(locale, `/sagas/${saga.slug}`),
      works: sortWorks(
        works.filter(
          (work) =>
            work.sagaId === saga.id &&
            !work.collectionIds?.includes("arcanum-unbounded"),
        ),
      ).map(mapWork),
    }))
    .filter((saga) => saga.works.length > 0);

  const mistborn = sagaGroups.find((saga) => saga.id === "mistborn");
  if (mistborn) {
    const eraWorks = (era: WorkData["era"]) =>
      sortWorks(
        works.filter(
          (work) =>
            work.sagaId === "mistborn" &&
            work.era === era &&
            !work.collectionIds?.includes("arcanum-unbounded"),
        ),
      ).map(mapWork);
    mistborn.subsections = [
      {
        id: "mistborn-era-1",
        label: getTranslation(locale, "books.subsections.era1"),
        works: eraWorks("era-1"),
      },
      {
        id: "mistborn-era-2",
        label: getTranslation(locale, "books.subsections.era2"),
        works: eraWorks("era-2"),
      },
    ];
    mistborn.works = [];
  }

  const standaloneWorks = sortWorks(
    works.filter(
      (work) =>
        !work.sagaId &&
        work.id !== "arcanum-unbounded" &&
        !work.collectionIds?.includes("arcanum-unbounded"),
    ),
  ).map(mapWork);

  if (standaloneWorks.length > 0) {
    sagaGroups.push({
      id: "standalone",
      label: getTranslation(locale, "books.standalone"),
      sagaHref: undefined,
      works: standaloneWorks,
    });
  }

  const arcanumWorks = works
    .filter(
      (work) =>
        work.id === "arcanum-unbounded" ||
        work.collectionIds?.includes("arcanum-unbounded"),
    )
    .sort((first, second) => {
      if (first.id === "arcanum-unbounded") return -1;
      if (second.id === "arcanum-unbounded") return 1;

      return (
        first.publicationYear - second.publicationYear ||
        (first.publicationOrder ?? Number.MAX_SAFE_INTEGER) -
          (second.publicationOrder ?? Number.MAX_SAFE_INTEGER)
      );
    })
    .map(mapWork);
  if (arcanumWorks.length > 0) {
    sagaGroups.push({
      id: "arcanum-unbounded",
      label: getTranslation(locale, "books.arcanumUnbounded"),
      works: arcanumWorks,
    });
  }

  return sagaGroups;
};

export const getBookCount = (): number =>
  (worksData as WorkData[]).filter(
    (work) => !work.collectionIds?.includes("arcanum-unbounded"),
  ).length;

export interface IndependentWork {
  id: string;
  title: string;
  type: string;
  typeKey: WorkData["typeKey"];
  publicationYear: number;
  image: ReturnType<typeof getBookImage>;
}

export const getIndependentWorks = (locale: Locale): IndependentWork[] =>
  (worksData as WorkData[])
    .filter(
      (work) =>
        !work.sagaId && !work.collectionIds?.includes("arcanum-unbounded"),
    )
    .sort(
      (first, second) =>
        first.publicationYear - second.publicationYear ||
        (first.publicationOrder ?? Number.MAX_SAFE_INTEGER) -
          (second.publicationOrder ?? Number.MAX_SAFE_INTEGER),
    )
    .map((work) => ({
      id: work.id,
      title: getTranslation(locale, work.labelKey),
      type: getTranslation(locale, `books.types.${work.typeKey}`),
      typeKey: work.typeKey,
      publicationYear: work.publicationYear,
      image: getBookImage(work),
    }));

const ensureUniqueIds = (items: NavigationEntryData[], source: string) => {
  const ids = new Set<string>();
  items.forEach((item) => {
    if (ids.has(item.id)) throw new Error(`Duplicate ${source} id: ${item.id}`);
    ids.add(item.id);
  });
};

const ensureEntryShape = (
  items: unknown[],
  source: string,
  requiresSlug = false,
) => {
  items.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(
        `Invalid ${source} at index ${index}: expected an object`,
      );
    }

    const entry = item as Record<string, unknown>;
    if (typeof entry.id !== "string" || entry.id.length === 0) {
      throw new Error(`Invalid ${source} at index ${index}: missing id`);
    }

    if (typeof entry.labelKey !== "string" || entry.labelKey.length === 0) {
      throw new Error(`Invalid ${source} "${entry.id}": missing labelKey`);
    }

    if (
      requiresSlug &&
      (typeof entry.slug !== "string" || entry.slug.length === 0)
    ) {
      throw new Error(`Invalid ${source} "${entry.id}": missing slug`);
    }
  });
};

const ensureUniqueSlugs = (items: CatalogueEntryData[], source: string) => {
  const slugs = new Set<string>();
  items.forEach((item) => {
    if (!item.slug) return;
    if (slugs.has(item.slug))
      throw new Error(`Duplicate ${source} slug: ${item.slug}`);
    slugs.add(item.slug);
  });
};

const ensureReference = (
  value: string,
  references: Set<string>,
  source: string,
  id: string,
  field: string,
) => {
  if (!references.has(value)) {
    throw new Error(`Invalid ${field} "${value}" in ${source} "${id}"`);
  }
};

const getTranslationKeys = (value: unknown, prefix = ""): string[] => {
  if (typeof value === "string") return [prefix];
  if (typeof value !== "object" || value === null) return [];

  return Object.entries(value).flatMap(([key, child]) =>
    getTranslationKeys(child, prefix ? `${prefix}.${key}` : key),
  );
};

export const validateProjectData = () => {
  ensureEntryShape(routesData, "route");
  ensureEntryShape(worksData, "work", true);
  ensureEntryShape(sagasData, "saga", true);
  ensureEntryShape(planetsData, "planet", true);
  ensureEntryShape(magicSystemsData, "magic system", true);

  (navigationData as Array<NavigationGroupData & { href: string }>).forEach(
    (group) => {
      if (typeof group.href !== "string" || !group.href.startsWith("/")) {
        throw new Error(`Invalid navigation href for group: ${group.id}`);
      }
      if (!catalogueSources[group.source]) {
        throw new Error(
          `Invalid navigation source "${group.source}" for group: ${group.id}`,
        );
      }
      getTranslation(defaultLocale, group.labelKey);
    },
  );

  ensureUniqueIds(routesData, "route");
  ensureUniqueIds(worksData, "work");
  ensureUniqueIds(sagasData, "saga");
  ensureUniqueIds(planetsData, "planet");
  ensureUniqueIds(magicSystemsData, "magic system");
  ensureUniqueSlugs(worksData, "work");
  ensureUniqueSlugs(sagasData, "saga");
  ensureUniqueSlugs(planetsData, "planet");
  ensureUniqueSlugs(magicSystemsData, "magic system");

  const sagaIds = new Set(sagasData.map((saga) => saga.id));
  const planetIds = new Set(planetsData.map((planet) => planet.id));
  const collectionIds = new Set(["arcanum-unbounded"]);
  const magicSystemIds = new Set(magicSystemsData.map((system) => system.id));
  const planetProfileIds = new Set(
    planetProfilesData.map((planet) => planet.id),
  );

  planetIds.forEach((planetId) => {
    if (!planetProfileIds.has(planetId))
      throw new Error(`Missing planet profile: ${planetId}`);
  });
  planetProfileIds.forEach((planetId) => {
    if (!planetIds.has(planetId))
      throw new Error(`Orphan planet profile: ${planetId}`);
  });

  (worksData as WorkData[]).forEach((work) => {
    getTranslation(defaultLocale, work.labelKey);
    getBookImage(work);
    if (work.sagaId)
      ensureReference(work.sagaId, sagaIds, "work", work.id, "sagaId");
    work.collectionIds?.forEach((collectionId) =>
      ensureReference(
        collectionId,
        collectionIds,
        "work",
        work.id,
        "collectionId",
      ),
    );
  });

  (routesData as RouteData[]).forEach((route) => {
    getTranslation(defaultLocale, route.labelKey);
    if (!route.summaryKey)
      throw new Error(`Missing summaryKey in route "${route.id}"`);
    getTranslation(defaultLocale, route.summaryKey);
  });
  sagasData.forEach((saga) => getTranslation(defaultLocale, saga.labelKey));
  planetsData.forEach((planet) =>
    getTranslation(defaultLocale, planet.labelKey),
  );
  (magicSystemsData as MagicSystemData[]).forEach((system) => {
    getTranslation(defaultLocale, system.labelKey);
    ensureReference(
      system.worldId,
      planetIds,
      "magic system",
      system.id,
      "worldId",
    );
  });

  const profileIds = new Set(Object.keys(magicSystemProfiles));
  magicSystemIds.forEach((systemId) => {
    if (!profileIds.has(systemId))
      throw new Error(`Missing magic system profile for: ${systemId}`);
    const sections =
      magicSystemProfiles[systemId as keyof typeof magicSystemProfiles];
    if (!Array.isArray(sections) || sections.length === 0) {
      throw new Error(`Empty magic system profile for: ${systemId}`);
    }
  });
  profileIds.forEach((systemId) => {
    if (!magicSystemIds.has(systemId))
      throw new Error(`Orphan magic system profile: ${systemId}`);
  });

  const creditedFiles = new Set<string>();
  imageCredits.forEach((group) => {
    if (
      !group.id ||
      !group.titleKey ||
      !group.descriptionKey ||
      group.items.length === 0
    ) {
      throw new Error(`Invalid image credit group: ${group.id || "unknown"}`);
    }

    group.items.forEach((item) => {
      if (creditedFiles.has(item.file))
        throw new Error(`Duplicate image credit: ${item.file}`);
      if (!item.author || !item.source || !item.license) {
        throw new Error(`Incomplete image credit: ${item.file}`);
      }
      creditedFiles.add(item.file);
    });
  });

  const sourceKeys = getTranslationKeys(translations[defaultLocale]);
  locales.forEach((locale) => {
    const localeKeys = getTranslationKeys(translations[locale]);
    const missing = sourceKeys.filter((key) => !localeKeys.includes(key));
    const extra = localeKeys.filter((key) => !sourceKeys.includes(key));
    if (missing.length || extra.length) {
      throw new Error(
        `Translation mismatch in ${locale}: missing [${missing.join(", ")}], extra [${extra.join(", ")}]`,
      );
    }
  });
};

validateProjectData();
