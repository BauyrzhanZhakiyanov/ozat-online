import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const RightArrow = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="m9 18 6-6-6-6"
    />
  </Svg>
)
export default RightArrow
