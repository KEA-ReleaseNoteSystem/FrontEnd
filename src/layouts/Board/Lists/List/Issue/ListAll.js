import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMatch  } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import Title1 from 'layouts/Board/IssueDetails/Title';
import IssueEditing  from "layouts/issue/index";
import IssueEdit  from "layouts/issue/IssueEditing";

import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';

import { IssueLink, Issue, Title, Bottom, Assignees, AssigneeAvatar } from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ projectUsers, issue, index }) => {

  const [selectedIssue, setSelectedIssue] = useState(null);

  const assignees = issue.userIds.map(userId => projectUsers.find(user => user.id === userId));
  
  return (
    
    <div>
      <IssueLink>
        <Issue>
          <Title>{issue.title}</Title>
          <Bottom>
            <div>
              <IssueTypeIcon type={issue.type} />
              <IssuePriorityIcon priority={issue.priority} top={-1} left={4} />
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
        {selectedIssue && <IssueEdit selectedIssue={selectedIssue} />}
      </IssueLink>
      
      
    
    </div>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
