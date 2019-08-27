import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Components
import Header from "./components/Header";
import Jobs from "./components/Jobs";
import JobItem from "./components/JobItem";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header title="Jobs" />
          <Route path="/" exact component={Jobs} />
          <Route path="/job/:jobId" component={JobItem} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
