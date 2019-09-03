import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { getAllJobs, reOrderJobs } from "../redux/actions/jobActions";

// Components
import JobCard from "./JobCard";
import ModalContainer from "./Modal";
import Spinner from "./Spinner";

class Jobs extends Component {
  state = {
    draggedItem: {},
    draggedOverItem: {}
  };

  componentDidMount() {
    this.props.getAllJobs();
  }

  setDraggedItem = item => this.setState({ draggedItem: item });

  onDragOver = (evt, job, position) => {
    evt.preventDefault();
    this.setState({ draggedOverItem: job });
    this.props.reOrderJobs(this.state, position);
  };

  render() {
    const { jobs } = this.props;

    return (
      <section style={styles.section}>
        <ul style={styles.ul}>
          {jobs ? (
            jobs.map((job, index) => (
              <li
                key={job.jobId}
                onDragOver={evt => this.onDragOver(evt, job, index)}
              >
                <JobCard
                  key={job.jobId}
                  job={job}
                  setDraggedItem={this.setDraggedItem}
                />
              </li>
            ))
          ) : (
            <ModalContainer>
              <Spinner />
            </ModalContainer>
          )}
        </ul>
      </section>
    );
  }
}

const styles = {
  section: {
    backgroundColor: "#f3f3f3"
  },
  ul: {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    margin: 0,
    padding: "15px 0 0"
  }
};

const mapStateToProps = state => ({
  jobs: state.job.jobs
});

const mapActionsToProps = {
  getAllJobs,
  reOrderJobs
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Jobs);
