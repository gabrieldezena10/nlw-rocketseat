declare module '*.png'

// react native github - declaration
//diz que importação svg são válidas no react-native
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}