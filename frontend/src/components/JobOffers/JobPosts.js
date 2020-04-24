import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardSection,
  Title,
  ButtonDefault,
  ButtonPrimary,
  Logo
} from "@stepstone/components-react";
import { StarEmptySm } from "@stepstone/icon-components";
import styled from "@stepstone/dresscode-react";
import jobOfferService from "../../services/jobOfferService";

export default class JobPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { jobposts: [] };
  }

  componentDidMount() {
    jobOfferService
      .search()
      .then(response => {
        this.setState({ jobposts: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  jobPostsList() {
    // To access the theme it is necessary
    // to call a function and pass it via props as argument
    const JobCard = styled(Card)`
      min-width: 300px;
      width: 100%;
      justify-content: space-between;
      padding: ${props => props.theme.spacings.spacingXS};
      margin: ${props => props.theme.spacings.spacingXXS};
      box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.3);
      flex-grow: 1;

      &:hover {
        box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5);
      }
    `;

    // It is possible to pass the them invoking a function
    // immediately before returning the string,
    // this reduces the number of props => fn required
    const CardTitle = styled(Title)`
      ${({ theme }) => `
        background-color: ${theme.colors.white};
        color: ${theme.colors.brand};
        font-size: ${theme.typography.fontSizeL};
        padding-right: ${theme.spacings.spacingXXL};

        &:hover {
          color: ${theme.colors.brand};
        }
      `}
    `;

    const Metadata = styled(CardSection)`
      padding: ${props => props.theme.spacings.spacingXS} 0;
      display: flex;
      justify-content: space-between;
      border: none;
      color: #454545;
      font-size: ${props => props.theme.typography.fontSizeS};
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    `;

    const Salary = styled.span`
      display: block;
    `;

    const Company = styled.span`
      color: ${props => props.theme.colors.brand};
      display: block;
    `;

    const Location = styled.span`
      display: block;
    `;

    const LogoImg = styled(Logo)`
      max-width: 85px;
      align-items: start;
      border: none;
      padding: 0px;
    `;

    const CallToActions = styled(CardSection)`
      display: flex;
      justify-content: space-between;
      padding: 0;
      border: none;
    `;

    const ButtonStyled = styled(ButtonDefault)`
      color: ${props => props.theme.colors.black};
      border-color: ${props => props.theme.colors.black};
      border: solid 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${props => props.theme.typography.fontSizeL}

      &:hover {
        color: ${props => props.theme.colors.black};
        border-color: ${props => props.theme.colors.black};
      }
    `;

    const IconStyled = styled(StarEmptySm)`
      margin-right: ${props => props.theme.spacings.spacingXXS};

      @media (max-width: ${props => props.theme.breakpoints.screenMMin}) {
        display: none;
      }
    `;

    const ApplyButton = styled(ButtonPrimary)`
      flex-grow: 1;

      display: inline-block;
      margin: 0 ${props => props.theme.spacings.spacingS};

      background-color: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.white};
    `;

    const ShareButton = styled(ButtonStyled)`
      display: inline-block;
    `;

    return this.state.jobposts.map(function(currentJobpost, i) {
      console.log(currentJobpost);
      return (
        <JobCard key={currentJobpost.JobID}>
          <CardBody>
            <CardTitle href={`/edit/${currentJobpost.JobID}`}>
              {currentJobpost.title}
            </CardTitle>
            <Metadata>
              <div>
                <Salary>{currentJobpost.company}</Salary>
                <Company>{currentJobpost.salary}</Company>
                <Location>{currentJobpost.location}</Location>
                <span>{currentJobpost.emailDate}</span>
              </div>
              <LogoImg
                linkUrl={`/edit/${currentJobpost.JobID}`}
                imgUrl={
                  "https://www.tailorbrands.com/wp-content/uploads/2019/09/Juicy-logo-100-1-300x300.jpg"
                }
              />
            </Metadata>
            <CallToActions>
              <ShareButton>
                <span> Share</span>
              </ShareButton>
              <ApplyButton>Apply</ApplyButton>
              <ButtonStyled>
                <IconStyled />
                <span> Save</span>
              </ButtonStyled>
            </CallToActions>
          </CardBody>
        </JobCard>
      );
    });
  }

  render() {
    const List = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: auto;
    `;

    return <List>{this.jobPostsList()}</List>;
  }
}
