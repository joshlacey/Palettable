export default function palateReducer(state={ palate: "", screenShot: false, saving: false, current: [], otherPalate: [] }, action) {
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
    case "RESET_PALATE":
        console.log("resettingpalate")
        return {...state, otherPalate: action.payload }
    case "SCREENSHOT":
        return {...state, screenShot: !state.screenShot}
    default:
      return state
  }
}
