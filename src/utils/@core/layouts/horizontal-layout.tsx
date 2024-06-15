import { HorizontalNavProvider } from '@/utils/contexts/navigations/horizontal-nav-context'
import { ChildrenType } from '@/utils/models/core-model'
import classnames from 'classnames'
import { ReactNode } from 'react'
import LayoutContent from './layout-content'
import { horizontalLayoutClasses } from './styles/layout-classes'

type HorizontalLayoutProps = ChildrenType & {
  header?: ReactNode
  footer?: ReactNode
}

const HorizontalLayout = (props: HorizontalLayoutProps) => {
  // Props
  const { header, footer, children } = props

  return (
    <div className={classnames(horizontalLayoutClasses.root, 'flex flex-auto')}>
      <HorizontalNavProvider>
        <div className={classnames(horizontalLayoutClasses.contentWrapper, 'flex flex-col is-full')}>
          {header || null}
          <LayoutContent>{children}</LayoutContent>
          {footer || null}
        </div>
      </HorizontalNavProvider>
    </div>
  )
}

export default HorizontalLayout
