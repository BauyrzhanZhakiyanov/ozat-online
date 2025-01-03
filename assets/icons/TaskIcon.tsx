import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg'

const TaskIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color ?? '#042F6E'}
        fillOpacity={props.fillOpacity ?? 1}
        fillRule="evenodd"
        d="M7.416 3A4.983 4.983 0 0 0 7 5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c0-.711-.148-1.388-.416-2H18a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.416ZM12 14H9a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2Zm3-4H9a1 1 0 0 0-.117 1.993L9 12h6a1 1 0 0 0 0-2Zm-3-8a2.99 2.99 0 0 1 2.236 1c.428.478.704 1.093.755 1.772L15 5H9c0-.725.257-1.39.685-1.908L9.764 3c.55-.614 1.348-1 2.236-1Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default TaskIcon
