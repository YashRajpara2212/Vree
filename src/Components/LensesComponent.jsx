// import React from 'react'
import ProgressBarComponent from './ProgressBarComponent'
import ColorComponent from './ColorComponent'
// import TextureComponent from './TextureComponent'
import { vreeStore } from '../VreeStore'
import Lenses from './utils/Lenses'
import { observer } from 'mobx-react'
const TempleComponent = observer(() => {
  return (
    <div>
        
        <ColorComponent selectedSection="lense"/>
        <div className="text-white text-xl font-bold mb-10">Material Properties</div>
        <ProgressBarComponent name="Transparency" value ={vreeStore.lensTransparency} onChange={Lenses.updateLensesTransparency} />
      
    </div>
  )
})

export default TempleComponent
