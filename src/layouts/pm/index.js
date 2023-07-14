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
import { useLocation } from 'react-router-dom';
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
import { Select } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";

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
        value={defaultValue.toDateString()}
        readOnly
        fullWidth
        InputProps={{
          startAdornment: (
            <DatePicker
              selected={defaultValue}
              onChange={() => { }}
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

const PM = ({ projectInfo }, { project }) => {
  const [projects, setprojects] = useState([project])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [groupMessage, setGroupMessage] = useState("");
  const [groupCodeMessage, setGroupCodeMessage] = useState("");

  const handleGroupClick = () => {
    setGroupMessage("그룹 필드는 수정할 수 없습니다.");
    setTimeout(() => {
      setGroupMessage(""); // 일정 시간 후 메시지 지우기
    }, 2000);
  };

  const handleGroupCodeClick = () => {
    setGroupCodeMessage("그룹 코드 필드는 수정할 수 없습니다.");
    setTimeout(() => {
      setGroupCodeMessage(""); // 일정 시간 후 메시지 지우기
    }, 2000);
  };
  const handleFormSubmit = (event) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    event.preventDefault();
    setIsLoading(true); // Start loading
    // Send form data as JSON using Axios
    axios
      .put("/api/project", formData, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Form submitted successfully", response);
        setIsLoading("success"); // Set loading state to success
        setTimeout(() => {
          alert(response.data.message);
          // Reset form fields and state
          setFormData({
            id: "",
            name: "",
            status: "",
            description: "",
          });
          setIsFormValid(false);
          setIsLoading(false); // Stop loading
        }, 2000); // Wait for 2 seconds
      })
      .catch((error) => {
        console.log(formData);
        console.error("Error submitting form", error);
        setIsLoading("error"); // Set loading state to error
        setTimeout(() => {
          setIsLoading(false); // Stop loading
        }, 2000); // Wait for 2 seconds
      });
  };

  const [formData, setFormData] = useState({
    id: projectInfo.id,
    name: projectInfo.name,
    status: projectInfo.status,
    description: projectInfo.description,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(projectInfo.id);
  console.log(projectInfo.name);
  const defaultValue = '뇌파를 이용한 설문조사 서비스';

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Validate input fields
    if (name === "name" && value.trim() === "") {
      setIsFormValid(false);
    } else if (name === "status" && value.trim() === "") {
      setIsFormValid(false);
    } else if (name === "description" && value.trim() === "") {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
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
                  <MDInput type="text" label="프로젝트 이름" onChange={handleInputChange} name ="name" defaultValue={projectInfo.name} fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput label="그룹" defaultValue={projectInfo.groupName} InputProps={{
                    readOnly: true,
                    onClick: handleGroupClick, // 클릭 이벤트 핸들러 추가
                  }} fullWidth />
                  {groupMessage && (
                    <MDTypography variant="body2" color="error">
                      {groupMessage}
                    </MDTypography>
                  )}
                </MDBox>
                <MDBox mb={2}>
                  <MDInput label="그룹 코드" defaultValue={projectInfo.groupCode} InputProps={{
                    readOnly: true,
                    onClick: handleGroupCodeClick, // 클릭 이벤트 핸들러 추가
                  }} fullWidth />
                  {groupCodeMessage && (
                    <MDTypography variant="body2" color="error">
                      {groupCodeMessage}
                    </MDTypography>
                  )}
                </MDBox>
                <MDBox mb={2}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">상태</InputLabel>
                    <Select
                      label="상태"
                      defaultValue={projectInfo.status}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ height: "5.5vh" }}
                      name="status"
                    >
                      <MenuItem value={"Stopped"}>중단됨</MenuItem>
                      <MenuItem value={"In-progress"}>진행중</MenuItem>
                      <MenuItem value={"Completed"}>완료됨</MenuItem>
                      <MenuItem value={"Not-started"}>시작 전</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="textarea"
                    label="설명"
                    name = "description"
                    defaultValue={projectInfo.description}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDDatePicker
                    label="생성일"
                    defaultValue={new Date(projectInfo.createAt)}
                    onChange={null}
                  />
                </MDBox>
                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                  {isLoading ? (
                    isLoading === "success" ? ( // Render success message if loading state is "success"
                      <MDBox display="flex" alignItems="center">
                        <CircularProgress color="info" size={30} />
                        <MDTypography variant="body2" ml={2}>
                          프로젝트 수정중...
                        </MDTypography>
                      </MDBox>
                    ) : <MDBox display="flex" alignItems="center"></MDBox>
                  ) : (
                    <MDButton
                      variant="gradient"
                      color="info"
                      disabled={!isFormValid}
                      onClick={handleFormSubmit}
                    >
                      수정
                    </MDButton>
                  )}
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
        {/* 
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
      */}
      </MDBox>
    </DashboardLayout>
  );
}
function Overview() {
  const [projects, setProjects] = useState([]);
  const [projectInfo, setProjectInfo] = useState(null);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const location = useLocation();
  console.log(location);
  const id = location.state?.id;
  useEffect(() => {
    async function fetchProjectInfo() {
      try {
        console.log(id);
        const response = await axios.get(`/api/project/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('프로젝트 정보 조회 성공');
        console.log(response.data.data);
        setProjectInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    }

    fetchProjectInfo();
  }, [id, token]);
  // projectInfo가 null일 때 null 반환

  if (!projectInfo) {
    return null;
  }

  return (
    <PM projectInfo={projectInfo} project={projects} />
  );
}

export default Overview;
