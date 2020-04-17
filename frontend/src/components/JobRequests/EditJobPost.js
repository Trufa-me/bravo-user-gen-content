import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  CardSection,
  CardTitle,
  CardBody,
  MetaDataList
} from "@stepstone/components-react";
import { MapMarkerSm } from "@stepstone/icon-components";

export default class EditJobPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobpost_description: "",
      jobpost_author: "",
      jobpost_status: "",
      jobpost_skills: "",
      jobpost_location: null,
      jobpost_archived: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/jobpost/" + this.props.match.params.id)
      .then(response => {
        console.log(JSON.stringify(response, null, 2));
        this.setState({
          jobpost_description: response.data.jobpost_description,
          jobpost_author: response.data.jobpost_author,
          jobpost_status: response.data.jobpost_status,
          jobpost_skills: response.data.jobpost_skills,
          jobpost_location: response.data.jobpost_location,
          jobpost_archived: response.data.jobpost_archived
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle> <a href={"/"}> {`< Back to requests`}</a></CardTitle>
          <CardSection>
            <MetaDataList
              metaData={[
                {
                  Icon: MapMarkerSm,
                  title: this.state.jobpost_location || "Location"
                }
              ]}
            />
          </CardSection>
          <CardSection>
            {" "}
            {`https://www.totaljobs.com/jobs/plumber/in-london?radius=20`}
          </CardSection>
          <CardSection>
            A Recuriter will contact you very soon with some offers!!!! <br />
            In the meantime you can check by yourself what's available in our
            job board
          </CardSection>
          <CardSection>
            <iframe
              is="x-frame-bypass"
              src={`https://www.totaljobs.com/jobs/plumber/in-london?radius=20`}
              height="500px"
              width="100%"
            />
          </CardSection>
        </CardBody>
      </Card>
    );
  }
}
