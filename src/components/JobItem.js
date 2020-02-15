import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { parseCategories } from "../util/Functions";

// Redux
import { connect } from "react-redux";
import { openModal } from "../redux/actions/jobActions";

// Components
import CustomButton from "./CustomButton";

// MUI
import EditIcon from "@material-ui/icons/Edit";

// Hooks
import { useSelectedJob } from '../hooks/jobHooks';

const JobItem = ({ openModal, match: { params: { jobId } }, categories, }) => {

  const handleEdit = () => openModal({ show: true, edit: true });

  const selectedJob = useSelectedJob(jobId);

  const {
    title,
    company,
    email,
    image,
    description,
    categories: jobCategories
  } = selectedJob || {};

  const categoriesToDisplay = parseCategories(
    jobCategories,
    categories
  );

  return (
    <section>
      <JobItemContainer>
        <div>
          <h2>{title}</h2>
          {categoriesToDisplay && (
            <ul style={{ listStyleType: "square" }}>
              {categoriesToDisplay.map(cat => (
                <li key={cat.id}>{cat.name}</li>
              ))}
            </ul>
          )}
          <p>{description}</p>
          <h4>{company}</h4>
          <h4>{email}</h4>
        </div>
        {image && <img src={image} alt="Job" />}
        <div>
          {selectedJob && <CustomButton title="Edit" onClick={handleEdit}>
            <EditIcon color="primary" />
          </CustomButton>}
        </div>
      </JobItemContainer>
    </section>
  );
}

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
    width: 50%;
    max-width: 500px;
    margin: 0 25px;
  }
`;

const mapStateToProps = ({
  category: { categories }
}) => ({
  categories
});

export default connect(
  mapStateToProps,
  { openModal }
)(withRouter(JobItem));
