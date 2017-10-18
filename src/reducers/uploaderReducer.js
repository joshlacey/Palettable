export default function uploaderReducer(state={ imageUrl: "", colors: [], colorContainer: [],
         fetchingColors: false, color: "" }, action) {
  switch (action.type) {
    case "UPLOAD_IMG":
      return { ...state, imageURL: action.payload }
    case "FETCHING_COLORS":
      return { ...state, fetchingColors: true}
    case "FETCHED_COLORS":
      return { ...state, colors: action.payload, fetchingColors: false }
    case "ADD_COLORS":
      const temp = [ ...state.colorContainer, ...action.payload ]
      const unique = [ ...new Set(temp)]
      return { ...state, colorContainer: unique }
    case "ADD_COLOR":
      // const c = !state.colors.includes(action.payload) ? action.payload : ""
      // return {...state, color: c }
      return {...state, color: action.payload}
    case "REMOVE_COLORS":
      return { ...state, colorContainer: []}
    case "REMOVE_CURRENT_COLOR":
      return { ...state, color: ""}
    default:
      return state
  }
}
