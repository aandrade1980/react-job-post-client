import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { parseCategories } from '../util/Functions';

// Redux
import { connect } from 'react-redux';
import { openModal, setSelectedJob } from '../redux/actions/jobActions';

// Components
import CustomButton from './CustomButton';
import { components } from '../util/Contants';

// MUI
import EditIcon from '@material-ui/icons/Edit';

// Hooks
import { useJobById } from '../hooks/jobHooks';

const JobItem = ({
  openModal,
  match: {
    params: { jobId }
  },
  categories,
  setSelectedJob
}) => {
  const selectedJob = useJobById(jobId);

  useEffect(() => {
    setSelectedJob(selectedJob);
  }, [selectedJob, setSelectedJob]);

  const handleEdit = () =>
    openModal({ show: true, edit: true, component: components['newJobForm'] });

  const {
    title,
    postedDate,
    company,
    email,
    image,
    description,
    categories: jobCategories
  } = selectedJob || {};

  const categoriesToDisplay = parseCategories(jobCategories, categories).filter(
    cat => !!cat
  );

  return (
    <section>
      <JobItemContainer>
        <div>
          <h2>{title}</h2>
          {postedDate && (
            <h4>{`Posted On: ${dayjs(postedDate).format('DD/MM/YYYY')}`}</h4>
          )}
          {categoriesToDisplay && (
            <ul style={{ listStyleType: 'square' }}>
              {categoriesToDisplay.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          )}
          <p>{description}</p>
          <h4>{company}</h4>
          <h4>{email}</h4>
        </div>
        {image && <img src={image} alt="Job" />}
        <div>
          {selectedJob && (
            <CustomButton title="Edit" onClick={handleEdit}>
              <EditIcon color="primary" />
            </CustomButton>
          )}
        </div>
      </JobItemContainer>
    </section>
  );
};

const JobItemContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
  div {
    max-width: 33%;
    p {
      white-space: pre-wrap;
    }
  }
  img {
    height: auto;
    max-width: 500px;
    margin: 0 25px;
  }
`;

const mapStateToProps = ({ category: { categories } }) => ({
  categories
});

export default connect(mapStateToProps, { openModal, setSelectedJob })(
  withRouter(JobItem)
);
