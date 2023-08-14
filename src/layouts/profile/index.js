import { React, useState, useEffect, useRef} from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// Data
// Images
import homeDecor2 from "assets/images/home-decor-2.jpg";


import CalendarHeatmap from "layouts/profile/components/heatmap.js"

function Overview() {
  const [memberInfo, setMemberInfo] = useState([]);


  const fixedWidthStyle = {
    maxWidth: '1440px',
    margin: '0 auto',
    overflowX: 'hidden'
};


  const currentDate = new Date();
  const currentYear = currentDate.getFullYear()
  console.log("memberInfo", memberInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const response = await axios.get("/api/member", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        setMemberInfo(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(memberInfo);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={fixedWidthStyle}>
      <Header>
      

        <MDBox mt={5}  >
        <Grid container style={{ width: '1310px' }}>
            <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
              <ProfileInfoCard
                title="profile information"
                description={memberInfo.introduce}
                info={{
                  fullName: memberInfo.name,
                  nickname: memberInfo.nickname,
                  team: memberInfo.groupName,
                  position: memberInfo.position,
                  email: memberInfo.email,
                  issueScore: memberInfo.exp,
                }}
                memberId = {memberInfo.id}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 
          <Card sx={{ height: "80%", width: "calc(100% - 350px)", backgroundColor: "#f9fbfb", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
          <Grid mt={2.2} ml={2}  container justifyContent="center">
          <Grid item xs={12} sx={{display: "flex"}}>
          
            <MDTypography  variant="body2" fontWeight="medium" ml={1}>{currentYear}년의 기여 표</MDTypography>
          </Grid>

          <MDBox>
            <CalendarHeatmap issueScore={memberInfo.exp} />
          </MDBox>

        </Grid>
        </Card>
            
            </Grid>
          </Grid>
        </MDBox>


     

      <br/>
      <Card>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {memberInfo.projectList && memberInfo.projectList.map((project, index) => (
              <Grid item xs={12} md={6} xl={3} key={index}>
                <DefaultProjectCard
                  image={homeDecor2}
                  title={project.name}
                  description={project.description}
                  id = {project.id}
                  action={{
                    type: "internal",
                    color: "info",
                    label: "view project",
                    route: "/dashboard",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </MDBox>
        </Card>
    </Header>
    </div>
    </DashboardLayout>
  );
}

export default Overview;
