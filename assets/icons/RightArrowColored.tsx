import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface RightArrowColoredProps extends SvgProps {
  color?: string
}
const RightArrowColored = ({
  color = '#F7931E',
  ...props
}: RightArrowColoredProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default RightArrowColored
