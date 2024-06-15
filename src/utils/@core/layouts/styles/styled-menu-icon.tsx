import { RootStylesType } from '@/utils/models/menu-model'
import styled from '@emotion/styled'

const StyledMenuIcon = styled.span<RootStylesType>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 10px;
  ${({ rootStyles }) => rootStyles};
`

export default StyledMenuIcon
