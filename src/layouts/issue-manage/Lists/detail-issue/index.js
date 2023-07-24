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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";




function Overview(issue) {
  const navigate = useNavigate();
  const token = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    axios.get('/api/projects') // API 엔드포인트를 적절히 변경해야 합니다.
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  

  const handleOnClickDeleteIssue = async () => {
    await axios.delete(`api/issue/${issue.issue.id}`,{
      headers: {
          Authorization: `Bearer ${token}`
      }
  });

  navigate(0);
  }

  return (
    <MDBox pb={3}>
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
              Issue #{issue.issue.id}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
            <MDBox mb={2}>
              <MDInput type="text" label="제목" defaultValue={issue.issue.title} disabled fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="보고자" defaultValue="서강덕" disabled fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="담당자" defaultValue="안해빈" disabled fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                label="타입"
                value={issue.issue.type}
                disabled
              />
              <MDInput
                label="상태"
                value={issue.issue.status}
                disabled
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                label="생성일"
                disabled
                defaultValue={issue.issue.updatedAt}

              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="textarea" label="설명" defaultValue={issue.issue.description} disabled rows={4} multiline fullWidth />
            </MDBox>
          </MDBox>
          <MDBox mt={4} mb={1} display="flex" justifyContent="center">
            <MDButton variant="gradient" color="info" onClick={handleOnClickDeleteIssue}>
              이슈 삭제
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Overview;
