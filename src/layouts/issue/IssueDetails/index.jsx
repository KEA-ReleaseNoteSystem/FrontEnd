import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import Description from './Description';

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



      <Content>
        <Left>

          <Description issue={issue} updateIssue={updateIssue} />
        </Left>

       
      </Content>
    </Fragment>
  
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;