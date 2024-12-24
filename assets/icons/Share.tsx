import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const Share = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M5 4a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0V4Zm9.293 13.707a1 1 0 0 1 0-1.414L17.586 13H8a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 1.414-1.414l5 5 .707.707-.707.707-5 5a1 1 0 0 1-1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Share
