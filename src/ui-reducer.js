import * as types from './utils/actionTypes';

const initialState = {
  loaders: {
    myPalettes: false
  },
  paletteColorsUsedTracker: []
};

export default function(state = initialState, action) {
  let loader;
  let newColor;
  let nextTracker;
  switch (action.type) {
    case types.LOADING: {
      loader = action.loader;
      const loaders = { ...state.loaders, [loader]: !state.loaders[loader] };
      return {
        ...state,
        loaders
      };
    }
    case types.ADD_COLOR:
      newColor =
        action.payload !== '' &&
        !state.paletteColorsUsedTracker.includes(action.payload)
          ? action.payload
          : null;
      if (!newColor) return state;
      return {
        ...state,
        paletteColorsUsedTracker: [...state.paletteColorsUsedTracker, newColor]
      };
    case types.REMOVE_COLORS:
      return { ...state, paletteColorsUsedTracker: [] };
    case types.REMOVE_ONE_COLOR:
      nextTracker = [...state.paletteColorsUsedTracker].filter(
        color => color !== action.payload
      );
      return { ...state, paletteColorsUsedTracker: nextTracker };
    default:
      return state;
  }
}
