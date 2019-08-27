import React from "react";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getJobById } from "../redux/actions/jobActions";

class JobItem extends React.Component {
  componentDidMount() {
    console.log("params => ", this.props.match.params);
    this.props.getJobById(this.props.match.params.jobId);
  }

  render() {
    const { title, company, email, image, description } = this.props.job;
    return (
      <section>
        <article style={styles.article}>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <h4>{company}</h4>
            <h4>{email}</h4>
          </div>
          {image && <img style={styles.img} src={image} alt="Job" />}
        </article>
      </section>
    );
  }
}

const styles = {
  img: {
    height: "auto",
    width: "50%",
    marginRight: "15px",
    marginTop: "15px"
  },
  article: {
    display: "flex",
    justifyContent: "center"
  }
};

const mapStateToProps = state => ({
  job: state.job.currentJob
});

export default connect(
  mapStateToProps,
  { getJobById }
)(withRouter(JobItem));
