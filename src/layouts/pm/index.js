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
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "./components/MemberCards"

// Overview page components
import Header from "layouts/pm/components/Header";
import PlatformSettings from "layouts/pm/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function MDDatePicker({ label, defaultValue, onChange }) {
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <MDBox mb={2}>
      <MDInput
        type="text"
        label={label}
        value={selectedDate.toDateString()}
        readOnly
        fullWidth
        InputProps={{
          startAdornment: (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              customInput={<CalendarTodayIcon />}
            />
          ),
        }}
      />
    </MDBox>
  );
}


function Overview() {
  const defaultValue = '뇌파를 이용한 설문조사 서비스';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects') // API 엔드포인트를 적절히 변경해야 합니다.
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputWidth(event.target.value.length * 8);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
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
                  Project Manage
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
                <MDBox mb={2}>
                  <MDInput type="text" label="프로젝트 이름" defaultValue="BrainForm" fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="그룹" defaultValue="kakao99%" fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="상태" defaultValue="stop" fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDDatePicker
                    label="생성일"
                    defaultValue={new Date()}
                    onChange={handleDateChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="textarea" label="설명" defaultValue="뇌파를 이용한 설문조사 서비스" fullWidth />
                </MDBox>
                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                  <MDButton variant="gradient" color="info" >
                    Edit
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium">
          Members
        </MDTypography>
        <MDBox mb={1}>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
      <Grid container spacing={6}>
      {projects.map(member => (
        <Grid item xs={12} md={6} xl={3} key={member.id}>
          <DefaultProjectCard
            image={member.image}
            name={member.name}
            position={member.position}
            action={{
              type: "external",
              route: "/pages/profile/profile-overview",
              color: "error",
              label: "Delete",
            }}
          />
        </Grid>
      ))}
    </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
