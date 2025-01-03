import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const CloseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#051532"
      d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414Z"
      opacity={0.4}
    />
  </Svg>
)
export default CloseIcon
