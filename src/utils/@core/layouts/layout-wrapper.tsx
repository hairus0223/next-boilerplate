'use client'

import { useSettings } from '@/utils/hooks/use-settings'
import { ReactElement } from 'react'

type LayoutWrapperProps = {
  verticalLayout: ReactElement
  horizontalLayout: ReactElement
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
  // Props
  const { verticalLayout, horizontalLayout } = props

  // Hooks
  const { settings } = useSettings()

  // Return the layout based on the layout context
  return (
    <div className='flex flex-col flex-auto' data-skin={settings.skin}>
      {settings.layout === 'horizontal' ? horizontalLayout : verticalLayout}
    </div>
  )
}

export default LayoutWrapper
