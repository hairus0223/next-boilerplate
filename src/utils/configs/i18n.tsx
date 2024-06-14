export const i18n = {
  defaultLocale: 'id',
  locales: ['id', 'en'],
  langDirection: {
    id: 'ltr',
    en: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
