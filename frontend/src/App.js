import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  ThemeProvider,
  getThemeVariables,
} from "@stepstone/dresscode-react";

import "./App.css";
import JobPosts from "./components/JobPost/JobPosts";
import EditJobPost from "./components/JobPost/EditJobPost";
import CreateJobPost from "./components/JobPost/CreateJobPost";

const theme = getThemeVariables("stepstone"); // possible options are 'stepstone' and 'pnet'
theme.colors.brand = '#169000';
theme.colors.accent = '#dd5800';
theme.breakpoints.screenMMin = '500px';
theme.spacings.spacingS = '15px';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div
          style={{
            margin: "20px auto",
            maxWidth: "900px",
            'background-color': "#f4f4f4"
          }}
        >
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a
              className="navbar-brand"
              href="https://codingthesmartway.com"
              target="_blank"
            >
              <img
                src="https://i.pinimg.com/originals/b8/5f/58/b85f58e2e1e38407f50ea4e2cf30f08f.png"
                height="50"
                alt="JobPoster"
              />
            </a>
            <Link to="/" className="navbar-brand">
              What can you do for a living?
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    JobPosts
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create JobPost
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        <Route path="/" exact component={JobPosts} />
        <Route path="/edit/:id" component={EditJobPost} />
        <Route path="/create" component={CreateJobPost} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
