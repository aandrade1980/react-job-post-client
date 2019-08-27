import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Components
import Header from "./components/Header";
import Jobs from "./components/Jobs";
import JobItem from "./components/JobItem";
import ModalContainer from "./components/Modal";
import NewJobForm from "./components/NewJobForm";

class App extends React.Component {
  render() {
    console.log("show modal => ", this.props.showModal);

    return (
      <Router>
        <div className="App">
          <Header title="Jobs" />
          {this.props.showModal && (
            <ModalContainer>
              <NewJobForm />
            </ModalContainer>
          )}
          <Route path="/" exact component={Jobs} />
          <Route path="/job/:jobId" component={JobItem} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  showModal: state.job.showModal
});

export default connect(
  mapStateToProps,
  {}
)(App);
