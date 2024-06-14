'use client'

import { createContext, ReactNode, useMemo, useState } from 'react'
import PrimaryColorConfig from '../configs/primary-color-configs'
import TemplateConfig from '../configs/template-configs'
import ThemeConfigs from '../configs/theme-configs'
import { useObjectCookie } from '../hooks/use-object-cookie'
import { Layout, LayoutComponentWidth, Mode, Skin, ThemeName } from '../models/core-model'

// Settings type
export type Settings = {
  mode?: Mode
  skin?: Skin
  semiDark?: boolean
  layout?: Layout
  navbarContentWidth?: LayoutComponentWidth
  contentWidth?: LayoutComponentWidth
  footerContentWidth?: LayoutComponentWidth
  primaryColor?: string
}

// UpdateSettingsOptions type
type UpdateSettingsOptions = {
  updateCookie?: boolean
}

// SettingsContextProps type
type SettingsContextProps = {
  settings: Settings
  updateSettings: (settings: Partial<Settings>, options?: UpdateSettingsOptions) => void
  isSettingsChanged: boolean
  resetSettings: () => void
  updatePageSettings: (settings: Partial<Settings>) => () => void
}

type Props = {
  children: ReactNode
  settingsCookie: Settings | null
  mode?: Mode
  themeName?: ThemeName
}

// Initial Settings Context
export const SettingsContext = createContext<SettingsContextProps | null>(null)

// Settings Provider
export const SettingsProvider = (props: Props) => {
  const themeName = props.themeName || null
  const themeConfigurations = themeName ? ThemeConfigs[themeName] : {}

  // Initial Settings
  const initialSettings: Settings = {
    mode: TemplateConfig.mode,
    skin: TemplateConfig.skin,
    semiDark: TemplateConfig.semiDark,
    layout: TemplateConfig.layout,
    navbarContentWidth: TemplateConfig.navbar.contentWidth,
    contentWidth: TemplateConfig.contentWidth,
    footerContentWidth: TemplateConfig.footer.contentWidth,
    primaryColor: PrimaryColorConfig[0].main,
    ...(themeName && themeConfigurations)
  }

  const updatedInitialSettings = {
    ...initialSettings,
    mode: props.mode || (themeName && themeConfigurations.mode) || TemplateConfig.mode
  }

  // Cookies
  const [settingsCookie, updateSettingsCookie] = useObjectCookie<Settings>(
    themeName ? TemplateConfig.settingsCookieName.replace('theme-1', themeName) : TemplateConfig.settingsCookieName,
    JSON.stringify(props.settingsCookie) !== '{}' ? props.settingsCookie : updatedInitialSettings
  )

  // State
  const [_settingsState, _updateSettingsState] = useState<Settings>(
    JSON.stringify(settingsCookie) !== '{}' ? settingsCookie : updatedInitialSettings
  )

  const updateSettings = (settings: Partial<Settings>, options?: UpdateSettingsOptions) => {
    const { updateCookie = true } = options || {}

    _updateSettingsState(prev => {
      const newSettings = { ...prev, ...settings }

      // Update cookie if needed
      if (updateCookie) updateSettingsCookie(newSettings)

      return newSettings
    })
  }

  /**
   * Updates the settings for page with the provided settings object.
   * Updated settings won't be saved to cookie hence will be reverted once navigating away from the page.
   *
   * @param settings - The partial settings object containing the properties to update.
   * @returns A function to reset the page settings.
   *
   * @example
   * useEffect(() => {
   *     return updatePageSettings({ theme: 'dark' });
   * }, []);
   */
  const updatePageSettings = (settings: Partial<Settings>): (() => void) => {
    updateSettings(settings, { updateCookie: false })

    // Returns a function to reset the page settings
    return () => updateSettings(settingsCookie, { updateCookie: false })
  }

  const resetSettings = () => {
    updateSettings(initialSettings)
  }

  const isSettingsChanged = useMemo(
    () => JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_settingsState]
  )

  return (
    <SettingsContext.Provider
      value={{
        settings: _settingsState,
        updateSettings,
        isSettingsChanged,
        resetSettings,
        updatePageSettings
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}
