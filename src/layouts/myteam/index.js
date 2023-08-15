/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import axios from "axios";
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

import { useRecoilState } from 'recoil';
import { projectIdState } from '../../examples/Sidenav/ProjectIdAtom.js';

function Tables() {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const { columns, rows } = teamTable();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [ projectName, setProjectName ] = useState("");

  const token = localStorage.getItem('ACCESS_TOKEN');

  const getProjectName = async (projectId, token) => {
    try {
      const response = await axios.get(`/api/project/${encodeURIComponent(projectId)}/name`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.length === 0) {
        return "";
      } else {
        return response.data.data.name;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getProjectName(projectId, token);
      setProjectName(data);
    }
    fetchData();
    
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
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
                  {projectName}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
