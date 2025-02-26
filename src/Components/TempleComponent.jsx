// import React from 'react'
import ProgressBarComponent from './ProgressBarComponent'
import ColorComponent from './ColorComponent'
import TextureComponent from './TextureComponent'
import { vreeStore } from '../VreeStore'
import Temple from './utils/Temple'
import { observer } from 'mobx-react'

const TempleComponent = observer(() => {
  return (
    <div>
        <TextureComponent selectedSection="temple"/>
        <ColorComponent selectedSection="temple"/>
        <div className={` text-xl font-bold mb-10 ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>Material Properties</div>
        <ProgressBarComponent name="Metallic" value ={vreeStore.templeMetalness} onChange={Temple.updateTempleMetalness} />
        <ProgressBarComponent name="Roughness" value ={vreeStore.templeRoughness} onChange={Temple.updateTempleRoughness} />
        <ProgressBarComponent name="Transparency" value ={vreeStore.templeTransparency} onChange={Temple.updateTempleTransparency} />
      
    </div>
  )
})

export default TempleComponent
