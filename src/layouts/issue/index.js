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
import { IssueSearchBar, IssueSearchBarCopy, IssueStatus, IssueStatusCopy, IssueType, IssueTypeCopy } from "shared/constants/issues"
import Button from '@mui/material/Button';
import IssueDetails from './IssueDetails';
import IssueEditing from './IssueEditing';
import MyTree from './MyTree';
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../examples/Sidenav/ProjectIdAtom';
import SearchIcon from '@mui/icons-material/Search';

function IssueSearch() {
  const [fetchedIssues, setFetchedIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [issueDetail, setIssueDetail] = useState([]);
  const [fetchedMemo, setFetchedMemo] = useState([]);
  const [membersData, setMembersData] = useState([]); //프로젝트에 속한 멤버들 정보
  const [filter, setFilter] = useState("");
  const [init, setInit] = useState(false);
  const [searchBar, setSearchBar] = useState();
  const [searchFilter, setSearchFilter] = useState();
  const [firstfilter, setFirstfilter] = useState("");
  const [secfilter, setSecfilter] = useState("");
  const [thirdfilter, setThridfilter] = useState("");
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(0);
  const [childIssues,setChildIssues] = useState();
  

  const updateChildIssues = (updatedChildIssues) => {
    setIssueDetail((prevIssue) => ({
      ...prevIssue,
      childIssue: updatedChildIssues,
    }));
  
    const updatedIssues = fetchedIssues.map((fetchedIssue) => {
      if (fetchedIssue.id === issueDetail.id) {
        return {
          ...fetchedIssue,
          childIssue: updatedChildIssues,
        };
      }
      return fetchedIssue;
    });
  
    setFetchedIssues(updatedIssues);
    setChildIssues(updatedChildIssues);
  };
  
  const deleteChild = async (issue, issueIndex) => {
    try {
      let result = await axios.delete(
        `/api/project/${projectId}/issues/${issueDetail.id}/parentchild/${issue.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Successfully deleted the issue, now let's remove it from childIssues.
      const updatedChildIssues = issueDetail.childIssue.filter(
        (child) => child.id !== issue.id
      );
  
      updateChildIssues(updatedChildIssues);
    } catch (error) {
      console.error('Error making the request:', error.message);
      console.error('Full error object:', error);
      console.error('Server error message:', error.response.data.message);
    }
  };
  
  const createChildIssue = async (issues) => {
    try {
      var now = new Date().toISOString();
      const results = await Promise.all(issues.map(async (childIssue) => {
        let result = await axios.post(
          `/api/${projectId}/issues/${issueDetail.id}/childissue`,
          {
            parentIssueId: issueDetail.id,
            childIssueId: childIssue.id,
            createdAt: now,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return {
          id: childIssue.id,
          issueNum: childIssue.issueNum,
          title: childIssue.title,
          issueType: childIssue.issueType,
          description: childIssue.description,
          status: childIssue.status,
          importance: childIssue.importance,
          createdAt: childIssue.createdAt,
          memberIdInCharge: {
            name: childIssue.memberIdInCharge.name,
            nickname: childIssue.memberIdInCharge.nickname,
          },
          child: true,
        };
      }));
      const updatedChildIssues = [...issueDetail.childIssue, ...results];
      updateChildIssues(updatedChildIssues);
      console.log('fetchedIssues', fetchedIssues);
    } catch (error) {
      console.error('Error making the request:', error.message);
      console.error('Full error object:', error);
    }
  };

  const memberList2 = membersData && membersData.map((member) => (
    <MenuItem value={member.name}>
      {member.name}
    </MenuItem>
  ));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const issuesResponse = await axios.get(`/api/${encodeURIComponent(projectId)}/issues`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setFetchedIssues(issuesResponse.data.data);

        const membersResponse = await axios.get(`/api/project/${encodeURIComponent(projectId)}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMembersData(membersResponse.data.data);
        setIssueDetail(issuesResponse.data.data[0]);
        setChildIssues(issuesResponse.data.data[0].childIssue);
        console.log("!! ***response: " , issuesResponse.data);
        console.log("issuesResponse.data.data[0]",issuesResponse.data.data[0])

        { !issuesResponse.data.data[0] ? setIsLoading(true) : setIsLoading(false) }

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId, token]);

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

  const handleOnClickSearchIssue = async () => {
    try {
      const issuesResponse = await axios.get(`/api/issues?title=${searchBar}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFetchedIssues(issuesResponse.data.data);
      console.log(issuesResponse.data);

      const membersResponse = await axios.get(`/api/project/${encodeURIComponent(projectId)}/members`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembersData(membersResponse.data.data);
      setIssueDetail(issuesResponse.data.data[0]);
      setChildIssues(issuesResponse.data.data[0].childIssue);

      console.log("issuesResponse.data.data[0]", issuesResponse.data.data[0]);

      setIsLoading(!issuesResponse.data.data[0]);

    } catch (error) {
      console.error(error);
    }
  };


  const updateIssue = async (updatedFields) => {
    try {
      // API를 호출하여 이슈 업데이트
      const response = await axios.put(`/api/project/${projectId}/issues/${issueDetail.id}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedFieldsWithDate = {
        ...updatedFields,
        updatedAt: new Date().toISOString()
      };


      // 업데이트된 이슈를 반영하기 위해 fetchedIssues 배열에서 해당 이슈를 찾아 업데이트
      const updatedIssues = fetchedIssues.map((issue) => {
        if (issue.id === issueDetail.id) {
          return {
            ...issue,
            ...updatedFieldsWithDate
          };
        }
        return issue;
      });

      // 업데이트된 이슈 목록을 설정
      setFetchedIssues(updatedIssues);

      // 이슈 상세 정보 업데이트
      setIssueDetail((prevIssue) => ({
        ...prevIssue,
        ...updatedFieldsWithDate
      }));
    } catch (error) {
      console.error(error);
    }
  };


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

    let url = `/api/${projectId}/issues?`;


    for (const [key, value] of Object.entries(filters)) {

      if (value == null) {
        continue;
      }
      url += `${key}=${value}&`;
    }

    console.log("url", url);
    filterIssue(url);
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
      { response.data.data[0] == undefined ? setIsLoading(true) : setIsLoading(false) }
    } catch (error) {
      console.error(error);
    }
  };


  const handleFilterstatus = (event) => {
    const selectedValue = event.target.value;
    setFirstfilter(selectedValue)
  }

  const handleFiltertype = (event) => {
    const selectedValue = event.target.value;
    setSecfilter(selectedValue)
  }

  const handleFiltermember = (event) => {
    const selectedValue = event.target.value;
    setThridfilter(selectedValue)
  }

  const handleRefresh = () => {
    setFirstfilter("");
    setSecfilter("");
    setThridfilter("");
    filterIssue(`/api/project/${projectId}/issues?`);
  }


  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSearchBarChange = (event) => {
    setSearchBar(event.target.value);
  };

  const handleClick = (issue, issueIndex) => {
    setIssueDetail(issue);
    setSelectedIssueIndex(issueIndex);
    setChildIssues(issue.childIssue);
    setInit(false);
  };

  console.log("init", init);

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

          <MDInput variant="standard" defaultValue={searchBar} onChange={handleSearchBarChange} style={{ paddingTop: '12px' }} />

          <IconButton onClick={handleOnClickSearchIssue}>
              <SearchIcon color="info" />
            </IconButton>

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
                  {isLoading ? (
                    <MDTypography>There are no issues</MDTypography>
                  ) : (
                    fetchedIssues.map((issue, index) => (
                      <div
                        key={issue.id}
                        onClick={() => handleClick(issue, index)}
                      >
                        <ProjectBoardListIssue
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

            <Grid item xs={5}>
              {isLoading ? null : <IssueEditing issue={issueDetail} updatedchildIssues={childIssues} updateIssue={updateIssue} deleteChild={deleteChild}
               fetchedMemo={fetchedMemo} projectId ={projectId} createChildIssue={createChildIssue} />}
            </Grid>
            <Grid item xs={4}>

              {isLoading ? null : <IssueDetails issue={issueDetail}  membersData={membersData} updateIssue={updateIssue} 
              memberReport={issueDetail.memberReport.name} memberCharge={issueDetail.memberIdInCharge.name} />}
              {isLoading ? null : <MyTree issue={issueDetail} />}

            </Grid>
          </Grid>
    
        </Stack>
      </MDBox>

    </DashboardLayout>
  );
}




export default IssueSearch;