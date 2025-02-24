// import React from 'react'
import ProgressBarComponent from './ProgressBarComponent'
import ColorComponent from './ColorComponent'
import TextureComponent from './TextureComponent'
import { vreeStore } from '../VreeStore'
import Frame from './utils/Frame'

const FrameComponent = () => {
  return (
    <div>
        <TextureComponent selectedSection="frame"/>
        <ColorComponent selectedSection="frame"/>
        <ProgressBarComponent value ={vreeStore.frameMetalness} onChange={Frame.updateFrameMetalness} />
      
    </div>
  )
}

export default FrameComponent
