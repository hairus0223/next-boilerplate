import { RootStylesType } from '@/utils/models/menu-model'
import styled from '@emotion/styled'

type StyledMenuLabelProps = RootStylesType & {
  textTruncate?: boolean
}

const StyledMenuLabel = styled.span<StyledMenuLabelProps>`
  flex-grow: 1;
  ${({ textTruncate }) =>
    textTruncate &&
    `
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `};
  ${({ rootStyles }) => rootStyles};
`

export default StyledMenuLabel
