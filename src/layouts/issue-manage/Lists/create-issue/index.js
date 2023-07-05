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
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";

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
import LinearScaleIcon from '@mui/icons-material/LinearScale';

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

function MDIssueType({ label, value, onChange }) {
  const [selecteType, setSelecteType] = useState(value);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBug = () => {
    setSelecteType("버그");
    handleClose();
  };

  const handleFeat = () => {
    setSelecteType("기능");
    handleClose();
  };

  const handleImprove = () => {
    setSelecteType("개선")
    handleClose();
  };

  return (
    <MDBox mb={2}>
      <MDInput
        label={label}
        value={selecteType}
        fullWidth
        InputProps={{
          startAdornment: (
            <div>
            <IconButton onClick={handleClick}>
              <LinearScaleIcon />
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleBug}>버그</MenuItem>
            <MenuItem onClick={handleFeat}>기능</MenuItem>
            <MenuItem onClick={handleImprove}>개선</MenuItem>
          </Menu>
          </div>
          ),
        }}
      />
    </MDBox>
  );
}


function Overview(name) {
  const defaultValue = '뇌파를 이용한 설문조사 서비스';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [issueType, setIssueType] = useState(""); // 선택된 이슈 타입을 저장하는 상태

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

  const handleIssueTypeChange = (type) => {
    setIssueType(type);
  };

  return (
      <MDBox pt={3} pb={3}>
        <Grid>
          <Grid item xs={12}>
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
                  ADD Issue
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
                <MDBox mb={2}>
                  <MDInput type="text" label="이슈 제목" fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="작성자" defaultValue="서강덕" disabled fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDIssueType
                    label="타입"
                    value={issueType} // 선택된 이슈 타입을 전달
                    onChange={handleIssueTypeChange} // 선택된 이슈 타입 변경 시 호출되는 핸들러 함수
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDDatePicker
                    label="생성일"
                    disabled
                    defaultValue={new Date()}
                    onChange={handleDateChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="textarea" label="설명" rows={4} multiline fullWidth />  
                </MDBox>
                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                  <MDButton variant="gradient" color="info">
                    추가
                  </MDButton>
                </MDBox>
              </MDBox>
          </Grid>
        </Grid>
      </MDBox>
  );
}

export default Overview;
