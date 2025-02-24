// import React from 'react'
import ProgressBarComponent from './ProgressBarComponent'
import ColorComponent from './ColorComponent'
import TextureComponent from './TextureComponent'
import { vreeStore } from '../VreeStore'
import Lenses from './utils/Lenses'

const TempleComponent = () => {
  return (
    <div>
        
        <ColorComponent selectedSection="lense"/>
        <ProgressBarComponent value ={vreeStore.lensTransparency} onChange={Lenses.updateLensesTransparency} />
      
    </div>
  )
}

export default TempleComponent
