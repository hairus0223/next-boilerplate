import { VerticalNavProps } from '@/components/layouts/menu/vertical/vertical-menu/vertical-nav'
import styled from '@emotion/styled'

type StyledBackdropProps = Pick<VerticalNavProps, 'backdropColor'>

const StyledBackdrop = styled.div<StyledBackdropProps>`
  position: fixed;
  inset-inline-start: 0;
  inset-block-start: 0;
  inset-inline-end: 0;
  inset-block-end: 0;
  z-index: 1;
  background-color: ${({ backdropColor }) => backdropColor || 'rgba(0, 0, 0, 0.3)'};
  touch-action: none;
`

export default StyledBackdrop
