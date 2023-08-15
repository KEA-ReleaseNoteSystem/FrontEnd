import React, { useState } from 'react';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


import { releaseView,releaseViewCopy } from "shared/constants/TableOrTree"
import Select from '@mui/material/Select';
import ReleaseTree from './releaseTree';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/release/data/authorsTableData";


function Release() {
  const { columns, rows } = authorsTableData();

  const [view, setView] = useState('table');

  // Handler for changing the view
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  //릴리스 작성하기 버튼
  const handleRelaseAddOnClick = (event) => {
    console.log("릴리스 추가")
    setAnchorEl(event.currentTarget);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Select
          labelId="filter-select-label"
          id="view-select"
          value={view}
          onChange={handleViewChange}
          sx={{ minHeight: 40 , maxWidth: 60  }}
          displayEmpty
        >
          <MenuItem disabled>
            View
          </MenuItem>
          {Object.values(releaseView).map(view => (
            <MenuItem key={view} value={view}>
              {releaseViewCopy[view]}
            </MenuItem>
          ))}
        </Select>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                width={300}
                mx="auto"
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex" // flex display 설정
                justifyContent="center" 
              >
                <MDTypography variant="h6" color="white">
                  릴리즈 노트 목록
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {view === 'table' ? (
                  <>
                  <DataTable
                    table={{ columns, rows}}
                    isSorted={false}
                    entriesPerPage={10}
                    showTotalEntries={false}
                    noEndBorder
                  />
                  </>
                ) : (
                  <ReleaseTree />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={handleRelaseAddOnClick} href="/release/create">
          <AddCircleOutlineIcon color="info"/>
        </IconButton>
      </div>
    </DashboardLayout>
  );
}

export default Release;
