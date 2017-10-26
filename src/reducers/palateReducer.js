export default function palateReducer(state={ palate: "", title: "", note: "", screenShot: false, saving: false, current: [], otherPalate: [] }, action) {
  switch (action.type) {
    case "PALATE_SAVED":
        return {...state, palate: action.payload, saving: false, title: "", note: "" }
    case "SAVING_PALATE":
        console.log("savingstate", state)
        return {...state, saving: true}
    case "UPDATE_PALATE":
        return {...state, current: action.payload }
    case "ADD_TO_PALATE":
        const somethingelse = [...state.otherPalate, action.payload]
        const something = {...state, otherPalate: somethingelse }
        return something
    case "RESET_PALATE":
        return {...state, otherPalate: action.payload }
    case "SCREENSHOT":
        return {...state, screenShot: !state.screenShot}
    case "TITLE":
        return {...state, title: action.payload }
    case "NOTE":
        return {...state, note: action.payload}
    case "UPDATE_TITLE_NOTE":
        return {...state, note: "", title: ""}
    case "REMOVE_PALATE_ELS":
        return {...state, otherPalate: []}
    default:
      return state
  }
}
