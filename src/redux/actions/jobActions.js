const API_URL =
  "https://us-central1-react-job-post-functions.cloudfunctions.net/api";

export const getAllJobs = () => dispatch => {
  fetch(`${API_URL}/jobs`)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: "SET_JOBS",
        payload: data
      })
    );
};

export const getJobById = jobId => dispatch => {
  fetch(`${API_URL}/job/${jobId}`)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: "SET_JOB",
        payload: data
      })
    );
};

export const postJob = job => dispatch => {
  fetch(`${API_URL}/job`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(job)
  })
    .then(res => res.json())
    .then(payload =>
      dispatch({
        type: "ADD_JOB",
        payload
      })
    )
    .finally(() => {
      dispatch({
        type: "TOGGLE_MODAL",
        payload: false
      });
    });
};

export const showModal = show => dispatch => {
  dispatch({
    type: "TOGGLE_MODAL",
    payload: show
  });
};
