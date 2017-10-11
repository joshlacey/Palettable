export default function imageReducer(state={ imageUrl: "", colors: {} }, action) {
  switch (action.type) {
    case "UPLOAD_IMG":
      return { ...state, imageURL: action.payload }
    case "FETCHED_COLORS":
      console.log("playload")
      return { ...state, colors: action.payload }
    default:
      return state
  }
}
