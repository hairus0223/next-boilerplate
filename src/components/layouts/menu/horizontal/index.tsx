// Import all Horizontal Nav components and export them
import Menu from './horizontal-menu/menu'
import SubMenu from './horizontal-menu/sub-menu'
import MenuItem from './horizontal-menu/menu-item'
import HorizontalNav from './horizontal-menu/horizontal-nav'
import type { MenuProps } from './horizontal-menu/menu'
import type { SubMenuProps } from './horizontal-menu/sub-menu'
import type { MenuItemProps } from './horizontal-menu/menu-item'
import type { HorizontalNavProps } from './horizontal-menu/horizontal-nav'

export default HorizontalNav
export { Menu, MenuItem, SubMenu }
export type { HorizontalNavProps, MenuProps, MenuItemProps, SubMenuProps }
