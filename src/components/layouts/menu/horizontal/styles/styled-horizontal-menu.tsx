import styled from '@emotion/styled'
import { menuClasses } from '../../vertical/classes/nav-classes'
import { MenuProps } from '../../vertical/vertical-menu/menu'

const StyledHorizontalMenu = styled.nav<Pick<MenuProps, 'rootStyles'>>`
  &.${menuClasses.root} {
    ${({ rootStyles }) => rootStyles}
  }
`

export default StyledHorizontalMenu
