import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { deleteJob } from "../redux/actions/jobActions";

// Components
import CustomButton from "./CustomButton";

// MUI
import DeleteIcon from "@material-ui/icons/Delete";

const JobCard = ({ job: { title, image, jobId }, history, deleteJob }) => {
  const goToJob = () => {
    history.push(`/job/${jobId}`);
  };

  const handleClick = evt => {
    evt.stopPropagation();
    deleteJob(jobId);
  };

  return (
    <JobItemContainer onClick={goToJob}>
      <h3>{title}</h3>
      <CustomButton title="Delete" onClick={handleClick}>
        <DeleteIcon />
      </CustomButton>
      {image && <img src={image} alt="Job" />}
    </JobItemContainer>
  );
};

const JobItemContainer = styled.article`
  position: relative;
  width: 350px;
  height: fit-content;
  margin: 1rem 1rem;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  transition: 0.3s;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 4px 40px 0 rgba(0, 0, 0, 0.08);
  }
  img {
    max-width: 100%;
    margin-top: 10px;
  }
  h3 {
    text-align: center;
  }
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #e82727;
  }
`;

export default connect(
  null,
  { deleteJob }
)(withRouter(JobCard));
