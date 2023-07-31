import React from 'react';
import PropTypes from 'prop-types';
import MDBadge from 'components/MDBadge';
import MDTypography from 'components/MDTypography';
import Checkbox from '@material-ui/core/Checkbox';

import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';

import { IssueLink, Issue, Title, Bottom, Assignees, AssigneeAvatar } from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const CheckBoxList = ({ projectUsers, issue, index, selected, handleSelect }) => {

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
      <Issue>
        <Checkbox
          checked={selected.includes(issue.id)}
          onChange={(event) => handleSelect(issue.id, event.target.checked)}
        />
        <Title>#{issue.issueNum} {issue.title}</Title>
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

        <br/>
        &nbsp;&nbsp;<MDTypography variant="caption" fontWeight="light">담당자: {issue.memberIdInCharge.name}</MDTypography>
      </Issue>
    </div>
  );
};

Checkbox.propTypes = propTypes;

export default CheckBoxList;
