import React, { Component, useState } from "react";
import service from "../../services/jobRequestService";
import { Title } from "@stepstone/components-react";
import styled from "@stepstone/dresscode-react";
import { JobRequestCard } from "./JobRequest";

export default class JobRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { jobRequests: [] };
  }

  componentDidMount() {
    service
      .getAll()
      .then(response => {
        this.setState({ jobRequests: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const List = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    `;

    const Title = styled.h3`
      width: 100%;
    `;

    return (
      <List>
        {this.state.jobRequests.map((jobRequest, i) => (
          <JobRequestCard {...jobRequest} />
        ))}
      </List>
    );
  }
}
