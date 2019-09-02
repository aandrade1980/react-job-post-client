import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { parseCategories } from "../util/Functions";

// Redux
import { connect } from "react-redux";
import { getJobById, openModal } from "../redux/actions/jobActions";

// Components
import CustomButton from "./CustomButton";

// MUI
import EditIcon from "@material-ui/icons/Edit";

class JobItem extends React.Component {
  componentDidMount() {
    this.props.getJobById(this.props.match.params.jobId);
  }

  openModal = () => this.props.openModal({ show: true, edit: true });

  render() {
    const {
      title,
      company,
      email,
      image,
      description,
      categories
    } = this.props.currentJob;

    const categoriesToDisplay = parseCategories(
      categories,
      this.props.categories
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
            <CustomButton title="Edit" onClick={this.openModal}>
              <EditIcon color="primary" />
            </CustomButton>
          </div>
        </JobItemContainer>
      </section>
    );
  }
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
    margin: 0 15px;
  }
`;

const mapStateToProps = ({
  job: { currentJob },
  category: { categories }
}) => ({
  currentJob,
  categories
});

export default connect(
  mapStateToProps,
  { getJobById, openModal }
)(withRouter(JobItem));
