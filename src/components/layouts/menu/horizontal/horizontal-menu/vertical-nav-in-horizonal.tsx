import { ChildrenType } from '@/utils/models/core-model'
import { BreakpointType } from '@/utils/models/menu-model'
import VerticalNav, { VerticalNavProps } from '../../vertical'

// Type
type VerticalNavInHorizontalProps = ChildrenType & {
  className?: string
  breakpoint?: BreakpointType
  customBreakpoint?: string
  verticalNavProps?: Pick<VerticalNavProps, 'width' | 'backgroundColor' | 'backgroundImage' | 'customStyles'>
}

const VerticalNavInHorizontal = (props: VerticalNavInHorizontalProps) => {
  // Props
  const { children, className, breakpoint, customBreakpoint, verticalNavProps } = props

  return (
    <VerticalNav
      {...verticalNavProps}
      className={className}
      breakpoint={breakpoint}
      customBreakpoint={customBreakpoint}
    >
      {children}
    </VerticalNav>
  )
}

export default VerticalNavInHorizontal
