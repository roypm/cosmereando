export interface NavigationGroupData {
  id: 'routes' | 'works' | 'sagas' | 'planets';
  href: string;
  labelKey: string;
  source: 'routes' | 'works' | 'sagas' | 'planets';
}

export interface NavigationEntryData {
  id: string;
  labelKey: string;
}

export interface CatalogueItemData extends NavigationEntryData {
  slug: string;
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}
