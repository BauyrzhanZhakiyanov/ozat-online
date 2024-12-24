import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const Incorrect = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="#FF2C20"
      fillRule="evenodd"
      d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Zm-7.293-4.707a1 1 0 0 1 0 1.414L17.414 16l3.293 3.293a1 1 0 0 1-1.414 1.414L16 17.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L14.586 16l-3.293-3.293a1 1 0 0 1 1.414-1.414L16 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Incorrect
