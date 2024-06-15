import styled from '@emotion/styled'
import { VerticalNavProps } from '../vertical-menu/vertical-nav'

type StyledVerticalNavBgColorContainerProps = Pick<VerticalNavProps, 'backgroundColor'>

const StyledVerticalNavBgColorContainer = styled.div<StyledVerticalNavBgColorContainerProps>`
  position: relative;
  block-size: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ backgroundColor }) => backgroundColor && `background-color:${backgroundColor};`}
`

export default StyledVerticalNavBgColorContainer
