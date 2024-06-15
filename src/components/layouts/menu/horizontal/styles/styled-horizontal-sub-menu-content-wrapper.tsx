import { RootStylesType } from '@/utils/models/menu-model'
import styled from '@emotion/styled'

const StyledHorizontalSubMenuContentWrapper = styled.div<RootStylesType>`
  z-index: 10;

  ${({ rootStyles }) => rootStyles};
`

export default StyledHorizontalSubMenuContentWrapper
