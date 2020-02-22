import { useSelector } from 'react-redux';

export const useJobById = jobId =>
    useSelector(state =>
        state.job.jobs && state.job.jobs.filter(job => job.jobId === jobId)[0]
    )
