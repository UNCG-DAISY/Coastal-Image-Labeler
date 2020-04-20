import isCheckboxAllowedToContinue from './isCheckboxAllowedToContinue'

function getAllowNextStepVar() {
    

    return [
      getAllowNextStepVar.tagState.waterOrOther,
      getAllowNextStepVar.tagState.devType,
      getAllowNextStepVar.tagState.washoverType,
      getAllowNextStepVar.isCheckboxAllowedToContinue(getAllowNextStepVar.tagState.impactType,1),
      getAllowNextStepVar.isCheckboxAllowedToContinue(getAllowNextStepVar.tagState.terrianType,0),
      getAllowNextStepVar.tagState.damageType
    ]
}
getAllowNextStepVar.isCheckboxAllowedToContinue = isCheckboxAllowedToContinue
export default getAllowNextStepVar