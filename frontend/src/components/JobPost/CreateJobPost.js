import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ButtonDefault } from '@stepstone/components-react';

export default class CreateJobPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobpost_description: "",
      jobpost_author: "",
      jobpost_status: "",
      jobpost_skills: "",
      jobpost_location: "",
      jobpost_archived: "",
    };

    this.onChangeJobPostDescription = this.onChangeJobPostDescription.bind(
      this
    );
    this.onChangeJobPostAuthor = this.onChangeJobPostAuthor.bind(this);
    this.onChangeJobPostStatus = this.onChangeJobPostStatus.bind(this);
    this.onChangeJobPostSkills = this.onChangeJobPostSkills.bind(this);
    this.onChangeJobPostLocation = this.onChangeJobPostLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Update State based user input
  onChangeJobPostDescription(e) {
    this.setState({
      jobpost_description: e.target.value
    });
  }

  onChangeJobPostAuthor(e) {
    this.setState({
      jobpost_author: e.target.value
    });
  }

  onChangeJobPostStatus(e) {
    this.setState({
      jobpost_status: e.target.value
    });
  }

  onChangeJobPostSkills(e) {
    this.setState({
      jobpost_skills: e.target.value
    });
  }

  onChangeJobPostLocation(e) {
    this.setState({
      jobpost_location: e.target.value
    });
  }

  // Start the actual call to create the JobPost
  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`JobPost Description: ${this.state}`);

    const jobPost = {
      jobpost_description: this.state.jobpost_description,
      jobpost_author: this.state.jobpost_author,
      jobpost_status: this.state.jobpost_status,
      jobpost_skills: this.state.jobpost_skills,
      jobpost_location: this.state.jobpost_location,
      jobpost_archived: false
    };

    axios
      .post("http://localhost:4000/jobpost/add", jobPost)
      .then(res => {
        console.log('Response', res)
      this.setState({'jobpost_id': res.data.id})
      });

    this.setState({
      jobpost_description: "",
      jobpost_author: "",
      jobpost_status: "",
      jobpost_skills: "",
      jobpost_location: "",
      jobpost_archived: false
    });
  }

  render() {
    if (this.state.jobpost_id) {
      console.log(JSON.stringify(this.state, null, 2));
      return <Redirect to={"/edit/"+this.state.jobpost_id} />;
    }

    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create Job Request!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Role: </label>
            <input
              type="textarea"
              className="form-control"
              value={this.state.jobpost_description}
              onChange={this.onChangeJobPostDescription}
            />
          </div>

          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.jobpost_author}
              onChange={this.onChangeJobPostAuthor}
            />
          </div>

          <div className="form-group">
            <label>Salary: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.jobpost_status}
              onChange={this.onChangeJobPostStatus}
            />
          </div>

          <div className="form-group">
            <label>Skills: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.jobpost_skills}
              onChange={this.onChangeJobPostSkills}
            />
          </div>

          <div className="form-group">
            <label>Location: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.jobpost_location}
              onChange={this.onChangeJobPostLocation}
            />
          </div>

          <div className="form-group">
            <ButtonDefault onClick={() => this.onSubmit}>Test ButtonDefault</ButtonDefault>
          </div>
        </form>
      </div>
    );
  }
}
