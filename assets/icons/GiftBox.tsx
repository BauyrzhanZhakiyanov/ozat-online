import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const GiftBox = (props: SvgProps) => (
  <Svg width={19} height={19} fill="none" {...props}>
    <Path
      fill="#F9F9F9"
      fillRule="evenodd"
      d="M15.25 4.354A2.98 2.98 0 0 0 9.5 3.258a2.98 2.98 0 0 0-5.585 2.075h-.54a2 2 0 0 0-2 2V8.5a2 2 0 0 0 1.583 1.957v4.168a3 3 0 0 0 3 3h7.084a3 3 0 0 0 3-3v-4.168A2 2 0 0 0 17.625 8.5V7.333a2 2 0 0 0-2-2h-.54c.107-.306.165-.636.165-.979Zm-2.978.98a.98.98 0 1 0-.98-.98v.98h.98Zm-1.772 2V8.5h5.125V7.333H10.5Zm-3.77 0H8.5V8.5H3.375V7.333h3.354Zm.978-2.98v.98H6.73a.98.98 0 1 1 .98-.98Zm-2.75 10.271V10.5H8.5v5.125H5.958a1 1 0 0 1-1-1ZM10.5 10.5v5.125h2.542a1 1 0 0 0 1-1V10.5H10.5Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default GiftBox
