export default function userReducer( state={ myPalates: [], user: {} }, action) {
  switch (action.type) {
    case "LOGGING_IN":
      return state
    case "LOGGED_IN":
      return { ...state, user: action.payload }
    case "LOGGING_OUT":
      return { ...state, user: {}}
    case "FETCHED_MY_PALATES":
      return { ...state, myPalates: [...state.myPalates, ...action.payload]}
    default:
      return state
  }
}
