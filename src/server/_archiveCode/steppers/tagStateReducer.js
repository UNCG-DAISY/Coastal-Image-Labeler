export default function tagStateReducer(state, action) {
    switch (action.type) {
      case 'updateRadio':
        return {
          ...state,
          [action.key]: action.value
        }
      case 'updateImpact':
        return {
          ...state,
          impactType: {
            ...state.impactType,
            [action.key]:action.value
          }
        };
      case 'updateTerrian':
        return {
          ...state,
          terrianType: {
            ...state.terrianType,
            [action.key]:action.value
          }
        };
      default:
        throw new Error();
    }
  }