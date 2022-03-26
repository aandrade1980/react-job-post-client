const initialState = {
  show: false
};

export default function toastReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
