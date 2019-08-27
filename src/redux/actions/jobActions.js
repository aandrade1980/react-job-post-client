export const getAllJobs = () => dispatch => {
  fetch(
    "https://us-central1-react-job-post-functions.cloudfunctions.net/api/jobs"
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: "SET_JOBS",
        payload: data
      })
    );
};

export const getJobById = jobId => dispatch => {
  fetch(
    `https://us-central1-react-job-post-functions.cloudfunctions.net/api/job/${jobId}`
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: "SET_JOB",
        payload: data
      })
    );
};
