import React, { useState,useEffect } from 'react';
import "./index.css"
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDProgress from 'components/MDProgress';
import ProjectBoardListIssue from 'layouts/Board/Lists/List/Issue/ListAll';
import MDInput from 'components/MDInput';
import Description from 'layouts/issue/IssueDetails/Description';
import Comments from 'layouts/issue/IssueDetails/Comments';

import axios from 'axios';

function IssueSearch() {
  const {  users } = window.projectMock;
  const [fetchedIssues, setFetchedIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const projectId = 1; 

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`/api/${projectId}/issues`);
        setFetchedIssues(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIssues();
  }, [projectId]);

  if (isLoading) {
    return <div>
       <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Stack direction="row" spacing={6}>
          <IssueList issues={fetchedIssues} users={users} isLoading={isLoading} />
        </Stack>
      </MDBox>
      <Footer />
    </DashboardLayout>
    </div>;
    
  }



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Stack direction="row" spacing={6}>
          <IssueList issues={fetchedIssues} users={users} projectId = {projectId} />
        </Stack>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}




function IssueList({ issues, users , isLoading,projectId}) {
  const [issueDetail, setIssueDetail] = useState("");
  const [fetchedMemo, setFetchedMemo] = useState([]);

  const updateIssue = updatedFields => {
    (currentIssue => ({ ...currentIssue, ...updatedFields }));
  };

  console.log("123",updateIssue)
 
  const handleClick = (issue) => {
    setIssueDetail(issue);
    
  };

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        console.log(`Fetching memo for projectId=${projectId}, issueId=${issueDetail.id}`);
        const response = await axios.get(`/api/memo/${projectId}/${issueDetail.id}`);
        console.log('Response:', response.data.data);
        setFetchedMemo(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (issueDetail.id) { 
      fetchMemo();
    }
  }, [issueDetail.id]);
  
  

  console.log("id",issueDetail.id)
  console.log("fetchedMemo",fetchedMemo)

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
          {isLoading == true ? (
            <MDTypography>there is no issues</MDTypography>
          ) : (
            issues.map((issue, index) => (
              <div key={issue.id} onClick={() => handleClick(issue)}>
                <ProjectBoardListIssue
                  projectUsers={users}
                  issue={issue}
                  index={index}
                />
              </div>
            ))
          )}
            
          </MDBox>
        </Card>
      </Grid>

      <Grid item xs={5 }>
        <IssueEditing issue={issueDetail} updateIssue={updateIssue} fetchedMemo={fetchedMemo} />
      </Grid>

      <Grid item xs={4}>
        <IssueDetails issue={issueDetail} />
      </Grid>
    </Grid>
  );
}


function IssueEditing({ issue,updateIssue ,fetchedMemo }) {

  console.log("updateIssue",updateIssue);
  console.log("new issue",issue);
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
        <Grid item xs={12} >

          <MDBox pt={2} px={2}>
            <MDTypography variant="h6">
              이슈 :&nbsp;
              <MDInput variant="standard" defaultValue={issue.title} multiline fullWidth />
            </MDTypography>
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#F0EDEE' }}>
              <MDBox pt={2} px={2} pb={2}>
                <MDTypography variant="body2" fontWeight="medium">
                  세부 설명
                </MDTypography>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="body2">
                    {/* <MDInput variant="standard" defaultValue={info.description} multiline fullWidth /> */}
                    <Description issue={issue} updateIssue={updateIssue} />
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#F0EDEE' }}>
              <MDBox pt={2} px={2} pb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={11} >
                    <MDTypography variant="body2" fontWeight="medium" multiline fullWidth>
                      댓글
                    </MDTypography>
                    {fetchedMemo.length == 0 ?  null : <Comments issue={fetchedMemo} />}
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

function IssueDetails({ issue }) {
  console.log("iii", issue)
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
                  <MDTypography variant="subtitle2" ml={10}>{issue.updatedAt}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">릴리즈 일자</MDTypography>
                  <MDTypography variant="subtitle2" ml={12}>{issue.updatedAt}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">담당자</MDTypography>
                  <MDTypography variant="subtitle2" ml={10}>{issue.id}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">진행률</MDTypography>
                  {/* <MDProgress
                    value={info.progress}
                    color={info.progress < 30 ? "primary" : info.progress < 60 ? "error" : info.progress < 80 ? "warning" : "info"} variant="gradient" label={info.progress} /> */}
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


export default IssueSearch;