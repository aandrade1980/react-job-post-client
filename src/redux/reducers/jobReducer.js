const initialState = {
  jobs: null,
  currentJob: {},
  modal: { show: false, edit: false },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_JOBS":
      return {
        ...state,
        jobs: action.payload,
        currentJob: {}
      };
    case "SET_JOB":
      return {
        ...state,
        currentJob: action.payload
      };
    case "ADD_JOB":
      return {
        ...state,
        jobs: state.jobs ? [action.payload, ...state.jobs] : [action.payload]
      };
    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter(job => job.jobId !== action.payload)
      };
    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map(job => {
          if (job.jobId !== action.payload.jobId) {
            return job;
          }
          return {
            ...action.payload
          };
        }),
        currentJob: action.payload
      };
    case "RE_ORDER_JOBS":
      const filterJobs = state.jobs.filter(
        job => job.jobId !== action.payload.items.draggedItem.jobId
      );

      filterJobs.splice(
        action.payload.position,
        0,
        action.payload.items.draggedItem
      );

      return {
        ...state,
        jobs: filterJobs
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: action.payload
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
