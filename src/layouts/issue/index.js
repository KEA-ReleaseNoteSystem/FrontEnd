import React, { useState, useEffect } from 'react';
import "./index.css"
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDProgress from 'components/MDProgress';
import ProjectBoardListIssue from 'layouts/Board/Lists/List/Issue/ListAll';
import MDInput from 'components/MDInput';
import Description from 'layouts/issue/IssueDetails/Description';
import Comments from 'layouts/issue/IssueDetails/Comments';
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import axios from 'axios';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {IssueSearchBar,IssueSearchBarCopy,IssueStatus,IssueStatusCopy,IssueType,IssueTypeCopy} from "shared/constants/issues"
import Button from '@mui/material/Button';
import { FilterComponent } from './FilterComponent';


function IssueSearch() {
  const { users } = window.projectMock;
  const [fetchedIssues, setFetchedIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const projectId = 1;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [issueDetail, setIssueDetail] = useState([]);
  const [fetchedMemo, setFetchedMemo] = useState([]);
  const [membersData, setMembersData] = useState([]); //프로젝트에 속한 멤버들 정보
  const [filter,setFilter] = useState("");
  const [init,setInit] = useState(false);
  
  const [searchBar,setSearchBar] = useState();
  const [searchFilter,setSearchFilter] = useState();
  const [firstfilter,setFirstfilter] = useState("");
  const [secfilter,setSecfilter] = useState("");
  const [thirdfilter,setThridfilter] = useState("");
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(0);


  const memberList2 = membersData && membersData.map((member) => (
    <MenuItem value={member.name}>
        {member.name}
    </MenuItem>
));


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
        setIssueDetail(issuesResponse.data.data[0])
        {!issuesResponse ? setIsLoading(true) : setIsLoading(false)}
        
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
  

  const filterIssue = async (url) => {
    try {
      
      // URL에서 마지막 '&' 문자 제거
      url = url.slice(0, -1);

      // API 호출하여 이슈 업데이트
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // 필터링된 이슈 목록 설정
      setFetchedIssues(response.data.data);
      setInit(true);
      setSelectedIssueIndex(0);
      setIssueDetail(response.data.data[0])
      {response.data.data[0] == undefined  ? setIsLoading(true) : setIsLoading(false)}
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleFilterstatus = (event) =>{
    const selectedValue = event.target.value;
    setFirstfilter(selectedValue)
  }

  

  const handleFiltertype = (event) =>{
    const selectedValue = event.target.value;
    setSecfilter(selectedValue)
  }

  const handleFiltermember = (event) =>{
    const selectedValue = event.target.value;
    setThridfilter(selectedValue)
  }


  const handleFilter = (event) => {
    const selectedValue = event.target.value;
    const newFilter = [...filter, selectedValue];
    setFilter((prevFilters) => [...prevFilters, selectedValue]);

    
    var filters = {
      status: null,
      type: null,
      username: null,
    };
  
    for (let i = 0; i < newFilter.length; i++) {
      if (newFilter[i].toUpperCase() in IssueStatus) {
        filters.status = newFilter[i];
      } else if (newFilter[i].toUpperCase() in IssueType) {
        filters.type = newFilter[i];
      } else if (membersData.some(member => member.name === newFilter[i])) {
        filters.username = newFilter[i];
      }
    }
    
    let url = "/api/1/issues?";
    

    for (const [key, value] of Object.entries(filters)) {

      if(value == null){
        continue;
      }
      url += `${key}=${value}&`;
    }

  
    filterIssue(url);
  };

  const handleRefresh = () => {
    setFirstfilter("");
    setSecfilter("");
    setThridfilter("");
    filterIssue("/api/1/issues?"); 
  }


  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSearchBarChange = (event) => {
    setSearchBar(event.target.value);
  };
  
  const handleClick = (issue,issueIndex) => {
    setIssueDetail(issue);
    setSelectedIssueIndex(issueIndex);
    setInit(false);
    
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

   
      fetchMemo();
    
  }, [!issueDetail ? null : issueDetail.id]);



  console.log("init",init);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={0.5} pb={3}>
      <MDBox pt={0} pb={6}>
          <Select
              labelId="searchbar-select-label"
              id="searchbar-select"
              value={searchFilter}
              onChange={
                handleSearchFilterChange
              }
              sx={{ minHeight: 40 }}
              displayEmpty 
            >
            <MenuItem disabled>
          이슈 검색 필터
        </MenuItem>
          {Object.values(IssueSearchBar).map(status => (
            <MenuItem key={status} value={status}>
              {IssueSearchBarCopy[status]}
            </MenuItem>
          ))}     
        </Select>
        
        <MDInput variant="standard" defaultValue={searchBar} onChange={handleSearchBarChange} style={{ paddingTop: '12px' }}/>
           
        &nbsp; &nbsp; &nbsp;

        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={firstfilter}
          onChange={(event) => {
            handleFilter(event);
            handleFilterstatus(event);
          }}
          sx={{ minHeight: 40 }}
          displayEmpty 
          renderValue={(value) => value === "" ? "상태" : `상태 : ${value}`}
        >
        <MenuItem disabled>
      상태 필터
    </MenuItem>
      {Object.values(IssueStatus).map(status => (
        <MenuItem key={status} value={status}>
          {IssueStatusCopy[status]}
        </MenuItem>
      ))}     
    </Select>
    &nbsp; &nbsp;

          <Select
        labelId="type-filter-select-label"
        id="type-filter-select"
        value={secfilter}
        onChange={(event) => {
          handleFilter(event);
          handleFiltertype(event);
        }}
        sx={{ minHeight: 40 }}
        displayEmpty
        renderValue={(value) => value === "" ? "타입" : `타입 : ${value}`}
        >
          <MenuItem disabled>
            타입 필터
          </MenuItem>
          {Object.values(IssueType).map(type => (
            <MenuItem key={type} value={type}>
              {IssueTypeCopy[type]}
            </MenuItem>
          ))}
        </Select>
        &nbsp; &nbsp;

        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={thirdfilter}
          onChange={(event) => {
            handleFilter(event);
            handleFiltermember(event);
          }}
          displayEmpty 
          renderValue={(value) => value === "" ? "담당자" : `담당자 : ${value}`}
          sx={{ minHeight: 40 }}
          >
              <MenuItem disabled>
            해당 이슈 담당자
          </MenuItem>
          {memberList2}
                </Select>
          <Button onClick={handleRefresh}>새로고침</Button>
                    </MDBox>
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
                    이슈 목록 &nbsp;
                  </MDTypography>
                </MDBox>
                
                <MDBox pt={3} pr={2} pl={2} fullWidth>
                {console.log("isLoading",isLoading)}
                {isLoading ? (
                  <MDTypography>There are no issues</MDTypography>
                ) : (
                  fetchedIssues.map((issue, index) => (
                    <div
                      key={issue.id}
                      onClick={() => handleClick(issue,index)}
                    >
                
                      <ProjectBoardListIssue 
                        projectUsers={users}
                        issue={issue}
                        index={index}
                        selected={selectedIssueIndex === index} 

                      />
                    </div>
                    ))
                  )}
                </MDBox>
              </Card>
              
            </Grid>
            
            {console.log("issueDetail1",issueDetail)}
            {console.log("updateIssue1",updateIssue)}
            {console.log("fetchedMemo1",fetchedMemo)}
            <Grid item xs={5}>
              {isLoading ? null : <IssueEditing issue={issueDetail} updateIssue={updateIssue} fetchedMemo={fetchedMemo} /> }
            </Grid>
            <Grid item xs={4}>
              {isLoading ? null :<IssueDetails issue={issueDetail} membersData ={membersData} updateIssue={updateIssue}/> }
            </Grid>
          </Grid>
        </Stack>
      </MDBox>
     
    </DashboardLayout>
  );
}


function IssueEditing({ issue, updateIssue, fetchedMemo }) {


  // console.log("updateIssue",updateIssue);

  const [Memo, setMemo] = useState(fetchedMemo);

  useEffect(() => {
    setMemo(fetchedMemo);
  }, [updateIssue]);

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
                     <Comments issue={issue} memo={Memo} fetchedMemo={fetchedMemo} setMemo={setMemo}/>
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
  
  const [memberInCharge, setmemberInCharge] = useState('');
  const [mystatus, setStatus] = useState('');
  const [issueType, setIssueType] = useState('');



  useEffect(() => {
    // setmemberInCharge(issue ? issue.memberIdInCharge.nickname : '');
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
                  <MDTypography variant="subtitle2" ml={10}>{issue.length == 0 ? null : issue.createdAt.slice(0,10)}</MDTypography>
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
                                                        displayEmpty 
                                                        >
                                                            <MenuItem disabled value="">
                                                          해당 이슈 담당자
                                                        </MenuItem>
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
                       displayEmpty 
                    >
                        <MenuItem disabled value="">
                      해당 이슈 보고자
                    </MenuItem>
                  
                      {memberList2}
                  </Select></MDTypography>
                 
                </MDBox>
              </Grid>
              <Grid item xs={12}>    
              </Grid>
            </Grid>
          </Card>
        </Grid>
           
      </Card>
      <br/>
     
      <Select
      labelId="status-select-label"
      id="status-select"
      value={mystatus}
      onChange={event => updateIssue({status: event.target.value })}
      sx={{ minHeight: 50 }}
      displayEmpty 
      >
          <MenuItem disabled value="">
        이슈 상태 변경
      </MenuItem>
                  
      {Object.values(IssueStatus).map(status => (
        <MenuItem key={status} value={status}>
          {IssueStatusCopy[status]}
        </MenuItem>
      ))}
    </Select>
    
    <Select
      labelId="type-select-label"
      id="type-select"
      value={issueType}
      onChange={event => updateIssue({issueType : event.target.value })}
      sx={{ minHeight: 50 }}
      displayEmpty 
      >
          <MenuItem disabled value="">
        이슈 타입 변경
      </MenuItem>
    
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