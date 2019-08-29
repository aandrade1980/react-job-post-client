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
  const data = new FormData();

  data.append("title", job.title);
  data.append("company", job.company);
  data.append("email", job.email);
  data.append("description", job.description);
  job.image && data.append("image", job.image, job.image.name);

  const postOptions = {
    method: "POST",
    body: data
  };

  fetch(`${API_URL}/job`, postOptions)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: "ADD_JOB",
        payload: data
      })
    )
    .finally(() => {
      dispatch({
        type: "TOGGLE_MODAL",
        payload: false
      });
    });
};

export const deleteJob = jobId => dispatch => {
  fetch(`${API_URL}/job/${jobId}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() =>
      dispatch({
        type: "DELETE_JOB",
        payload: jobId
      })
    );
};

export const showModal = show => dispatch => {
  dispatch({
    type: "TOGGLE_MODAL",
    payload: show
  });
};
