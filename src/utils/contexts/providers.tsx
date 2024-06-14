import { VerticalNavProvider } from '@/utils/contexts/navigations/vertical-nav-context'
import { NextAuthProvider } from '@/utils/contexts/next-auth-provider-context'
import { ChildrenType } from '@/utils/models/core-model'
import React from 'react'
import { SettingsProvider } from './settings-context'
import { getMode, getSettingsFromCookie, getThemeName } from '../helpers/server-helpers'

type Props = ChildrenType

const Providers = (props: Props) => {
  const { children } = props

  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const themeName = getThemeName()

  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      <VerticalNavProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode} themeName={themeName}>
          {children}
        </SettingsProvider>
      </VerticalNavProvider>
    </NextAuthProvider>
  )
}

export default Providers
