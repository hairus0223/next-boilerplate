'use client'

import StyledMenuLabel from '@/utils/@core/layouts/styles/styled-menu-label'
import StyledMenuPrefix from '@/utils/@core/layouts/styles/styled-menu-prefix'
import StyledMenuSuffix from '@/utils/@core/layouts/styles/styled-menu-suffix'
import { renderMenuIcon } from '@/utils/helpers/menu/menu-utils'
import useVerticalNav from '@/utils/hooks/use-vertical-nav'
import { ChildrenType } from '@/utils/models/core-model'
import { MenuItemElement, RootStylesType } from '@/utils/models/menu-model'
import { CSSObject } from '@emotion/styled'
import { useFloatingTree } from '@floating-ui/react'
import classnames from 'classnames'
import { usePathname } from 'next/navigation'
import {
  forwardRef,
  useContext,
  useEffect,
  useState,
  AnchorHTMLAttributes,
  ForwardRefRenderFunction,
  ReactElement,
  MouseEvent,
  ReactNode
} from 'react'
import { useUpdateEffect } from 'react-use'
import { menuClasses } from '../../vertical/classes/nav-classes'
import MenuButton from './menu-button'
import { HorizontalSubMenuContext } from './sub-menu'
import StyledHorizontalMenuItem from '../styles/styled-horizontal-menu-item'
import styles from '../styles/horizontal-ui.module.css'
import useHorizontalMenu from '@/utils/hooks/use-horizontal-menu'

export type MenuItemProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix'> &
  RootStylesType &
  Partial<ChildrenType> & {
    icon?: ReactElement
    prefix?: ReactNode
    suffix?: ReactNode
    disabled?: boolean
    target?: string
    rel?: string
    component?: string | ReactElement
    onActiveChange?: (active: boolean) => void

    /**
     * @ignore
     */
    level?: number
  }

const MenuItem: ForwardRefRenderFunction<HTMLLIElement, MenuItemProps> = (props, ref) => {
  // Props
  const {
    children,
    icon,
    className,
    prefix,
    suffix,
    level = 0,
    disabled = false,
    component,
    onActiveChange,
    rootStyles,
    ...rest
  } = props

  // States
  const [active, setActive] = useState(false)

  // Hooks
  const tree = useFloatingTree()
  const pathname = usePathname()
  const { toggleVerticalNav, isToggled } = useVerticalNav()
  const { getItemProps } = useContext(HorizontalSubMenuContext)
  const { menuItemStyles, renderExpandedMenuItemIcon, textTruncate } = useHorizontalMenu()

  const getMenuItemStyles = (element: MenuItemElement): CSSObject | undefined => {
    // If the menuItemStyles prop is provided, get the styles for the specified element.
    if (menuItemStyles) {
      // Define the parameters that are passed to the style functions.
      const params = { level, disabled, active, isSubmenu: false }

      // Get the style function for the specified element.
      const styleFunction = menuItemStyles[element]

      if (styleFunction) {
        // If the style function is a function, call it and return the result.
        // Otherwise, return the style function itself.
        return typeof styleFunction === 'function' ? styleFunction(params) : styleFunction
      }
    }
  }

  // Handle the click event.
  const handleClick = () => {
    if (isToggled) {
      toggleVerticalNav()
    }
  }

  // Change active state when the url changes
  useEffect(() => {
    const href = rest.href || (component && typeof component !== 'string' && component.props.href)

    if (href) {
      // Check if the current url matches any of the children urls
      if (pathname === href) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Call the onActiveChange callback when the active state changes.
  useUpdateEffect(() => {
    onActiveChange?.(active)
  }, [active])

  return (
    <StyledHorizontalMenuItem
      ref={ref}
      className={classnames(
        { [menuClasses.menuItemRoot]: level === 0 },
        { [menuClasses.active]: active },
        { [menuClasses.disabled]: disabled },
        styles.li,
        className
      )}
      level={level}
      disabled={disabled}
      buttonStyles={getMenuItemStyles('button')}
      menuItemStyles={getMenuItemStyles('root')}
      rootStyles={rootStyles}
    >
      <MenuButton
        className={classnames(menuClasses.button, { [menuClasses.active]: active })}
        component={component}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        {...getItemProps({
          onClick(event: MouseEvent<HTMLAnchorElement>) {
            props.onClick?.(event)
            tree?.events.emit('click')
          }
        })}
        {...rest}
      >
        {/* Menu Item Icon */}
        {renderMenuIcon({
          icon,
          level,
          active,
          disabled,
          renderExpandedMenuItemIcon,
          styles: getMenuItemStyles('icon')
        })}

        {/* Menu Item Prefix */}
        {prefix && (
          <StyledMenuPrefix
            firstLevel={level === 0}
            className={menuClasses.prefix}
            rootStyles={getMenuItemStyles('prefix')}
          >
            {prefix}
          </StyledMenuPrefix>
        )}

        {/* Menu Item Label */}
        <StyledMenuLabel
          className={menuClasses.label}
          rootStyles={getMenuItemStyles('label')}
          textTruncate={textTruncate}
        >
          {children}
        </StyledMenuLabel>

        {/* Menu Item Suffix */}
        {suffix && (
          <StyledMenuSuffix
            firstLevel={level === 0}
            className={menuClasses.suffix}
            rootStyles={getMenuItemStyles('suffix')}
          >
            {suffix}
          </StyledMenuSuffix>
        )}
      </MenuButton>
    </StyledHorizontalMenuItem>
  )
}

export default forwardRef(MenuItem)
