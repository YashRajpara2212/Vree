// import React from 'react'
import ProgressBarComponent from './ProgressBarComponent'
import ColorComponent from './ColorComponent'
// import TextureComponent from './TextureComponent'
import { vreeStore } from '../VreeStore'
import Lenses from './utils/Lenses'
import { observer } from 'mobx-react'
const LensesComponent = observer(() => {
  return (
    <div>
        
        <ColorComponent selectedSection="lense"/>
        <div className={` text-xl font-bold mb-10 ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>Material Properties</div>
        <ProgressBarComponent name="Transparency" value ={vreeStore.lensTransparency} onChange={Lenses.updateLensesTransparency} />
      
    </div>
  )
})

export default LensesComponent
