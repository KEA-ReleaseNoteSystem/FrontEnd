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

  console.log("테스트: ", issue);


  const handleOnClickDeleteIssue = async () => {
    await axios.delete(`api/issue/${issue.issue.id}`, {
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
            mt={5}
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
              <MDInput type="text" label="보고자" defaultValue={issue.issue.memberReport.name} disabled fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="담당자" defaultValue={issue.issue.memberIdInCharge.name} disabled fullWidth />
            </MDBox>

            <MDBox mb={2}>
              <Grid >
                <Grid container alignItems="center">
                  <MDBox style={{ display: 'flex', flexDirection: 'row' }}>
                    <MDInput
                      label="타입"
                      value={issue.issue.issueType}
                      disabled
                    /> &nbsp;
                    <MDInput
                      label="상태"
                      value={issue.issue.status}
                      disabled
                    />&nbsp;
                  
                  <MDInput
                    label="생성일"
                    disabled
                    defaultValue={issue.issue.createdAt}
                  /> &nbsp;
                  <MDInput
                    label="중요도"
                    value={issue.issue.importance}
                    disabled
                  />
                  </MDBox>
                </Grid>
                <Grid container mt={2}>
                  {issue.issue.imgUrl_1 && (
                    <Grid item xs={4}>
                      <div style={{ marginRight: '10px' }}>
                        <MDTypography label="첨부 파일 1" style={{ fontSize: '15px' }}>첨부 파일 1</MDTypography>
                        <img
                          src={process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.issue.imgUrl_1}
                          alt="이미지 1"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </Grid>
                  )}
                  {issue.issue.imgUrl_2 && (
                    <Grid item xs={4}>
                      <div style={{ marginRight: '10px' }}>
                        <MDTypography label="첨부 파일 2" style={{ fontSize: '15px' }}>첨부 파일 2</MDTypography>
                        <img
                          src={process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.issue.imgUrl_2}
                          alt="이미지 2"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </Grid>
                  )}
                  {issue.issue.imgUrl_3 && (
                    <Grid item xs={4}>
                      <div>
                        <MDTypography label="첨부 파일 3" style={{ fontSize: '15px' }}>첨부 파일 3</MDTypography>
                        <img
                          src={process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.issue.imgUrl_3}
                          alt="이미지 3"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
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
