// Third-party Imports
import 'server-only'
import { Locale } from '../configs/i18n'

// Type Imports

const dictionaries = {
  id: () => import('../../locales/id.json').then(module => module.default),
  en: () => import('../../locales/en.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
