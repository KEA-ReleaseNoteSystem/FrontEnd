import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { PageError, CopyLinkButton, Button, AboutTooltip } from 'shared/components';

import Loader from './Loader';
import Type from './Type';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Status from './Status';
import AssigneesReporter from './AssigneesReporter';
import Priority from './Priority';
import EstimateTracking from './EstimateTracking';
import Dates from './Dates';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({selectedIssue}) => {
  const [issue, setIssue] = useState({
    id: 7,
    title: 'Issue 7',
    type: 'task',
    description: 'Description for Issue 2',
    status: 'done',
    listPosition: 1,
    priority: 1,
    userIds: [2],
    updatedAt: '2023-06-29',
  });

  console.log(issue);

  const updateIssue = updatedFields => {
   (currentIssue => ({ ...currentIssue, ...updatedFields }));
  };

  return (
    <Fragment>
      {/* <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          <AboutTooltip
            renderLink={linkProps => (
              <Button icon="feedback" variant="empty" {...linkProps}>
                Give feedback
              </Button>
            )}
          />
          <CopyLinkButton variant="empty" />
        </TopActionsRight>
      </TopActions> */}
      <Content>
        <Left>
{/* 
          <Title issue={issue} updateIssue={updateIssue} /> */}
          <Description issue={issue} updateIssue={updateIssue} />
        </Left>

          {/* <Status issue={issue} updateIssue={updateIssue} />
          <AssigneesReporter issue={issue} updateIssue={updateIssue} projectUsers={projectUsers} />
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} /> */}
       
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;