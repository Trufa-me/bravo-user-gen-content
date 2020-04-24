import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  ThemeProvider,
  getThemeVariables
} from "@stepstone/dresscode-react";

import {
  ButtonPrimary,
  Card,
  CardBody, FloatingActionButton,
  Modal
} from "@stepstone/components-react";

import "./App.css";
import EditJobPost from "./components/JobRequests/EditJobPost";
import CreateJobPost from "./components/JobRequests/CreateJobPost";
import JobRequests from "./components/JobRequests/JobRequests";
import {PlusMd} from "@stepstone/icon-components";

const theme = getThemeVariables("stepstone"); // possible options are 'stepstone' and 'pnet'
theme.colors.brand = "#169000";
theme.colors.accent = "#dd5800";
theme.breakpoints.screenMMin = "500px";
theme.spacings.spacingS = "15px";

function App() {
  const [createJobPostVisible, setCreateJobPostVisible] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div
          style={{
            margin: "20px auto",
            backgroundColor: "#f4f4f4"
          }}
        >
          <Route path="/" exact component={JobRequests} />
          <Route path="/edit/:id" component={EditJobPost} />
          <Route path="/create" component={CreateJobPost} />
          <FloatingActionButton
            onClick={() => setCreateJobPostVisible(true)}
            icon={PlusMd}
            fill={'white'}
            variant="candidate"
            disabled={false}
          />
          <Modal
            visible={createJobPostVisible}
            onClose={() => {
              setCreateJobPostVisible(false);
            }}
          >
            <Card>
              <CardBody>
                <CreateJobPost />
              </CardBody>
            </Card>
          </Modal>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
