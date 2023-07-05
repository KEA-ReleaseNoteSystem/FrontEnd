import "./index.css"
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { IssueStatus } from 'shared/constants/issues';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "./data/authorsTableData";
import projectsTableData from "./data/projectsTableData";
import detail from "./data/detail";
import { DragDropContext } from 'react-beautiful-dnd';
import List from 'layouts/Board/Lists';

import ProjectBoardListIssue from 'layouts/Board/Lists/List/Issue/ListAll';
import { Lists } from 'layouts/Board/Lists/Styles.js';

function OtherTeams() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const { columns: pColumns1, rows: pRows2 } = detail();
  const { issues,users } = window.projectMock
  console.log("window",window.projectMock);
  const filtersMock = {
    searchTerm: 'issue',
    userIds: [1],
    myOnly: false,
    recent: true,
  };

  console.log( "issues:",issues);
  console.log( "users:",users);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>

        <Stack direction="row" spacing={6}>
          <Grid item xs={12} id="left" 
            container
            direction="column"
            justifyContent="left"
            alignItems="left">
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              
              >
                <MDTypography variant="h6" color="white">
                  이슈 목록
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pl={1} pr={1}  width="17vw"  >
        
                {issues.map((issue, index) => (
                 
                  <ProjectBoardListIssue
                    key={issue.id}
                    projectUsers={users}
                    issue={issue}
                    index={index}
                  />
               
                ))}
              </MDBox>
            </Card>
          </Grid>
            
          <Grid item xs={12} id="right" container
            direction="column"
            lg={200}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  이슈 편집
                </MDTypography>
              </MDBox>
              <MDBox pt={3} width="37vw" height="37vw">
                {/* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                


              </MDBox>
            </Card>
          </Grid>



          <Grid item xs={12} id="right" container
            direction="column"
            lg={200}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  세부 정보
                </MDTypography>
              </MDBox>
              <MDBox pt={3} width="25vw" height="25vw">
                {/* <DataTable
                  table={{ columns: pColumns1, rows: pRows2 }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
          </Stack>
        {/* </Grid> */}
    
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OtherTeams;
