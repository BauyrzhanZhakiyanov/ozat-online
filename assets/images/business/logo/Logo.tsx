import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Logo = (props: SvgProps) => (
  <Svg id="Layer_1" x={0} y={0} viewBox="0 0 152 59" {...props}>
    <Path d="M41 40.6 70.3 3.9H43.2V0h35.3L49.3 36.6h27.1v3.9l-35.4.1zM117.8 40.6h-4.4L98.2 9.5 83 40.6h-4.4L98.2 0l19.6 40.6zM124.3 0h18.5v3.9h-14.5v36.6h-4V0zM65.2 59c-1.1 0-2.1-.2-3.2-.6s-1.8-1.1-2.6-1.8c-.8-.8-1.4-1.7-1.8-2.6-.5-1.1-.6-2-.6-3.2 0-1.1.2-2.1.6-3.2.5-.9 1.1-1.8 1.8-2.6.8-.8 1.7-1.4 2.6-1.8 1.1-.5 2.1-.6 3.2-.6s2.1.2 3.2.6c1.1.5 1.8 1.1 2.6 1.8.8.8 1.4 1.7 1.8 2.6.5.9.6 2 .6 3.2 0 1.1-.2 2.1-.6 3.2-.5 1.1-1.1 1.8-1.8 2.6-.8.8-1.7 1.4-2.6 1.8-1 .4-2.1.6-3.2.6zm0-14.7c-.9 0-1.7.2-2.6.5-.8.3-1.5.8-2.1 1.4-.6.6-1.1 1.4-1.4 2.1-.3.8-.5 1.7-.5 2.6 0 .9.2 1.7.5 2.6.3.8.8 1.5 1.4 2.1.6.6 1.2 1.1 2.1 1.4.8.3 1.7.5 2.6.5s1.7-.2 2.6-.5c.8-.3 1.5-.8 2.1-1.4.6-.6 1.1-1.4 1.4-2.1.3-.8.6-1.7.6-2.6s-.2-1.7-.6-2.6c-.3-.8-.8-1.5-1.4-2.1s-1.2-1.1-2.1-1.4c-.9-.4-1.7-.5-2.6-.5zM77.2 59V42.6l12 12.4V44.7l1.7-2.1V59l-12-12.4v10.3L77.2 59zM94.1 59V42.6h1.7v14.9h9.1V59H94.1zM109.4 42.6V59h-1.7V42.6h1.7zM114 59V42.6L126 55V44.7l1.7-2.1V59l-12-12.4v10.3L114 59zM132.3 42.6h10.6v1.5h-10.6v-1.5zm0 7.5h9.2v1.5h-9.2v-1.5zm0 7.4h10.6V59h-10.6v-1.5z" />
    <Path d="M40.9 20.5c0 2.8-.6 5.5-1.6 7.9S36.8 33 35 34.9c-1.9 1.9-4 3.3-6.5 4.3-2.4 1-5.1 1.6-7.9 1.6s-5.5-.6-7.9-1.6c-2.4-1.1-4.6-2.5-6.5-4.4s-3.3-3.9-4.4-6.5C.7 26 .2 23.3.2 20.5s.6-5.5 1.6-7.9S4.2 8 6.1 6.2c1.9-1.9 4-3.3 6.5-4.3C15 .8 17.7.2 20.5.2s5.5.6 7.9 1.6c1.9.8 3.6 1.8 5.1 3.1l-2.9 2.9c-1.1-.9-2.4-1.7-3.9-2.3-2-.8-4-1.3-6.3-1.3-2.2 0-4.3.5-6.3 1.3s-3.8 2.1-5.2 3.6c-1.5 1.5-2.6 3.2-3.6 5.3-.8 2-1.3 4-1.3 6.3 0 2.2.5 4.3 1.3 6.3s2.1 3.8 3.6 5.3 3.2 2.7 5.2 3.6 4 1.3 6.3 1.3c2.2 0 4.3-.5 6.3-1.3s3.8-2.1 5.2-3.6c1.5-1.5 2.6-3.2 3.6-5.3.8-2 1.3-4 1.3-6.3 0-2.2-.5-4.3-1.3-6.3-.1-.3-.3-.6-.4-.8 1.1-.8 2.3-1.4 3.5-2.2.2.4.4.8.6 1.3 1.1 2.3 1.7 5 1.7 7.8z" />
    <Path d="M20.5 20.4 40.8.1v8c-6.8 4.1-13.5 8.3-20.3 12.3z" />
    <Path d="M30.6 20.5c0 5.6-4.5 10.1-10.1 10.1-3.1 0-5.9-1.4-7.8-3.7-.2-.3-.4-.5-.6-.8-1.1-1.6-1.8-3.6-1.8-5.7 0-5.6 4.5-10.1 10.1-10.1 2.1 0 4 .7 5.7 1.8L23.2 15c-.8-.5-1.8-.7-2.8-.7-3.4 0-6.2 2.7-6.2 6.2 0 1 .3 2 .7 2.8.3.6.7 1.1 1.1 1.6 1.1 1.1 2.6 1.8 4.3 1.8 3.4 0 6.2-2.7 6.2-6.2 0-.7-.1-1.2-.3-1.8 1.1-.7 2.3-1.4 3.5-2.1.7 1.3.9 2.6.9 3.9z" />
  </Svg>
)
export default Logo