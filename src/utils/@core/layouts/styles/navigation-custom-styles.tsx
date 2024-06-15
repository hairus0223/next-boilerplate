import { VerticalNavState } from '@/utils/contexts/navigations/vertical-nav-context'

const navigationCustomStyles = (verticalNavOptions: VerticalNavState) => {
  const { collapsedWidth, isCollapsed, isHovered, transitionDuration } = verticalNavOptions
  const collapsedNotHovered = isCollapsed && !isHovered

  return {
    base: 'text-primary z-[var(--drawer-z-index)]',
    header: `py-5 px-[var(--custom-spacing)] ${
      collapsedNotHovered ? `px-[calc(${collapsedWidth}px - 35px) / 8]` : ''
    } transition-transform duration-[${transitionDuration}ms] ease`,
    container: `transition-all duration-[${transitionDuration}ms] ease-in-out border-transparent shadow-sm ${
      '[data-skin="bordered"]' ? 'shadow-none border-divider' : ''
    }`,
    menuRoot: 'py-1 px-3',
    backdrop: 'bg-backdrop-color'
  }
}

export default navigationCustomStyles
