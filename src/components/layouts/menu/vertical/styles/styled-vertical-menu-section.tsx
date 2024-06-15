import styled, { CSSObject } from '@emotion/styled'
import { menuClasses } from '../classes/nav-classes'

type StyledVerticalMenuSectionProps = Pick<MenuSectionProps, 'rootStyles' | 'children'> & {
  menuSectionStyles?: CSSObject
}

const StyledVerticalMenuSection = styled.li<StyledVerticalMenuSectionProps>`
  display: flex;
  inline-size: 100%;
  position: relative;
  overflow: hidden;
  margin-block-start: 15px;

  & .${menuClasses.menuSectionContent} {
    font-size: 14px;
    color: #aaaaaa;
  }

  ${({ menuSectionStyles }) => menuSectionStyles};
  ${({ rootStyles }) => rootStyles};
`

export default StyledVerticalMenuSection
