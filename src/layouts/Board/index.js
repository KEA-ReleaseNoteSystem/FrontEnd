import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useMatch, useNavigate  } from 'react-router-dom';

import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';
import IssueDetails from './IssueDetails';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const projectMock = {
  id: 1,
  name: 'Project 1',
  users: [
    { id: 1, name: 'User 1', email: 'user1@example.com', avatarUrl: 'avatar1url' },
    { id: 2, name: 'User 2', email: 'user2@example.com', avatarUrl: 'avatar2url' },
  ],
  issues: [
    {
      id: 1,
      title: 'Issue 1',
      type: 'task',
      description: 'Description for Issue 1',
      status: 'backlog',
      listPosition: 1,
      priority : 1,
      userIds: [1],
      updatedAt: '2023-06-28',
    },
    {
      id: 2,
      title: 'Issue 2',
      type: 'task',
      description: 'Description for Issue 2',
      status: 'backlog',
      listPosition: 2,
      priority : 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
    //... more issues as needed
    {
      id: 1,
      title: 'Issue 3',
      type: 'task',
      description: 'Description for Issue 1',
      status: 'inprogress',
      listPosition: 1,
      priority : 1,
      userIds: [1],
      updatedAt: '2023-06-28',
    },
    {
      id: 2,
      title: 'Issue 4',
      type: 'task',
      description: 'Description for Issue 2',
      status: 'inprogress',
      listPosition: 2,
      priority : 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
    //... more issues as needed
    {
      id: 1,
      title: 'Issue 5',
      type: 'task',
      description: 'Description for Issue 1',
      status: 'done',
      listPosition: 1,
      priority : 1,
      userIds: [1],
      updatedAt: '2023-06-28',
    },
    {
      id: 2,
      title: 'Issue 6',
      type: 'task',
      description: 'Description for Issue 2',
      status: 'done',
      listPosition: 2,
      priority : 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
    //... more issues as needed
  ],
};

const filtersMock = {
  searchTerm: 'issue',
  userIds: [1],
  myOnly: false,
  recent: true,
};

const currentUserIdMock = 1;

const updateLocalProjectIssuesMock = (issueId, fields) => {
  // This is a mock function, in your actual code this should update the issue with the given fields
  console.log(`Updating issue with id ${issueId}`);
  console.log(fields);
};

const fetchProjectMock = () => {
  // This is a mock function, in your actual code this should fetch the project data
  console.log('Fetching project data');
};


const ProjectBoard = ({ project={projectMock},
  fetchProject={fetchProjectMock}
  ,updateLocalProjectIssues={updateLocalProjectIssuesMock} }) => {


  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <div style={{ marginLeft: '300px', marginTop: '100px' }}>
    
      <Breadcrumbs items={['Projects', projectMock.name, 'Kanban Board']} />
      <Header />
      <Filters
        projectUsers={projectMock.users}
        //defaultFilters={filtersMock} // You should have this defined somewhere
        filters={filtersMock}
        mergeFilters={() => {}} // This should be a function that merges the filters
      />
      <Lists
      project={projectMock}
      filters={filtersMock}
      updateLocalProjectIssues={updateLocalProjectIssuesMock}
      />
    


    </div>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
