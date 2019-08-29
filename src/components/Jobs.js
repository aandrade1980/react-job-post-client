import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { getAllJobs } from "../redux/actions/jobActions";

// Components
import JobCard from "./JobCard";

class Jobs extends Component {
  componentDidMount() {
    this.props.getAllJobs();
  }

  render() {
    const { jobs } = this.props;

    return (
      <section style={styles.section}>
        {jobs && jobs.map(job => <JobCard key={job.jobId} job={job} />)}
      </section>
    );
  }
}

const styles = {
  section: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: "15px"
  }
};

const mapStateToProps = state => ({
  jobs: state.job.jobs
});

export default connect(
  mapStateToProps,
  { getAllJobs }
)(Jobs);
