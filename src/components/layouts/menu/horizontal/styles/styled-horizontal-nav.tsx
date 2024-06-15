import styled from '@emotion/styled'
import { HorizontalNavProps } from '../horizontal-menu/horizontal-nav'

const StyledHorizontalNav = styled.div<Pick<HorizontalNavProps, 'customStyles'>>`
  inline-size: 100%;
  overflow: hidden;
  position: relative;
  ${({ customStyles }) => customStyles}
`

export default StyledHorizontalNav
