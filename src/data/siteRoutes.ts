export const localizedSectionNames = [
  'books',
  'routes',
  'sagas',
  'planets',
  'magic-systems',
  'credits',
] as const;

export type LocalizedSection = (typeof localizedSectionNames)[number];
