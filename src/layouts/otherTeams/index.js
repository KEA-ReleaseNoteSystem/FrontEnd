import { useState, useEffect } from "react";
import axios from "interceptor/TokenCheck.js";
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
import memberprojectTable from "layouts/otherTeams/data/memberprojectTable";
import projectsTableData from "layouts/otherTeams/data/projectsTableData";

import { useRecoilState } from 'recoil';
import { projectIdState } from 'examples/Sidenav/ProjectIdAtom.js';

function OtherTeams() {
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const { columns, rows } = memberprojectTable(setSelectedMemberId);
  const { columns: pColumns, rows: pRows } = projectsTableData(selectedMemberId);
  const [ projectName, setProjectName ] = useState("");
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [projectId, setProjectId] = useRecoilState(projectIdState);


  const getProjectName = async (projectId, token) => {
    try {
      const response = await axios.get(`/api/project/${encodeURIComponent(projectId)}/name`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("response",response.data.data);
      
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
      <Grid container spacing={1}>
        <Grid item xs={12} lg={7} mb={5}>
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
                entriesPerPage={10}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
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
                Projects Table
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns: pColumns, rows: pRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  </DashboardLayout>
  );
}

export default OtherTeams;
