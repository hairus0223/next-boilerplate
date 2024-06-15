'use client'

import { defaultBreakpoints } from '@/utils/configs/template-configs'
import useHorizontalNav from '@/utils/hooks/use-horizontal-nav'
import useMediaQuery from '@/utils/hooks/use-media-query'
import { ChildrenType } from '@/utils/models/core-model'
import { BreakpointType } from '@/utils/models/menu-model'
import { CSSObject } from '@emotion/styled'
import classnames from 'classnames'
import { HTMLAttributes, useEffect, useRef } from 'react'
import { horizontalNavClasses } from '../../vertical/classes/nav-classes'
import { VerticalNavProps } from '../../vertical/vertical-menu/vertical-nav'
import StyledHorizontalNav from '../styles/styled-horizontal-nav'
import VerticalNavInHorizontal from './vertical-nav-in-horizonal'

export type HorizontalNavProps = HTMLAttributes<HTMLDivElement> & {
  switchToVertical?: boolean
  hideMenu?: boolean
  breakpoint?: BreakpointType
  customBreakpoint?: string
  breakpoints?: Partial<typeof defaultBreakpoints>
  customStyles?: CSSObject
  verticalNavProps?: Pick<VerticalNavProps, 'width' | 'backgroundColor' | 'backgroundImage' | 'customStyles'>
  verticalNavContent?: ({ children }: ChildrenType) => JSX.Element

  /**
   * @ignore
   */
  setIsBreakpointReached?: (isBreakpointReached: boolean) => void
}

const HorizontalNav = (props: HorizontalNavProps) => {
  // Props
  const {
    switchToVertical = false,
    hideMenu = false,
    breakpoint = 'lg',
    customBreakpoint,
    breakpoints,
    customStyles,
    className,
    children,
    verticalNavProps,
    verticalNavContent: VerticalNavContent
  } = props

  // Vars
  const mergedBreakpoints = { ...defaultBreakpoints, ...breakpoints }
  const horizontalMenuClasses = classnames(horizontalNavClasses.root, className)

  // Refs
  const prevBreakpoint = useRef(false)

  // Hooks
  const { updateIsBreakpointReached } = useHorizontalNav()

  // Find the breakpoint from which screen size responsive behavior should enable and if its reached or not
  const breakpointReached = useMediaQuery(customBreakpoint ?? (breakpoint ? mergedBreakpoints[breakpoint] : breakpoint))

  // Set the breakpointReached value in the state
  useEffect(() => {
    if (prevBreakpoint.current === breakpointReached) return
    updateIsBreakpointReached(breakpointReached)
    prevBreakpoint.current = breakpointReached
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpointReached])

  // If switchToVertical is true, then render the VerticalNav component if breakpoint is reached
  if (switchToVertical && breakpointReached) {
    return (
      <VerticalNavInHorizontal
        breakpoint={breakpoint}
        className={horizontalMenuClasses}
        customBreakpoint={customBreakpoint}
        verticalNavProps={verticalNavProps}
      >
        {VerticalNavContent && <VerticalNavContent>{children}</VerticalNavContent>}
      </VerticalNavInHorizontal>
    )
  }

  // If hideMenu is true, then hide the HorizontalNav component if breakpoint is reached
  if (hideMenu && breakpointReached) {
    return null
  }

  // If switchToVertical & hideMenu are false, then render the HorizontalNav component
  return (
    <StyledHorizontalNav customStyles={customStyles} className={horizontalMenuClasses}>
      {children}
    </StyledHorizontalNav>
  )
}

export default HorizontalNav
