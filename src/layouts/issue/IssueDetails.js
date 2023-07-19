import React, { useState, useEffect } from 'react';
import "./index.css"
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import {IssueStatus,IssueStatusCopy,IssueType,IssueTypeCopy} from "shared/constants/issues"


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
  
  
  export default IssueDetails;