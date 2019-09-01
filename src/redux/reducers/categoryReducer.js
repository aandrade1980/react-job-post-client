const initialState = {
  categories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [action.payload, ...state.categories]
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload)
      };
    default:
      return state;
  }
}
