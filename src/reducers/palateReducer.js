export default function palateReducer(state={ palate: "", title: "", note: "", saving: false, palateEls: [] }, action) {
  switch (action.type) {
    case "PALATE_SAVED":
        return {...state, palate: action.payload, saving: false, title: "", note: "" }
    case "SAVING_PALATE":
        return {...state, saving: true}
    case "ADD_TO_PALATE":
        const newPalateEls = [...state.palateEls, action.payload]
        return {...state, palateEls: newPalateEls }
    case "RESET_PALATE":
        return {...state, palateEls: action.payload }
    case "TITLE":
        return {...state, title: action.payload }
    case "NOTE":
        return {...state, note: action.payload}
    case "UPDATE_TITLE_NOTE":
        return {...state, note: "", title: ""}
    case "REMOVE_PALATE_ELS":
        return {...state, palateEls: []}
    default:
      return state
  }
}
