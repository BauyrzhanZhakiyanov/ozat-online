import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg'

const HomeIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color ?? '#042F6E'}
        fillOpacity={props.fillOpacity ?? 1}
        d="M21.852 7.662 14.32 1.636C12.847.462 10.546.45 9.086 1.624L1.553 7.662C.47 8.525-.184 10.25.046 11.607l1.449 8.672c.334 1.944 2.14 3.474 4.106 3.474h12.191c1.944 0 3.784-1.565 4.118-3.485l1.449-8.672c.207-1.346-.449-3.071-1.507-3.934Zm-9.293 11.49a.869.869 0 0 1-.862.863.869.869 0 0 1-.863-.863v-3.45c0-.472.391-.863.863-.863.471 0 .862.391.862.863v3.45Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default HomeIcon
