import Navigation from '@/components/layouts/menu/vertical/navigation'
import HorizontalLayout from '@/utils/@core/layouts/horizontal-layout'
import LayoutWrapper from '@/utils/@core/layouts/layout-wrapper'
import VerticalLayout from '@/utils/@core/layouts/vertical-layout'
import { i18n, Locale } from '@/utils/configs/i18n'
import Providers from '@/utils/contexts/providers'
import { getDictionary } from '@/utils/helpers/get-dictionary'
import { getMode, getSystemMode } from '@/utils/helpers/server-helpers'
import { ChildrenType } from '@/utils/models/core-model'
import React from 'react'

const Layout = async ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  const direction = i18n.langDirection[params.lang]
  const dictionary = await getDictionary(params.lang)
  const mode = getMode()
  const systemMode = getSystemMode()

  return (
    <Providers>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout
            navigation={<Navigation dictionary={dictionary} mode={mode} systemMode={systemMode} />}
            navbar={<div>Navbar</div>}
            footer={<div>Footer</div>}
          >
            {children}
          </VerticalLayout>
        }
        horizontalLayout={
          <HorizontalLayout header={<div>Header</div>} footer={<div>Footer</div>}>
            {children}
          </HorizontalLayout>
        }
      />
    </Providers>
  )
}

export default Layout
