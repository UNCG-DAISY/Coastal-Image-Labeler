import handleCheckboxChange from './handleCheckboxChange'

import DevRadio from '../radio/imageTag/devRadio'
import WashoverRadio from '../radio/imageTag/washoverRadio'
// import ImpactRadio from '../radio/imageTag/impactRadio'
import DamageRadio from '../radio/imageTag/damageType'
import WaterOrOtherQuestions from './WaterOrOther'

import ImpactCheckbox from '../checkboxes/impactCheckbox'
import TerrianCheckbox from '../checkboxes/terrianCheckbox'

function getStepContent(stepIndex) {
    handleCheckboxChange.updateTagState = getStepContent.updateTagState

    let tagState = getStepContent.tagState
    let updateTagState = getStepContent.updateTagState
    switch (stepIndex) {
      case 0: 
        return (
          <WaterOrOtherQuestions/>
        )
      case 1:
        return (
            <DevRadio devType = {tagState.devType} update = {updateTagState}/>          
        );
      case 2:
        return (
            <WashoverRadio washoverType={tagState.washoverType} update = {updateTagState}/>      
        )
      case 3:
        return (
            // <ImpactRadio impactType={impactType} setImpactType={setImpactType} handleChange={handleChange}/>
            <ImpactCheckbox
              states = {tagState.impactType}
              howManyReq = {1}
              handleChange = {handleCheckboxChange}
              eventType = 'impact'
            />
        );
      case 4: 
        return (
          <TerrianCheckbox
            states = {tagState.terrianType}
            howManyReq = {0}
            handleChange = {handleCheckboxChange}
            eventType = 'terrian'
          />
        )
      case 5: 
        return (
          <DamageRadio damageType={tagState.damageType} update = {updateTagState}/>
        );
    //   case 2:
    //     return 'Select terrian type(s)';
      default:
        return 'Unknown stepIndex';
    }
}

export default getStepContent
