import { useSelector } from 'react-redux';

export const useSelectedJob = jobId => {
    const job = useSelector(state =>
        state.job.jobs && state.job.jobs.filter(job => job.jobId === jobId)[0]
    )
    return job;
}
