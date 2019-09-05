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

// MUI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import { loginUser, logoutUser } from "./util/identifyActions";

const theme = createMuiTheme(themeFile);

netlifyIdentity.init();

// const currentUser = {
//   avatar_url:
//     "https://lh3.googleusercontent.com/a-/AAuE7mDpye2cUha0uDA4_W6vwO1Qbr_QvrfGbMwLSaMGfQ",
//   confirmed_at: "2019-09-04T22:39:48Z",
//   created_at: "2019-09-04T22:39:48Z",
//   email: "varito1@gmail.com",
//   full_name: "Alvaro Andrade",
//   id: "6deab5c6-b676-4f92-8a48-a82acb3d0785",
//   provider: "google"
// };

// localStorage.setItem("currentUser", JSON.stringify(currentUser));

class App extends React.Component {
  // state = {
  //   user: null
  // };

  componentDidMount() {
    if (!this.props.user) {
      netlifyIdentity.open();
    }

    netlifyIdentity.on("login", this.props.loginUser());
    netlifyIdentity.on("logout", this.props.logoutUser());

    this.props.getAllCategories();

    // const user = localStorage.getItem("currentUser");
    // if (user) {
    //   this.setState({ user: JSON.parse(user) });
    // } else {
    //   netlifyIdentity.open();
    // }
    // this.props.getAllCategories();
    // netlifyIdentity.on("login", user => this.setState({ user }, loginUser()));
    // netlifyIdentity.on("logout", () =>
    //   this.setState({ user: null }, logoutUser())
    // );
  }

  render() {
    return (
      <Router>
        {this.props.user && (
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
        )}
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
