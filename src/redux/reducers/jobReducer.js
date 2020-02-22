const initialState = {
  jobs: null,
  currentJob: {},
  modal: { show: false, edit: false },
  loading: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case "SET_JOBS":
      return {
        ...state,
        jobs: payload,
        filteredJobs: payload,
        currentJob: {}
      };
    case "SET_JOB":
      return {
        ...state,
        currentJob: payload
      };
    case "SET_FILTERED_JOBS":
      return {
        ...state,
        filteredJobs: payload.length === 0 ? state.jobs : state.jobs.filter(job => {
          const categories = job.categories && !Array.isArray(job.categories) ? job.categories.split(',') : job.categories ? job.categories : []
          return categories.some(cat => payload.includes(cat))
        })
      };
    case "ADD_JOB":
      return {
        ...state,
        jobs: state.jobs ? [payload, ...state.jobs] : [payload]
      };
    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter(job => job.jobId !== payload)
      };
    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map(job => {
          if (job.jobId !== payload.jobId) {
            return job;
          }
          return {
            ...payload
          };
        }),
        currentJob: payload
      };
    case "RE_ORDER_JOBS":
      const filterJobs = state.jobs.filter(
        job => job.jobId !== payload.items.draggedItem.jobId
      );

      filterJobs.splice(
        payload.position,
        0,
        payload.items.draggedItem
      );

      return {
        ...state,
        jobs: filterJobs
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: payload
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
}
