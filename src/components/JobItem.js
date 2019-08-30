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

  parseCategories = (categories = "") => {
    const cats = categories.split(",");
    let catsToReturn = [];
    cats.forEach(cat =>
      catsToReturn.push(
        ...this.props.categories.filter(_cat => _cat.id === cat)
      )
    );

    return catsToReturn;
  };

  render() {
    const {
      title,
      company,
      email,
      image,
      description,
      categories
    } = this.props.currentJob;

    const categoriesToDisplay = this.parseCategories(categories);

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

const mapStateToProps = ({ job: { currentJob, categories } }) => ({
  currentJob,
  categories
});

export default connect(
  mapStateToProps,
  { getJobById }
)(withRouter(JobItem));
