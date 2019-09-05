import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import themeFile from "./util/theme";

// Netlify
import netlifyIdentity from "netlify-identity-widget";

// Redux
import { connect } from "react-redux";
import { getAllCategories } from "./redux/actions/categoryActions";
import { loginUser, logoutUser } from "./redux/actions/userActions";

// Components
import Header from "./components/Header";
import Jobs from "./components/Jobs";
import JobItem from "./components/JobItem";
import ModalContainer from "./components/Modal";
import NewJobForm from "./components/NewJobForm";
import Categories from "./components/Categories";
import AuthenticatingButtons from "./components/AuthenticatingButtons";

// MUI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme(themeFile);

netlifyIdentity.init();

class App extends React.Component {
  componentDidMount() {
    const { currentUser } = this.props;

    if (!currentUser && netlifyIdentity.currentUser()) {
      this.props.loginUser();
    }

    netlifyIdentity.on("login", () => this.props.loginUser());
    netlifyIdentity.on("logout", () => this.props.logoutUser());

    this.props.getAllCategories();
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          {this.props.user ? (
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
          ) : (
            <AuthenticatingButtons netlifyIdentity={netlifyIdentity} />
          )}
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = ({ job: { modal }, user: { user } }) => ({
  modal,
  user
});

export default connect(
  mapStateToProps,
  { getAllCategories, loginUser, logoutUser }
)(App);
