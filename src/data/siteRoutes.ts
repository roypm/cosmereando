export const localizedSectionNames = [
  'books',
  'routes',
  'sagas',
  'planets',
  'credits',
] as const;

export type LocalizedSection = (typeof localizedSectionNames)[number];
