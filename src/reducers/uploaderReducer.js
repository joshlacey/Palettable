export default function uploaderReducer(state={ imageUrl: "", fetchedColors: [], colorContainer: [],
         nextColors: [], fetchingColors: false, color: "" }, action) {
  switch (action.type) {
    case "UPLOAD_IMG":
      return { ...state, imageURL: action.payload }
    case "FETCHING_COLORS":
      return { ...state, fetchingColors: true}
    case "FETCHED_COLORS":
      return { ...state, fetchedColors: action.payload, fetchingColors: false }
    case "NOTHING_FETCHED":
      return { ...state, fetchingColors: false }
    case "ADD_COLORS":
      const next = action.payload.filter( item => item !== "" && !state.colorContainer.includes(item))
      return { ...state, nextColors: next, colorContainer: [ ...state.colorContainer, ...next] }
    case "ADD_COLOR":
      const c = !state.colorContainer.includes(action.payload) ? action.payload : null
      const newColorsContainer = c ? [ ...state.colorContainer, c ] : state.colorContainer
      return {...state, color: c, colorContainer: newColorsContainer }
    case "REMOVE_COLORS":
      return { ...state, colorContainer: [], fetchedColors: []}
    case "REMOVE_NEXTCOLORS":
      return { ...state, nextColors: [] }
    case "REMOVE_CURRENT_COLOR":
      return { ...state, color: ""}
    case "REMOVE_ONE_COLOR":
      const nextContainer = [...state.colorContainer].filter( color => color !== action.payload)
      return { ...state, colorContainer: nextContainer}
    default:
      return state
  }
}
