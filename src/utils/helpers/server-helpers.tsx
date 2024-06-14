import 'server-only'

// Next Imports
import { cookies, headers } from 'next/headers'
import { SystemMode, ThemeName } from '../models/core-model'
import { Settings } from '../contexts/settings-context'
import TemplateConfig from '../configs/template-configs'
import ThemeConfigs from '../configs/theme-configs'

export const getThemeName = (): ThemeName => {
  const headersList = headers()

  return headersList.get('X-server-header') as ThemeName | null
}

export const getSettingsFromCookie = (): Settings => {
  const cookieStore = cookies()

  const themeName = getThemeName()

  const cookieName = themeName
    ? TemplateConfig.settingsCookieName.replace('theme-1', themeName)
    : TemplateConfig.settingsCookieName

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = () => {
  const settingsCookie = getSettingsFromCookie()

  const themeName = getThemeName()

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || (themeName && ThemeConfigs[themeName].mode) || TemplateConfig.mode

  return _mode
}

export const getSystemMode = (): SystemMode => {
  const cookieStore = cookies()
  const mode = getMode()

  const colorPrefCookie = (cookieStore.get('colorPref')?.value || 'light') as SystemMode

  return (mode === 'system' ? colorPrefCookie : mode) || 'light'
}

export const getServerMode = () => {
  const mode = getMode()
  const systemMode = getSystemMode()

  return mode === 'system' ? systemMode : mode
}

export const getSkin = () => {
  const settingsCookie = getSettingsFromCookie()

  return settingsCookie.skin || 'default'
}
