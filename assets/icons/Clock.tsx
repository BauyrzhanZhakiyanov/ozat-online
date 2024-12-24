import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const Clock = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="#F7931E"
      fillRule="evenodd"
      d="M3.667 16C3.667 9.188 9.188 3.667 16 3.667c6.811 0 12.333 5.521 12.333 12.333 0 6.811-5.522 12.333-12.333 12.333-6.812 0-12.334-5.521-12.334-12.333ZM16 1.667C8.084 1.667 1.666 8.084 1.666 16S8.084 30.333 16 30.333c7.916 0 14.333-6.417 14.333-14.333S23.916 1.667 16 1.667ZM15.666 8a1 1 0 1 0-2 0v10.333h7.667a1 1 0 1 0 0-2h-5.666V8Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Clock
