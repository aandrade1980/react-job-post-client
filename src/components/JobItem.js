import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// Redux
import { connect } from "react-redux";
import { getJobById } from "../redux/actions/jobActions";

class JobItem extends React.Component {
  componentDidMount() {
    this.props.getJobById(this.props.match.params.jobId);
  }

  render() {
    const { title, company, email, image, description } = this.props.job;
    return (
      <section>
        <JobItemContainer>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <h4>{company}</h4>
            <h4>{email}</h4>
          </div>
          {image && <img src={image} alt="Job" />}
        </JobItemContainer>
      </section>
    );
  }
}

const JobItemContainer = styled.article`
  display: flex;
  justify-content: space-evenly;
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
  }
`;

const mapStateToProps = state => ({
  job: state.job.currentJob
});

export default connect(
  mapStateToProps,
  { getJobById }
)(withRouter(JobItem));
