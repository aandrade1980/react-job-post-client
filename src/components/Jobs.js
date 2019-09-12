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
    draggedOverItem: {},
    jobImageSpans: []
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

  setSpans = jobIdSpans =>
    this.setState({ jobImageSpans: [...this.state.jobImageSpans, jobIdSpans] });

  getJobImageSpans = jobId => {
    const spans = this.state.jobImageSpans.find(job =>
      Object.keys(job).includes(jobId)
    );

    return spans && spans[jobId];
  };

  render() {
    const { jobs } = this.props;

    return (
      <section style={styles.section}>
        <ul style={styles.ul}>
          {jobs ? (
            jobs.map((job, index) => {
              return (
                <li
                  style={{
                    gridRowEnd: `span ${this.getJobImageSpans(job.jobId)}`
                  }}
                  key={job.jobId}
                  onDragOver={evt => this.onDragOver(evt, job, index)}
                >
                  <JobCard
                    key={job.jobId}
                    job={job}
                    setDraggedItem={this.setDraggedItem}
                    setSpans={this.setSpans}
                  />
                </li>
              );
            })
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gridGap: "0 10px",
    gridAutoRows: "80px",
    justifyItems: "center",
    margin: 0,
    padding: "15px 30px 0"
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
