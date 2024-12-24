import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const LeftArrow = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="m15 6-6 6 6 6"
    />
  </Svg>
)
export default LeftArrow
