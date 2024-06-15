import { RootStylesType } from '@/utils/models/menu-model'
import styled from '@emotion/styled'

type StyledMenuPrefixProps = RootStylesType & {
  firstLevel?: boolean
  isCollapsed?: boolean
  isHovered?: boolean
}

const StyledMenuPrefix = styled.span<StyledMenuPrefixProps>`
  margin-inline-end: 5px;
  display: ${({ firstLevel, isCollapsed, isHovered }) => (firstLevel && isCollapsed && !isHovered ? 'none' : 'flex')};
  ${({ rootStyles }) => rootStyles};
`

export default StyledMenuPrefix
