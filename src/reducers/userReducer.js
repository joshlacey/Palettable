export default function userReducer( state={ loggedIn: false, myPalates: [], user: {} }, action) {
  switch (action.type) {
    case "LOGGING_IN":
      return state
    case "LOGGED_IN":
      return { ...state, loggedIn: true, user: action.payload }
    case "LOGGING_OUT":
      return { ...state, loggedIn: false, user: {}}
    case "FETCHED_MY_PALATES":
      return { ...state, myPalates: [...state.myPalates, ...action.payload]}
    default:
      return state
  }
}
