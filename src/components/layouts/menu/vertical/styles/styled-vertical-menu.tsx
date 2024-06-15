import styled from '@emotion/styled'
import { menuClasses } from '../classes/nav-classes'
import { MenuProps } from '../vertical-menu/menu'

const StyledVerticalMenu = styled.nav<Pick<MenuProps, 'rootStyles'>>`
  & > ul > :first-of-type {
    margin-block-start: 0;
  }
  &.${menuClasses.root} {
    ${({ rootStyles }) => rootStyles}
  }
`

export default StyledVerticalMenu
