import { API_URL } from '../../util/Contants';

import { toastMessage } from './toastActions';

export const getAllJobs = () => dispatch =>
  fetch(`${API_URL}/jobs`)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: 'SET_JOBS',
        payload: data
      })
    );

export const getJobById = jobId => dispatch =>
  fetch(`${API_URL}/job/${jobId}`)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: 'SET_JOB',
        payload: data
      })
    );

export const postJob = job => dispatch => {
  dispatch({
    type: 'SET_LOADING',
    payload: true
  });
  const data = new FormData();

  data.append('title', job.title);
  data.append('company', job.company);
  data.append('email', job.email);
  data.append('description', job.description);
  data.append('categories', job.categories);
  data.append('postedDate', job.postedDate);
  job.image && data.append('image', job.image, job.image.name);

  const postOptions = {
    method: 'POST',
    body: data
  };

  fetch(`${API_URL}/job`, postOptions)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'ADD_JOB',
        payload: data
      });
      dispatch({
        type: 'SET_LOADING',
        payload: false
      });
    })
    .finally(() => {
      dispatch({
        type: 'TOGGLE_MODAL',
        payload: false
      });
    });
};

export const deleteJob = jobId => async dispatch => {
  try {
    const response = await fetch(`${API_URL}/job/${jobId}`, {
      method: 'DELETE'
    });
    const JsonResponse = await response.json();
    dispatch({
      type: 'DELETE_JOB',
      payload: jobId
    });
    dispatch(
      toastMessage(JsonResponse.message, true, 2000, false, 'top-center')
    );
  } catch (error) {
    console.log('Delete Job Error: ', error);
  }
};

export const updateJob = updatedJob => async dispatch => {
  dispatch({
    type: 'SET_LOADING',
    payload: true
  });
  const data = await fetch(`${API_URL}/job/${updatedJob.jobId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedJob),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const response = await data.json();

  if (data.status === 200) {
    dispatch({
      type: 'UPDATE_JOB',
      payload: updatedJob
    });

    dispatch(toastMessage(response.message));
  } else {
    console.log('Error updating job: ', response.error);
    dispatch(
      toastMessage(response.error, true, false, false, 'top-center', 'error')
    );
  }

  dispatch({
    type: 'SET_LOADING',
    payload: false
  });

  dispatch({
    type: 'TOGGLE_MODAL',
    payload: { show: false, edit: false }
  });
};

export const reOrderJobs = (items, position) => dispatch =>
  dispatch({ type: 'RE_ORDER_JOBS', payload: { items, position } });

export const openModal = options => dispatch =>
  dispatch({
    type: 'TOGGLE_MODAL',
    payload: options
  });

export const setSelectedJob = job => dispatch =>
  dispatch({
    type: 'SET_JOB',
    payload: job
  });

export const setFilteredJobs = categories => dispatch =>
  dispatch({
    type: 'SET_FILTERED_JOBS',
    payload: categories
  });
