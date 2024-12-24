import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const CheckCircle = (props: SvgProps) => (
  <Svg width={36} height={36} fill="none" {...props}>
    <Path
      fill="#BBB"
      fillRule="evenodd"
      d="M31.5 17.75c0 7.594-6.156 13.75-13.75 13.75S4 25.344 4 17.75 10.156 4 17.75 4 31.5 10.156 31.5 17.75Zm-19.21-6.454a1 1 0 0 1 1.414-.007l4.339 4.297 4.246-4.29a1 1 0 0 1 1.422 1.408l-4.798 4.846 4.796 4.825a1 1 0 1 1-1.419 1.41l-4.304-4.331-4.281 4.255a1 1 0 0 1-1.41-1.418l4.83-4.8-4.829-4.78a1 1 0 0 1-.007-1.415Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CheckCircle
