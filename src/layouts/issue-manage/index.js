import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';


import Filters from './Filters';
import Lists from './Lists';


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

/*
   // {
    //   id: 1,
    //   name: 'Project 1',
    //   users: [
    //     { id: 1, name: 'User 1', email: 'user1@example.com', avatarUrl: 'avatar1url' },
    //     { id: 2, name: 'User 2', email: 'user2@example.com', avatarUrl: 'avatar2url' },
    //   ],
    //   issues: [
    //     {
    //         id: 3,
    //         title: 'Issue 3',
    //         type: 'task',
    //         description: 'Description for Issue 1',
    //         status: 'backlog',
    //         comments : [
    //           {user : {name:"park", avatarUrl:'avatar1url'}, createdAt:"2023-06-29",body:"댓글 3"}
    //       ],
    //         listPosition: 3,
    //         priority: 90,
    //         userIds: [1],
    //         createdAt: '2023-06-28',
    //     },
    //     {
    //       id: 4,
    //       title: 'Issue 4',
    //       type: 'task',
    //       description: 'Description for Issue 2',
    //       status: 'backlog',
    //       comments : [
    //         {user : {name:"park", avatarUrl:'avatar1url'}, createdAt:"2023-06-29",body:"댓글 4"}
    //     ],
    //       listPosition: 4,
    //       priority: 99,
    //       userIds: [2],
    //       createdAt: '2023-06-29',
    //     },
    //     {
    //       id: 6,
    //       title: 'Issue 6',
    //       type: 'task',
    //       description: 'Description for Issue 2',
    //       status: 'inprogress',
    //       comments : [
    //         {user : {name:"park", avatarUrl:'avatar1url'}, createdAt:"2023-06-29",body:"댓글 6"}
    //     ],
    //       listPosition: 2,
    //       priority: 10,
    //       userIds: [2],
    //       createdAt: '2023-06-29',
    //     },
    //   ],
    // }
*/


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


const ProjectBoard = () => {
  const [projectMock, setProjectMock] = useState();

  const getAPI = async () => {
    const response = await axios.get(`/api/project/1/issues/management`);
    console.log('== response == : ', response.data.data);
    setProjectMock(response.data.data);
  }

  useEffect(() => {
    getAPI();
    // 5초마다 getAPI를 호출하는 인터벌 생성
    // const intervalId = setInterval(getAPI, 5000);
    console.log("5초가 지났으니 정보를 다시 받아와보아요!")

    // 컴포넌트가 언마운트될 때 인터벌 정리
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

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
                  // projectUsers={projectMock.users}
                  //defaultFilters={filtersMock} // You should have this defined somewhere
                  filters={filtersMock}
                  mergeFilters={() => { }} // This should be a function that merges the filters
                />
              </MDBox>

              <MDBox pt={3}>
                {!projectMock ? null :
                  <>
                    <Lists
                      project={projectMock}
                      filters={filtersMock}
                      updateLocalProjectIssues={updateLocalProjectIssuesMock}
                    />
                  </>
                }
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
