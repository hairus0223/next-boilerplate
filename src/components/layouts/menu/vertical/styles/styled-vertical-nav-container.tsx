import styled from '@emotion/styled'
import { verticalNavClasses } from '../classes/nav-classes'
import { VerticalNavProps } from '../vertical-menu/vertical-nav'

type StyledVerticalNavContainerProps = Pick<VerticalNavProps, 'width' | 'transitionDuration'>

const StyledVerticalNavContainer = styled.div<StyledVerticalNavContainerProps>`
  position: relative;
  block-size: 100%;
  inline-size: 100%;
  border-inline-end: 1px solid #efefef;
  .${verticalNavClasses.hovered} &,
  .${verticalNavClasses.expanding} & {
    inline-size: ${({ width }) => `${width}px`};
  }

  /* Transition */
  transition-property: inline-size, inset-inline-start;
  transition-duration: ${({ transitionDuration }) => `${transitionDuration}ms`};
  transition-timing-function: ease-in-out;
`

export default StyledVerticalNavContainer
