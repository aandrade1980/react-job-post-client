const initialState = {
  jobs: [],
  currentJob: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_JOBS":
      return {
        ...state,
        jobs: action.payload
      };
    case "SET_JOB":
      return {
        ...state,
        currentJob: action.payload
      };
    default:
      return state;
  }
}
