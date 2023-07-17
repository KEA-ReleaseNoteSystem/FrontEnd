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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// @mui icons


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components


import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// ... 이전 코드 생략 ...

function Overview(info, description) {
    console.log(info);
  const [member, setMember] = useState({
    fullName: info.info.fullName,
    nickname: info.info.nickname,
    position: info.info.position,
    groupName: info.info.team,
    introduce: info.description
  });

  const handleOnClickEdit = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    axios.patch('/api/member', member, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      } ) // 멤버 정보를 수정하는 API 엔드포인트를 적절히 변경해야 합니다.
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error updating member info:', error);
      });
  }

  return (
    <>
      <MDBox pb={3}>
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
                  Member Info
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
                <MDBox mb={2}>
                  <MDInput type="text" label="Full-Name" defaultValue={member.fullName} disabled fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="GroupName" defaultValue={member.groupName} disabled fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="NickName" value={member.nickname} onChange={(e) => setMember({ ...member, nickname: e.target.value })} fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="Position" value={member.position} onChange={(e) => setMember({ ...member, position: e.target.value })} fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="introduce" value={member.in} onChange={(e) => setMember({ ...member, introduce: e.target.value })} fullWidth/>
                </MDBox>
                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                  <MDButton variant="gradient" color="info" onClick={handleOnClickEdit}>
                    Edit
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default Overview;
