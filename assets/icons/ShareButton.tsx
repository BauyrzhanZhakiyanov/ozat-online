import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const ShareButton = (props: SvgProps) => (
  <Svg width={33} height={33} fill="none" {...props}>
    <Path
      fill="#18BA18"
      fillRule="evenodd"
      d="M5.5 8.875a2 2 0 0 1 2-2h5.644a2 2 0 0 1 1.11.336l3.117 2.078a2 2 0 0 0 1.11.336H25.5a2 2 0 0 1 2 2v12.5a2 2 0 0 1-2 2h-18a2 2 0 0 1-2-2V8.875Zm5.875 9a1 1 0 0 1 1-1h5.836l-2.418-2.418a1 1 0 0 1 1.414-1.414l4.125 4.125.707.707-.707.707-4.125 4.125a1 1 0 0 1-1.414-1.414l2.418-2.418h-5.836a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ShareButton
