import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface LeftArrowColoredProps extends SvgProps {
  color?: string
}
const LeftArrowColored = ({
  color = '#F7931E',
  ...props
}: LeftArrowColoredProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default LeftArrowColored
