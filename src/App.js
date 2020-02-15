import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import themeFile from "./util/theme";

// Netlify
import netlifyIdentity from "netlify-identity-widget";

// Redux
import { connect } from "react-redux";
import { getAllCategories } from "./redux/actions/categoryActions";
import { loginUser, logoutUser } from "./redux/actions/userActions";
import { getAllJobs } from "./redux/actions/jobActions";

// Components
import Header from "./components/Header";
import JobsContainer from "./components/Jobs";
import JobItem from "./components/JobItem";
import ModalContainer from "./components/Modal";
import NewJobForm from "./components/NewJobForm";
import Categories from "./components/Categories";
import AuthenticatingButtons from "./components/AuthenticatingButtons";

// MUI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme(themeFile);

netlifyIdentity.init();

const App = ({ currentUser, loginUser, logoutUser, getAllCategories, getAllJobs, modal, user }) => {

  React.useEffect(() => {
    if (!currentUser && netlifyIdentity.currentUser()) {
      loginUser();
    }

    netlifyIdentity.on("login", () => loginUser());
    netlifyIdentity.on("logout", () => logoutUser());

    getAllCategories();
    getAllJobs();
  }, [currentUser, getAllCategories, loginUser, logoutUser, getAllJobs])

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        {user ? (
          <div className="App">
            <Header title="Jobs" />
            {modal.show && (
              <ModalContainer>
                <NewJobForm />
              </ModalContainer>
            )}
            <Route path="/" exact component={JobsContainer} />
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

const mapStateToProps = ({ job: { modal }, user: { user } }) => ({
  modal,
  user
});

export default connect(
  mapStateToProps,
  { getAllCategories, getAllJobs, loginUser, logoutUser }
)(App);
