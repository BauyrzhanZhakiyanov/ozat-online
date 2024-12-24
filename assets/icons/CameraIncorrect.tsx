import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const Camera = (props: SvgProps) => (
  <Svg width={24} height={16} fill="none" {...props}>
    <Path
      fill="#FF2C20"
      d="M0 3.75A3.75 3.75 0 0 1 3.75 0h8.5A3.75 3.75 0 0 1 16 3.75v8.5A3.75 3.75 0 0 1 12.25 16h-8.5A3.75 3.75 0 0 1 0 12.25v-8.5Zm21.252 10.933L17 11.747V4.25l4.252-2.936c1.16-.802 2.744.03 2.744 1.44v10.49c0 1.41-1.583 2.24-2.744 1.439Z"
    />
  </Svg>
)
export default Camera
