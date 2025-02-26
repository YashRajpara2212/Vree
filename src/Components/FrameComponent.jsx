// import React from 'react'
import ProgressBarComponent from './ProgressBarComponent'
import ColorComponent from './ColorComponent'
import TextureComponent from './TextureComponent'
import { vreeStore } from '../VreeStore'
import Frame from './utils/Frame'
import { observer } from 'mobx-react'

const FrameComponent = observer(() => {
  return (
    <div>
        <TextureComponent selectedSection="frame"/>
        <ColorComponent selectedSection="frame"/>
        <div className={` text-xl font-bold mb-10 ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>Material Properties</div>
        <ProgressBarComponent name="Metallic" value ={vreeStore.frameMetalness} onChange={Frame.updateFrameMetalness} />
        <ProgressBarComponent name="Roughness" value ={vreeStore.frameRoughness} onChange={Frame.updateFrameRoughness} />
        <ProgressBarComponent  name="Transparency" value ={vreeStore.frameTransparency} onChange={Frame.updateFrameTransparency} />
      
    </div>
  )
})

export default FrameComponent
