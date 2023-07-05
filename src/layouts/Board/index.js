import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useMatch, useNavigate } from 'react-router-dom';

import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';
import IssueDetails from './IssueDetails';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import teamTable from "layouts/myteam/data/teamTable";
import projectsTableData from "layouts/myteam/data/projectsTableData";

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



window.projectMock = {
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
      priority: 1,
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
      priority: 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
    //... more issues as needed
    {
      id: 3,
      title: 'Issue 3',
      type: 'task',
      description: 'Description for Issue 1',
      status: 'backlog',
      listPosition: 3,
      priority: 1,
      userIds: [1],
      updatedAt: '2023-06-28',
    },
    {
      id: 4,
      title: 'Issue 4',
      type: 'task',
      description: 'Description for Issue 2',
      status: 'backlog',
      listPosition: 4,
      priority: 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
    //... more issues as needed
    {
      id: 5,
      title: 'Issue 5',
      type: 'task',
      description: 'Description for Issue 1',
      status: 'inprogress',
      listPosition: 1,
      priority: 1,
      userIds: [1],
      updatedAt: '2023-06-28',
    },
    {
      id: 6,
      title: 'Issue 6',
      type: 'task',
      description: 'Description for Issue 2',
      status: 'inprogress',
      listPosition: 2,
      priority: 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
    //... more issues as needed
    {
      id: 7,
      title: 'Issue 7',
      type: 'task',
      description: 'Description for Issue 2',
      status: 'done',
      listPosition: 1,
      priority: 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
    {
      id: 8,
      title: 'Issue 8',
      type: 'task',
      description: 'Description for Issue 2',
      status: 'done',
      listPosition: 2,
      priority: 1,
      userIds: [2],
      updatedAt: '2023-06-29',
    },
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


const ProjectBoard = ({ project = { projectMock },
  fetchProject = { fetchProjectMock }
  , updateLocalProjectIssues = { updateLocalProjectIssuesMock } }) => {


  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (

    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} >
            <Card>
              <MDBox
                mx={1}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Issue
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Filters
                  projectUsers={projectMock.users}
                  //defaultFilters={filtersMock} // You should have this defined somewhere
                  filters={filtersMock}
                  mergeFilters={() => { }} // This should be a function that merges the filters
                />
                </MDBox>
                <MDBox pt={3}>
                <Lists
                  project={projectMock}
                  filters={filtersMock}
                  updateLocalProjectIssues={updateLocalProjectIssuesMock}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>

  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
