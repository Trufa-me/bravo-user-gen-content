import styled from "@stepstone/dresscode-react";
import {
  ButtonDefault,
  ButtonPrimary,
  Card,
  CardBody,
  CardSection,
  Logo,
  Modal,
  Title
} from "@stepstone/components-react";
import { StarEmptySm } from "@stepstone/icon-components";
import React, { useState } from "react";
import JobPosts from "../JobOffers/JobPosts";

export const JobRequestCard = ({
  id,
  title,
  description,
  author,
  skills,
  location,
  salary
}) => {
  const [showSimilarJobs, setShowSimilarJobs] = useState(false);

  // To access the theme it is necessary
  // to call a function and pass it via props as argument
  const JobCard = styled(Card)`
    justify-content: space-between;
    padding: ${props => props.theme.spacings.spacingXS};
    margin: ${props => props.theme.spacings.spacingXXS};
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.3);
    flex-grow: 1;

    &:hover {
      box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5);
    }
      width: 100%;
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

  const Info = styled("div")`
    overflow: hidden;
  `;

  const Text = styled("span")`
    display: block;
    max-width: 500px;
    margin-bottom: 10px;
  `;

  const ModalCard = styled(Card)`
  width: 100%;
  `

  return (
    <JobCard key={id}>
      <CardBody>
        <CardTitle href={`/edit/${id}`}>{title}</CardTitle>
        <Metadata>
          <Info>
            <Text>{description}</Text>
            <Text>Desired salary: £ {salary}</Text>
            <Text>City: {location}</Text>
          </Info>
          <Info>
            <LogoImg
              linkUrl={`/edit/${id}`}
              imgUrl={
                "https://cdn.business2community.com/wp-content/uploads/2013/03/Mario-Plumber.jpg"
              }
            />
            <Text>{author}</Text>
          </Info>
        </Metadata>
        <CallToActions>
          <ButtonStyled onClick={() => setShowSimilarJobs(true)}>
            <span>Similar Jobs</span>
          </ButtonStyled>
        </CallToActions>
      </CardBody>
      <Modal
        visible={showSimilarJobs}
        onClose={() => {
          setShowSimilarJobs(false);
        }}
      >
        <ModalCard>
          <CardBody>
            <h2>Similar jobs</h2>
              <JobPosts />
          </CardBody>
        </ModalCard>
      </Modal>
    </JobCard>
  );
};
