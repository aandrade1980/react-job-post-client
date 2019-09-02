import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getAllCategories } from "./redux/actions/categoryActions";

// Components
import Header from "./components/Header";
import Jobs from "./components/Jobs";
import JobItem from "./components/JobItem";
import ModalContainer from "./components/Modal";
import NewJobForm from "./components/NewJobForm";
import Categories from "./components/Categories";

class App extends React.Component {
  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header title="Jobs" />
          {this.props.modal.show && (
            <ModalContainer>
              <NewJobForm />
            </ModalContainer>
          )}
          <Route path="/" exact component={Jobs} />
          <Route path="/Categories" exact component={Categories} />
          <Route path="/job/:jobId" component={JobItem} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ job: { modal } }) => ({
  modal
});

export default connect(
  mapStateToProps,
  { getAllCategories }
)(App);
