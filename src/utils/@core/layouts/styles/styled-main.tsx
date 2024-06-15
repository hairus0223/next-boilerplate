import TemplateConfig from '@/utils/configs/template-configs'
import styled from '@emotion/styled'

type StyledMainProps = {
  isContentCompact: boolean
}

const StyledMain = styled.main<StyledMainProps>`
  padding: ${TemplateConfig.layoutPadding}px;
  ${({ isContentCompact }) =>
    isContentCompact &&
    `
    margin-inline: auto;
    max-inline-size: ${TemplateConfig.compactContentWidth}px;
  `}
`

export default StyledMain
