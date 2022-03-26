import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Netlify
import netlifyIdentity from 'netlify-identity-widget';

// Redux
import { connect } from 'react-redux';
import { getAllCategories } from './redux/actions/categoryActions';
import { loginUser, logoutUser } from './redux/actions/userActions';
import { getAllJobs } from './redux/actions/jobActions';

// MUI
import { CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import theme from './util/theme';

// Components
import AuthenticatingButtons from './components/AuthenticatingButtons';
import Categories from './components/Categories';
import Header from './components/Header';
import JobItem from './components/JobItem';
import JobsContainer from './components/Jobs';
import ModalContainer from './components/Modal';

const Toast = React.lazy(() => import('./components/Toast'));

netlifyIdentity.init();

const App = ({
  currentUser,
  loginUser,
  logoutUser,
  getAllCategories,
  getAllJobs,
  modal,
  user
}) => {
  React.useEffect(() => {
    if (!currentUser && netlifyIdentity.currentUser()) {
      loginUser();
    }

    netlifyIdentity.on('login', () => loginUser());
    netlifyIdentity.on('logout', () => logoutUser());

    getAllCategories();
    getAllJobs();
  }, [currentUser, getAllCategories, loginUser, logoutUser, getAllJobs]);

  const ModalComponent = modal.component;

  return (
    <>
      <React.Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <CircularProgress />
          </div>
        }
      >
        <Toast />
      </React.Suspense>
      <Router>
        <ThemeProvider theme={theme}>
          {user ? (
            <div className="App">
              <Header title="Jobs" />
              {modal.show && (
                <ModalContainer>
                  <ModalComponent />
                </ModalContainer>
              )}
              <Route path="/" exact component={JobsContainer} />
              <Route path="/Categories" exact component={Categories} />
              <Route path="/job/:jobId" component={JobItem} />
            </div>
          ) : (
            <AuthenticatingButtons netlifyIdentity={netlifyIdentity} />
          )}
        </ThemeProvider>
      </Router>
    </>
  );
};

const mapStateToProps = ({ job: { modal }, user: { user } }) => ({
  modal,
  user
});

export default connect(mapStateToProps, {
  getAllCategories,
  getAllJobs,
  loginUser,
  logoutUser
})(App);
