// import React from 'react'
import ProgressBarComponent from './ProgressBarComponent'
import ColorComponent from './ColorComponent'
import TextureComponent from './TextureComponent'
import { vreeStore } from '../VreeStore'
import Temple from './utils/Temple'

const TempleComponent = () => {
  return (
    <div>
        <TextureComponent selectedSection="temple"/>
        <ColorComponent selectedSection="temple"/>
        
        <ProgressBarComponent name="Metallic" value ={vreeStore.templeMetalness} onChange={Temple.updateTempleMetalness} />
        <ProgressBarComponent name="Roughness" value ={vreeStore.templeRoughness} onChange={Temple.updateTempleRoughness} />
        <ProgressBarComponent name="Transparency" value ={vreeStore.templeTransparency} onChange={Temple.updateTempleTransparency} />
      
    </div>
  )
}

export default TempleComponent
