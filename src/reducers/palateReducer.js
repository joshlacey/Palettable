export default function palateReducer(state={ palate: "", saving: false, current: [], otherPalate: [] }, action) {
  switch (action.type) {
    case "PALATE_SAVED":
        return {...state, palate: action.payload, saving: false }
    case "SAVING_PALATE":
        return {...state, saving: true}
    case "UPDATE_PALATE":
        return {...state, current: action.payload }
    case "ADD_TO_PALATE":
        const somethingelse = [...state.otherPalate, action.payload]
        const something = {...state, otherPalate: somethingelse }
        return something
    default:
      return state
  }
}
