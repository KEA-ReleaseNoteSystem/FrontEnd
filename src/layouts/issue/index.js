import React, { useState, useEffect } from 'react';
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
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import axios from 'axios';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {IssueStatus,IssueStatusCopy,IssueType,IssueTypeCopy} from "shared/constants/issues"

function IssueSearch() {
  const { users } = window.projectMock;
  const [fetchedIssues, setFetchedIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const projectId = 1;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [issueDetail, setIssueDetail] = useState("");
  const [fetchedMemo, setFetchedMemo] = useState([]);
  const [membersData, setMembersData] = useState([]); //프로젝트에 속한 멤버들 정보

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issuesResponse = await axios.get(`/api/${projectId}/issues`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFetchedIssues(issuesResponse.data.data);
  
        const membersResponse = await axios.get(`/api/project/${encodeURIComponent(projectId)}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMembersData(membersResponse.data.data);
  
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [projectId, token]);



  

  
    const updateIssue = async (updatedFields) => {
    try {
      // API를 호출하여 이슈 업데이트
      const response = await axios.put(`/api/${projectId}/issues/${issueDetail.id}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("updatedFields",updatedFields);

      // 업데이트된 이슈를 반영하기 위해 fetchedIssues 배열에서 해당 이슈를 찾아 업데이트
      const updatedIssues = fetchedIssues.map((issue) => {
        if (issue.id === issueDetail.id) {
          return {
            ...issue,
            ...updatedFields
          };
        }
        return issue;
      });

      console.log("updatedIssues new",updatedIssues);

      // 업데이트된 이슈 목록을 설정
      setFetchedIssues(updatedIssues);

      // 이슈 상세 정보 업데이트
      setIssueDetail((prevIssue) => ({
        ...prevIssue,
        ...updatedFields
      }));
    } catch (error) {
      console.error(error);
    }
  };



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



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Stack direction="row" spacing={6}>
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
                  {isLoading ? (
                    <MDTypography>There are no issues</MDTypography>
                  ) : (
                    fetchedIssues.map((issue, index) => (
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

            <Grid item xs={5}>
              <IssueEditing issue={issueDetail} updateIssue={updateIssue} fetchedMemo={fetchedMemo} />
            </Grid>

            <Grid item xs={4}>
              <IssueDetails issue={issueDetail} membersData ={membersData} updateIssue={updateIssue}/>
            </Grid>
          </Grid>
        </Stack>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}


function IssueEditing({ issue, updateIssue, fetchedMemo }) {


  // console.log("updateIssue",updateIssue);

  const [Memo, setMemo] = useState(fetchedMemo);

  useEffect(() => {
    setMemo(fetchedMemo);
  }, [updateIssue]);

  console.log("issue",issue);
  console.log("fetchedMemo",Memo)


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
        
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#F0EDEE' }}>
              <MDBox pt={2} px={2} pb={2}>
               
                <MDBox pt={2} px={2}>
                  <MDTypography variant="body2">
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
                    {issue.length == 0 ?  null : <Comments issue={issue} memo={Memo} fetchedMemo={fetchedMemo} setMemo={setMemo} />}
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

function IssueDetails({ issue ,membersData ,updateIssue }) {
  
  const [isToggled, setIsToggled] = useState(false);
  const [memberInCharge, setmemberInCharge] = useState('');
  const [mystatus, setStatus] = useState('');
  const [issueType, setIssueType] = useState('');


  console.log("memberInCharge",memberInCharge);
  console.log("statusstatusstatus",issue.status);
  console.log("issueType", issue.issueType );

  useEffect(() => {
    setmemberInCharge(issue ? issue.memberIdInCharge.nickname : '');
    setStatus(issue ? issue.status : '')
    setIssueType(issue ? issue.issueType : '')
  }, [issue,updateIssue]);


  
  const memberList2 = membersData && membersData.map((member) => (
    <MenuItem value={member.name}>
        {member.name}
    </MenuItem>
));

  
  const handleMemberInCharge = (event) => {
    setmemberInCharge(event.target.value);
};



  return (
    <Grid container xs={12} id="right" direction="column" lg={200}>
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
                  <MDTypography variant="subtitle2" ml={10}>{issue.length == 0 ? null : issue.createdAt.slice(0, 10)}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">수정 일자</MDTypography>
                  <MDTypography variant="subtitle2" ml={10}>{issue.length == 0 ? null : issue.updatedAt}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">릴리즈 노트</MDTypography>
                  <MDTypography variant="subtitle2" ml={10}>{issue.length == 0 ? null : issue.releasenote}</MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">담당자  <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={memberInCharge}
                                                        onChange={handleMemberInCharge}
                                                        sx={{ minHeight: 50 }}
                                                    >
                                                        {memberList2}
                                                    </Select></MDTypography>
                  <MDTypography variant="subtitle2" ml={10}>
                 
                  </MDTypography>
                 
                  {console.log("detail",issue)}
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h6">보고자  
                  <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={memberInCharge}
                      onChange={handleMemberInCharge}
                      sx={{ minHeight: 50 }}
                  >
                      {memberList2}
                  </Select></MDTypography>
                 
                </MDBox>
              </Grid>
              <Grid item xs={12}>    
              </Grid>
            </Grid>
          </Card>
        </Grid>
            <Select
      labelId="status-select-label"
      id="status-select"
      value={mystatus}
      onChange={event => updateIssue({status: event.target.value })}
      sx={{ minHeight: 50 }}
    >
      {Object.values(IssueStatus).map(status => (
        <MenuItem key={status} value={status}>
          {IssueStatusCopy[status]}
        </MenuItem>
      ))}
    </Select>
    
      </Card>
      <Select
      labelId="type-select-label"
      id="type-select"
      value={issueType}
      onChange={event => updateIssue({issueType : event.target.value })}
      sx={{ minHeight: 50 }}
    >
      {Object.values(IssueType).map(type => (
        <MenuItem key={type} value={type}>
          {IssueTypeCopy[type]}
        </MenuItem>
      ))}
      </Select>
    </Grid>
  );
}


export default IssueSearch;