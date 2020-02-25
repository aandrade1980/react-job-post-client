import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "../App.scss";

// Redux
import { connect } from "react-redux";
import { deleteJob } from "../redux/actions/jobActions";

// Components
import CustomButton from "./CustomButton";

// MUI
import DeleteIcon from "@material-ui/icons/Delete";

const JobCard = ({
  job: { jobId, title, image, createdAt },
  history,
  deleteJob,
  setDraggedItem,
  setSpans,
  job
}) => {
  dayjs.extend(relativeTime);

  const imageRef = useRef(null);

  const calculateSpans = useCallback(() => {
    const height =
      imageRef && imageRef.current && imageRef.current.clientHeight;
    const spans = Math.ceil(height / 80 + 1);

    setSpans({ [jobId]: spans });
  }, [setSpans, jobId]);

  useEffect(() => {
    const img = imageRef && imageRef.current;

    img && img.addEventListener("load", calculateSpans);
    return () => img && img.removeEventListener("load", calculateSpans);
  }, [calculateSpans]);

  const goToJob = () => history.push(`/job/${jobId}`);

  const handleClick = evt => {
    evt.stopPropagation();
    deleteJob(jobId);
  };

  const onDragStart = evt => {
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("text", "anything");
    setDraggedItem(job);
  };

  const onDrop = evt => evt.preventDefault();

  return (
    <JobItemContainer
      onClick={goToJob}
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
    >
      <h3 className="ellipsis">{title}</h3>
      <div className="dayjs-container">
        <span>({dayjs(createdAt).fromNow()})</span>
      </div>
      <CustomButton title="Delete" onClick={handleClick}>
        <DeleteIcon color="error" />
      </CustomButton>
      {image && <img ref={imageRef} src={image} alt="Job" />}
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
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  img {
    max-width: 100%;
    margin-top: 10px;
  }
  h3 {
    text-align: center;
    margin-left: 40px;
    margin-right: 40px;
  }
  button {
    position: absolute;
    top: 1px;
    right: 1px;
  }
  .dayjs-container {
    display: flex;
    justify-content: center;
    margin-top: -15px;
    font-size: 14px;
  }
`;

export default connect(null, { deleteJob })(withRouter(JobCard));
