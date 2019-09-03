import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import themeFile from "./util/theme";

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

// MUI
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme(themeFile);

class App extends React.Component {
  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
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
