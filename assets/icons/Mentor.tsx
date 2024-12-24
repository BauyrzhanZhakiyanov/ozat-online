import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const Mentor = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="#0A0A0A"
      fillOpacity={0.8}
      fillRule="evenodd"
      d="M6.333 5.333a3 3 0 0 1 3-3h13.334a3 3 0 0 1 3 3V11H19v12.667h6.667v3.666a1 1 0 0 1-1 1h-5.019a3 3 0 0 0-2.981-2.666h-1.334a3 3 0 0 0 0 6h1.334c1.04 0 1.956-.53 2.494-1.334h5.506a3 3 0 0 0 3-3v-4.171A2.997 2.997 0 0 0 29 20.666V14c0-1.04-.53-1.957-1.333-2.495V5.333a5 5 0 0 0-5-5H9.333a5 5 0 0 0-5 5v6.172A2.997 2.997 0 0 0 3 14v6.667a3 3 0 0 0 3 3h7V11H6.333V5.333Zm-1.078 8h1.078V13H11v8.667H6a1 1 0 0 1-1-1V14c0-.256.096-.49.255-.667ZM25.667 13v.333h1.078c.159.177.255.41.255.667v6.667c0 .256-.096.49-.255.666h-1.078v.334H21V13h4.667Zm-8 15.667a1 1 0 0 1-1 1h-1.334a1 1 0 1 1 0-2h1.334a1 1 0 0 1 1 1Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Mentor
