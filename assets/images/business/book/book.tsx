import * as React from 'react'
import Svg, { Defs, G, Image, Path, Pattern, Use } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */ const SvgComponent =
  () => (
    <Svg width={101} height={101} fill="none">
      <G filter="url(#a)">
        <Path fill="url(#b)" d="M4 4h93v93H4z" />
      </G>
      <Defs>
        <Pattern
          id="b"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <Use xlinkHref="#c" transform="scale(.0005)" />
        </Pattern>
        <Image
          id="c"
          width={2000}
          height={2000}
        />
      </Defs>
    </Svg>
  )
export default SvgComponent