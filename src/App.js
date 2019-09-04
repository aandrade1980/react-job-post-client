import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import themeFile from "./util/theme";

// Netlify
import netlifyIdentity from "netlify-identity-widget";

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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { loginUser, logoutUser } from "./util/identifyActions";

const theme = createMuiTheme(themeFile);

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = localStorage.getItem("currentUser");
    if (user) {
      this.setState({ user: JSON.parse(user) });
    } else {
      netlifyIdentity.open();
    }
    this.props.getAllCategories();
    netlifyIdentity.on("login", user => this.setState({ user }, loginUser()));
    netlifyIdentity.on("logout", () =>
      this.setState({ user: null }, logoutUser())
    );
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
