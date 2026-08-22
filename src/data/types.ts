export interface NavigationGroupData {
  id: 'routes' | 'works' | 'sagas' | 'planets' | 'magic-systems';
  href: string;
  labelKey: string;
  source: 'routes' | 'works' | 'sagas' | 'planets' | 'magicSystems';
}

export interface NavigationEntryData {
  id: string;
  labelKey: string;
}

export interface WorkData extends NavigationEntryData {
  slug: string;
  sagaId?: string;
  typeKey: 'novel' | 'novella' | 'short-story' | 'graphic-novel' | 'omnibus' | 'anthology' | 'excerpt';
  publicationOrder?: number;
  publicationYear: number;
  arcanumStatus?: 'arcanum-original' | 'previously-published';
  era?: 'era-1' | 'era-2';
  collectionIds?: string[];
}

export interface CatalogueItemData extends NavigationEntryData {
  slug: string;
}

export interface PlanetProfile {
  systemKey: string;
  imageLabelKey: string;
  storyKeys: string[];
}

export interface MagicSystemData extends NavigationEntryData {
  slug: string;
  worldId: string;
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}
