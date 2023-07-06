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
import IssueDetail from "layouts/issue/IssueDetails/index";
import IssueEdit from "layouts/issue/IssueEditing";
import MDInput from 'components/MDInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

function IssueList({ issues, users }) {
  const [issueDetail, setIssueDetail] = useState("");

  const handleClick = (issue) => {
    setIssueDetail(issue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3} id="left">
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
              이슈 목록
            </MDTypography>
          </MDBox>
          <MDBox pt={3} pr={2} pl={2} fullWidth>
            {issues.map((issue, index) => (
              <div onClick={() => handleClick(issue)}>
                <ProjectBoardListIssue
                  key={issue.id}
                  projectUsers={users}
                  issue={issue}
                  index={index}
                />
              </div>
            ))}
          </MDBox>
        </Card>
      </Grid>

      <Grid item xs={5 }>
        <IssueEditing info={issueDetail} />
      </Grid>

      <Grid item xs={4}>
        <IssueDetails info={issueDetail} />
      </Grid>
    </Grid>
  );
}


function IssueEditing({ info }) {

  console.log(info);

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

        {/* <IssueDetail /> */}

        <Grid item xs={12} >

          <MDBox pt={2} px={2}>
            <MDTypography variant="h6">
              이슈 :&nbsp;
              <MDInput variant="standard" defaultValue={info.title} multiline fullWidth />
            </MDTypography>
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#e9e9e9' }}>
              <MDBox pt={2} px={2} pb={2}>
                <MDTypography variant="body2" fontWeight="medium" defaultValue={info.type} multiline fullWidth  >
                  요약
                </MDTypography>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="body2">
                    <MDInput variant="standard" defaultValue={info.discription} multiline fullWidth />
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#e9e9e9' }}>
              <MDBox pt={2} px={2} pb={2}>
                <MDTypography variant="body2" fontWeight="medium">
                  세부 설명
                </MDTypography>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="body2">
                    <MDInput variant="standard" defaultValue={info.description} multiline fullWidth />
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
          <MDBox pt={2} px={2} mb={4}>
            <Card sx={{ backgroundColor: '#e9e9e9' }}>
              <MDBox pt={2} px={2} pb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={2}>
                    <MDTypography variant="body2" fontWeight="medium">
                      댓글
                    </MDTypography>
                  </Grid>
                  <Grid item xs={8}>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography variant="button">

                    </MDTypography>
                  </Grid>
                </Grid>
                <MDBox pt={2} px={2}>

                </MDBox>
              </MDBox>
            </Card>
          </MDBox>

        </Grid>

      </Card>
    </Grid>
  );
}

function IssueDetails({ info }) {
  console.log("iii", info)
  return (
    <Grid container xs={12} id="right"  direction="column" lg={200}>
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
            세부 정보
          </MDTypography>
        </MDBox>

        {/* Your content */}
        <Grid item xs={12}>
          <Card>
            <Grid container>
              <Grid item xs={6}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">생성 일자</MDTypography>
                  <MDTypography variant="subtitle2" ml={10}>{info.updatedAt}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">릴리즈 일자</MDTypography>
                  <MDTypography variant="subtitle2" ml={12}>{info.updatedAt}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">담당자</MDTypography>
                  <MDTypography variant="subtitle2" ml={10}>{info.id}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">진행률</MDTypography>
                  <MDProgress
                    value={info.progress}
                    color={info.progress < 30 ? "primary" : info.progress < 60 ? "error" : info.progress < 80 ? "warning" : "info"} variant="gradient" label={info.progress} />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={6} px={2} pb={3}>
                  <MDTypography variant="subtitle2">
                    백로그: 0<br />
                    진행중: 0<br />
                    완료: 0
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Card>
    </Grid>
  );
}

function OtherTeams() {
  const { issues, users } = window.projectMock;
  console.log("window", window.projectMock);
  console.log("issues:", issues);
  console.log("users:", users);





  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Stack direction="row" spacing={6}>
          <IssueList issues={issues} users={users} />

        </Stack>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OtherTeams;
