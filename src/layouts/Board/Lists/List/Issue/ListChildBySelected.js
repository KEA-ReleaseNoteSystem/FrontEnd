import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MDBadge from 'components/MDBadge';
import MDTypography from 'components/MDTypography';
import DeleteIcon from '@mui/icons-material/Delete';
import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';

import { DeleteButton, ChildIssueList, Title, Bottom, Assignees, AssigneeAvatar } from './ChildSelectedStyles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ projectUsers, issue, index,selected,onDelete }) => {

  const handleChildDelete = () => {
    onDelete(issue, index); // 상위 컴포넌트의 handleDelete 함수를 호출
  }
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
    

<ChildIssueList selected={selected}>
    <Title>#{issue.issueNum} {issue.title}
        
    </Title>
    <div style={{ marginTop: '-20px' }}>
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

        &nbsp;&nbsp;<MDTypography variant="caption" fontWeight="light"   style={{ marginTop: '-100px' }}>담당자: {issue.memberIdInCharge.name}</MDTypography>
        <DeleteButton onClick={handleChildDelete}>
          <DeleteIcon />
        </DeleteButton>
        </div>
    

 
</ChildIssueList>
      
    
    </div>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
