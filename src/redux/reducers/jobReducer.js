const initialState = {
  jobs: null,
  currentJob: {},
  modal: { show: false, edit: false },
  loading: false
};

export default function jobReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_JOBS':
      return {
        ...state,
        jobs: payload,
        filteredJobs: payload,
        currentJob: {}
      };
    case 'SET_JOB':
      return {
        ...state,
        currentJob: payload
      };
    case 'SET_FILTERED_JOBS':
      return {
        ...state,
        filteredJobs:
          payload.length === 0
            ? state.jobs
            : state.jobs.filter(job => {
                const categories =
                  job.categories && !Array.isArray(job.categories)
                    ? job.categories.split(',')
                    : job.categories
                    ? job.categories
                    : [];
                return categories.some(cat => payload.includes(cat));
              })
      };
    case 'ADD_JOB':
      const updatedJobs = state.jobs ? [payload, ...state.jobs] : [payload];
      return {
        ...state,
        jobs: updatedJobs,
        filteredJobs: updatedJobs
      };
    case 'DELETE_JOB':
      const newJobList = state.jobs.filter(({ jobId }) => jobId !== payload);
      return {
        ...state,
        jobs: newJobList,
        filteredJobs: newJobList
      };
    case 'UPDATE_JOB':
      const updatedJob = state.jobs.map(job => {
        if (job.jobId !== payload.jobId) {
          return job;
        }
        return {
          ...payload
        };
      });
      return {
        ...state,
        jobs: updatedJob,
        filteredJobs: updatedJob,
        currentJob: payload
      };
    case 'RE_ORDER_JOBS':
      const filteredJobs = state.jobs.filter(
        ({ jobId }) => jobId !== payload.items.draggedItem.jobId
      );

      filteredJobs.splice(payload.position, 0, payload.items.draggedItem);

      return {
        ...state,
        jobs: filteredJobs,
        filteredJobs
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
}
