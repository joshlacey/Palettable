export default function paleteReducer(state={ palete: "", saving: false }, action) {
  switch (action.type) {
    case "PALETE_SAVED":
        return {...state, palete: action.payload, saving: false }
    case "SAVING_PALETE":
        return {...state, saving: true}
    default:
      return state
  }
}
