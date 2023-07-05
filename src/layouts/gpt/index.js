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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PageLayout from "examples/LayoutContainers/PageLayout";
// Data
import issue from "layouts/gpt/data/issue";
const issues = [
  {
    name: "#00 Test issue",
    description: "어쩌구 되지않는 이슈",
    member: "서강덕",
    due: "0000-00-00",
    value: null,
  },
  {
    name: "#00 Test issue",
    description: "어쩌구 되지않는 이슈",
    member: "서지원",
    due: "0000-00-00",
    value: null,
  },
  {
    name: "#00 Test issue",
    description: "어쩌구 되지않는 이슈",
    member: "박재석",
    due: "0000-00-00",
    value: null,
  },
  {
    name: "#00 Test issue",
    description: "어쩌구 되지않는 이슈",
    member: "서지원",
    due: "0000-00-00",
    value: null,
  },
  {
    name: "#00 Test issue",
    description: "어쩌구 되지않는 이슈",
    member: "박도영",
    due: "0000-00-00",
    value: null,
  },
];

function Tables() {
  const { columns, rows } = issue({issues});

  return (
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
                  이슈 리스트
                </MDTypography>
              </MDBox>
              <MDBox pt={6}>
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
            <Grid item xs={12} container justifyContent="center">
            <MDButton color="primary">Chat GPT 추천</MDButton>
            <MDButton color="info" sx={{ml:2}}>저장하기</MDButton>
            </Grid>
        </Grid>
      </MDBox>
  );
}

export default Tables;
