import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Droppable } from 'react-beautiful-dnd';
import { intersection } from 'lodash';

import { IssueStatusCopy } from 'shared/constants/issues';

import Issue from './Issue';
import { List, Title, IssuesCount, Issues } from './Styles';

const propTypes = {
  // status: PropTypes.string.isRequired,
  // project: PropTypes.object.isRequired,
  // filters: PropTypes.object.isRequired,
  // currentUserId: PropTypes.number,
};

const defaultProps = {
  currentUserId: null,
};

const ProjectBoardList = ({ status, project, filters, currentUserId }) => {
  const filteredIssues = filterIssues(project.issues, filters, currentUserId);
  const filteredListIssues = getSortedListIssues(project.issues, status);
  const allListIssues = getSortedListIssues(project.issues, status);
  console.log("filteredListIssues",filteredListIssues)
  return (
    <Droppable key={filteredListIssues} droppableId={status}>
      {provided => (
        <List>
          <Title>
            {`${IssueStatusCopy[status]} `}
            <IssuesCount>{formatIssuesCount(allListIssues, filteredListIssues)}</IssuesCount>
          </Title>
          <Issues
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredListIssues.map((issue, index) => (
              <Issue key={issue.id} projectUsers={project.users} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </Issues>
        </List>
      )}
    </Droppable>
  );
};

const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  let issues = projectIssues;
  if (userIds.length > 0) {
    issues = issues.filter(issue => intersection(issue.userIds, userIds).length > 0);
  }
  return issues;
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

const formatIssuesCount = (allListIssues, filteredListIssues) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

ProjectBoardList.propTypes = propTypes;
ProjectBoardList.defaultProps = defaultProps;

export default ProjectBoardList;
