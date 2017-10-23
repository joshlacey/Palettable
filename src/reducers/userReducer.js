export default function userReducer( state={ loading: false, myPalates: [], user: {}, updateAfterDelete: false, palates: [] }, action) {
  switch (action.type) {
    case "LOGGING_IN":
      return state
    case "LOGGED_IN":
      return { ...state, user: action.payload }
    case "LOGGING_OUT":
      return { ...state, user: {}}
    case "FETCHED_MY_PALATES":
      return { ...state, myPalates: [...state.myPalates, ...action.payload]}
    case "LOADING":
      return { ...state, loading: true}
    case "UPDATE_MY_PALATES":
      return { ...state, palates: action.payload, loading: false}
    default:
      return state
  }
}
