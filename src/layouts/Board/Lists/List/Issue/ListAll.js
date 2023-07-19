import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MDBadge from 'components/MDBadge';
import MDTypography from 'components/MDTypography';

import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';

import { IssueLink, Issue, Title, Bottom, Assignees, AssigneeAvatar } from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ projectUsers, issue, index,selected }) => {


  // const assignees = issue.map(userId => projectUsers.find(user => user.id === userId));

  const getStatusColor = (status) => {
    switch (status) {
        case 'done':
            return 'success';
        case 'backlog':
            return 'dark';
        case 'inprogress':
            return 'warning';
        default:
            return 'default';
    }
}

const getPriorityColor = (priority) => {
    if (priority >= 90) {
        return 'error';
    } else if (priority < 90 && priority >= 50) {
        return 'warning';
    } else {
        return 'info';
    }
}
  
  return (
    
    <div>
      {/* <IssueLink>
        <Issue>
          <Title>{issue.title}</Title>
          <Bottom>
            <div>
              <IssueTypeIcon type={issue.status} />
              <IssuePriorityIcon priority={issue.importance} top={-1} left={4} />
            </div>
            <Assignees>
              {assignees.map(user => (
                <AssigneeAvatar
                  key={user.id}
                  size={24}
                  avatarUrl={user.avatarUrl}
                  name={user.name}
                />
              ))}
            </Assignees>
          </Bottom>
        </Issue>
      </IssueLink>
       */}

<Issue selected={selected}>
    <Title>#{issue.issueNum} {issue.title}
        
    </Title>
    <MDBadge
            badgeContent={issue.status}
            color={getStatusColor(issue.status)}
            variant="gradient"
            size="sm"
        />

        <MDBadge
            badgeContent={issue.issueType}
            color={getPriorityColor(issue.importance)}
            variant="gradient"
            size="sm"
        />
    {/* <Bottom>
    </Bottom> */}
    <br/>
    &nbsp;&nbsp;<MDTypography variant="caption" fontWeight="light">담당자: {issue.memberIdInCharge.name}</MDTypography>
</Issue>
      
    
    </div>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
