import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ButtonDefault, FormInput } from "@stepstone/components-react";
import service from "../../services/jobRequestService";
import styled from "@stepstone/dresscode-react";

const Container = styled.div`
  min-width: 300px;
  padding: 20px;
  background: ${props => props.theme.colors.white};
`;

const FormGroup = styled.div`
  margin: 10px 0;
`;

const Title = styled.label`
  margin-bottom: 5px;
  display: block;
`;

export default class CreateJobPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      author: "",
      status: "",
      skills: "",
      location: "",
      archived: ""
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Start the actual call to create the JobPost
  async onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`JobPost Description: ${this.state}`);

    const jobPost = {
      description: this.state.description,
      author: this.state.author,
      status: this.state.status,
      skills: this.state.skills,
      location: this.state.location,
      archived: false
    };

    const result = await service.create(jobPost);

    this.setState({
      id: result.data.id,
      description: "",
      author: "",
      status: "",
      skills: "",
      location: "",
      archived: false
    });
  }

  onFieldChange = fieldName => e =>
    this.setState({ [fieldName]: e.target.value });
  render() {
    if (this.state.id) {
      console.log(JSON.stringify(this.state, null, 2));
      return <Redirect to={"/edit/" + this.state.id} />;
    }

    return (
      <Container>
        <h3>Create Job Request!</h3>
        <form onSubmit={this.onSubmit}>
          <FormGroup className="form-group">
            <Title>Title: </Title>
            <FormInput
              type="textarea"
              className="form-control"
              value={this.state.title}
              onChange={this.onFieldChange("title")}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Title>Description: </Title>
            <FormInput
              type="textarea"
              className="form-control"
              value={this.state.description}
              onChange={this.onFieldChange("description")}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Title>author: </Title>
            <FormInput
              type="text"
              className="form-control"
              value={this.state.author}
              onChange={this.onFieldChange("author")}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Title>Salary: </Title>
            <FormInput
              type="text"
              className="form-control"
              value={this.state.salary}
              onChange={this.onFieldChange("salary")}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Title>Skills: </Title>
            <FormInput
              type="text"
              className="form-control"
              value={this.state.skills}
              onChange={this.onFieldChange("skills")}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Title>Location: </Title>
            <FormInput
              type="text"
              className="form-control"
              value={this.state.location}
              onChange={this.onFieldChange("location")}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <ButtonDefault onClick={() => this.onSubmit}>Save</ButtonDefault>
          </FormGroup>
        </form>
      </Container>
    );
  }
}
