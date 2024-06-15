'use client'

import StyledMenuIcon from '@/utils/@core/layouts/styles/styled-menu-icon'
import StyledMenuPrefix from '@/utils/@core/layouts/styles/styled-menu-prefix'
import StyledMenuSectionLabel from '@/utils/@core/layouts/styles/styled-menu-section-label'
import StyledMenuSuffix from '@/utils/@core/layouts/styles/styled-menu-suffix'
import useVerticalMenu from '@/utils/hooks/use-vertical-menu'
import useVerticalNav from '@/utils/hooks/use-vertical-nav'
import { ChildrenType } from '@/utils/models/core-model'
import { RootStylesType } from '@/utils/models/menu-model'
import { CSSObject } from '@emotion/styled'
import classnames from 'classnames'
import { CSSProperties, forwardRef, ForwardRefRenderFunction, ReactElement, ReactNode } from 'react'
import { menuClasses } from '../classes/nav-classes'
import StyledVerticalMenuSection from '../styles/styled-vertical-menu-section'
import { MenuSectionStyles } from './menu'

export type MenuSectionProps = Partial<ChildrenType> &
  RootStylesType & {
    label: ReactNode
    icon?: ReactElement
    prefix?: ReactNode
    suffix?: ReactNode

    /**
     * @ignore
     */
    className?: string
  }

type MenuSectionElement = keyof MenuSectionStyles

const menuSectionWrapperStyles: CSSProperties = {
  display: 'inline-block',
  inlineSize: '100%',
  position: 'relative',
  listStyle: 'none',
  padding: 0,
  overflow: 'hidden'
}

const menuSectionContentStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  inlineSize: '100%',
  position: 'relative',
  paddingBlock: '0.75rem',
  paddingInline: '1.25rem',
  overflow: 'hidden'
}

const MenuSection: ForwardRefRenderFunction<HTMLLIElement, MenuSectionProps> = (props, ref) => {
  // Props
  const { children, icon, className, prefix, suffix, label, rootStyles, ...rest } = props

  // Hooks
  const { isCollapsed, isHovered } = useVerticalNav()
  const { menuSectionStyles, collapsedMenuSectionLabel, textTruncate } = useVerticalMenu()

  const getMenuSectionStyles = (element: MenuSectionElement): CSSObject | undefined => {
    // If the menuSectionStyles prop is provided, get the styles for the element from the prop
    if (menuSectionStyles) {
      return menuSectionStyles[element]
    }
  }

  return (
    // eslint-disable-next-line lines-around-comment
    // Menu Section
    <StyledVerticalMenuSection
      ref={ref}
      rootStyles={rootStyles}
      menuSectionStyles={getMenuSectionStyles('root')}
      className={classnames(menuClasses.menuSectionRoot, className)}
    >
      {/* Menu Section Content Wrapper */}
      <ul className={menuClasses.menuSectionWrapper} {...rest} style={menuSectionWrapperStyles}>
        {/* Menu Section Content */}
        <li className={menuClasses.menuSectionContent} style={menuSectionContentStyles}>
          {icon && (
            <StyledMenuIcon className={menuClasses.icon} rootStyles={getMenuSectionStyles('icon')}>
              {icon}
            </StyledMenuIcon>
          )}
          {prefix && (
            <StyledMenuPrefix
              isCollapsed={isCollapsed}
              className={menuClasses.prefix}
              rootStyles={getMenuSectionStyles('prefix')}
            >
              {prefix}
            </StyledMenuPrefix>
          )}
          {collapsedMenuSectionLabel && isCollapsed && !isHovered ? (
            <StyledMenuSectionLabel
              isCollapsed={isCollapsed}
              isHovered={isHovered}
              className={menuClasses.menuSectionLabel}
              rootStyles={getMenuSectionStyles('label')}
              textTruncate={textTruncate}
            >
              {collapsedMenuSectionLabel}
            </StyledMenuSectionLabel>
          ) : (
            label && (
              <StyledMenuSectionLabel
                isCollapsed={isCollapsed}
                isHovered={isHovered}
                className={menuClasses.menuSectionLabel}
                rootStyles={getMenuSectionStyles('label')}
                textTruncate={textTruncate}
              >
                {label}
              </StyledMenuSectionLabel>
            )
          )}
          {suffix && (
            <StyledMenuSuffix
              isCollapsed={isCollapsed}
              className={menuClasses.suffix}
              rootStyles={getMenuSectionStyles('suffix')}
            >
              {suffix}
            </StyledMenuSuffix>
          )}
        </li>
        {/* Render Child */}
        {children}
      </ul>
    </StyledVerticalMenuSection>
  )
}

export default forwardRef<HTMLLIElement, MenuSectionProps>(MenuSection)
