const initialState = {
  categories: [],
  loading: false,
  success: false
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [action.payload, ...state.categories]
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload)
      };
    case 'TOGGLE_SPINNER':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
