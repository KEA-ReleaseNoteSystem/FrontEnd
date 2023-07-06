import React, { useState } from 'react';
import "./index.css"
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from 'components/MDButton';
import MDProgress from 'components/MDProgress';
import ProjectBoardListIssue from 'layouts/Board/Lists/List/Issue/ListAll';
import IssueDetail  from "layouts/issue/IssueDetails/index";


function IssueEditing({ selectedIssue }) {
    console.log(selectedIssue);
    return (
      <Grid item xs={12} id="right" container direction="column" lg={200}>
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
            <IssueDetail  />
            {selectedIssue.title}
          </MDBox>
        </Card>
      </Grid>
    );
  }
  
export default IssueEditing;
