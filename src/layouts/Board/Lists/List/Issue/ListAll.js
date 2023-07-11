import React, { useState } from 'react';
import PropTypes from 'prop-types';


import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';

import { IssueLink, Issue, Title, Bottom, Assignees, AssigneeAvatar } from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ projectUsers, issue, index }) => {

  const [selectedIssue, setSelectedIssue] = useState(null);

  // const assignees = issue.map(userId => projectUsers.find(user => user.id === userId));
  
  return (
    
    <div>
      <IssueLink>
        <Issue>
          <Title>{issue.title}</Title>
          <Bottom>
            <div>
              <IssueTypeIcon type={issue.status} />
              <IssuePriorityIcon priority={issue.importance} top={-1} left={4} />
            </div>
            <Assignees>
              {/* {assignees.map(user => (
                <AssigneeAvatar
                  key={user.id}
                  size={24}
                  avatarUrl={user.avatarUrl}
                  name={user.name}
                />
              ))} */}
            </Assignees>
          </Bottom>
        </Issue>
      </IssueLink>
      
      
    
    </div>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
