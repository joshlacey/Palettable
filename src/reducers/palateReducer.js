export default function palateReducer(state={ palate: "", saving: false }, action) {
  switch (action.type) {
    case "PALATE_SAVED":
        return {...state, palate: action.payload, saving: false }
    case "SAVING_PALATE":
        return {...state, saving: true}
    default:
      return state
  }
}
