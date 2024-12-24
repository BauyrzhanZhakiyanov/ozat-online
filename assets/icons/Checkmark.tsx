import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const CheckMark = (props: SvgProps) => (
  <Svg width={36} height={36} fill="none" {...props}>
    <Path
      fill="#58CC02"
      fillRule="evenodd"
      d="M17.75 31.5c7.594 0 13.75-6.156 13.75-13.75S25.344 4 17.75 4 4 10.156 4 17.75 10.156 31.5 17.75 31.5Zm6.818-17.626a1 1 0 1 0-1.414-1.415l-6.932 6.932-3.876-3.876a1 1 0 0 0-1.414 1.414l4.583 4.584.707.707.707-.707 7.639-7.64Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CheckMark
