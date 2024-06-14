import { Locale } from '@/utils/configs/i18n'
import Providers from '@/utils/contexts/providers'
import { ChildrenType } from '@/utils/models/core-model'
import React from 'react'

const Layout = async ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  return <Providers>{children}</Providers>
}

export default Layout
