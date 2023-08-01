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
import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../examples/Sidenav/ProjectIdAtom';
import { useLocation } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard(props) {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const [releaseList, setReleaseList] = useState([]);
  const [issueList, setIssueList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chart2Data, setChart2Data] = useState([]);


  const getReleaseNoteData = async (projectId, token) => {
    try {
      const response = await axios.get(`/api/release?projectId=${encodeURIComponent(projectId)}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.length === 0) {
        return [];
      } else {
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getIssueData = async (projectId, token) => {
    try {
      const response = await axios.get(`/api/${encodeURIComponent(projectId)}/issues`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.length === 0) {
        return [];
      } else {
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const countReleasesByMonth = (releaseData) => {
    // 각 월별 릴리즈 수를 저장할 배열을 초기화합니다 (인덱스 0은 사용하지 않습니다)
    const releaseCounts = Array(13).fill(0);

    // releaseData를 순회하며 각 월별 릴리즈 수를 셉니다
    for (const release of releaseData) {
      const month = parseInt(release.releaseDate && release.releaseDate.split("-")[1]);
      releaseCounts[month]++;
    }

    // 각 월별 릴리즈 수를 담은 배열을 반환합니다 (인덱스 0은 사용하지 않으므로 잘라냅니다)
    return releaseCounts.slice(1);
  };

  const countIssuesByMonth = (issueData) => {
    // 각 월별 이슈 수를 저장할 배열을 초기화합니다 (인덱스 0은 사용하지 않습니다)
    const issueCounts = Array(13).fill(0);

    // issueData를 순회하며 각 월별 릴리즈 수를 셉니다
    for (const issue of issueData) {
      const month = parseInt(issue.updatedAt && issue.updatedAt.split("-")[1]);
      if (issue.status === "done") {
        issueCounts[month]++;
      }
      else continue;
    }

    // 각 월별 릴리즈 수를 담은 배열을 반환합니다 (인덱스 0은 사용하지 않으므로 잘라냅니다)
    return issueCounts.slice(1);
  };

  useEffect(() => {
    async function fetchData() {
      const releaseData = await getReleaseNoteData(projectId, token);
      const issueData = await getIssueData(projectId, token);
      setReleaseList(releaseData);
      setIssueList(issueData);
    }
    fetchData();
  }, [projectId, token]);
  
  useEffect(() => {
    // releaseList 값이 변경될 때마다 월별 릴리즈 수를 다시 계산하도록 useEffect를 사용합니다.
    const releaseCountsByMonth = countReleasesByMonth(releaseList);
  
    setChartData({
      labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      datasets: { label: "배포한 릴리즈 노트", data: releaseCountsByMonth },
    });

  }, [releaseList]);

  useEffect(() => {
    // issueList 값이 변경될 때마다 월별 이슈 해결 수를 다시 계산하도록 useEffect를 사용합니다.
    const issueCountsByMonth = countIssuesByMonth(issueList);
  
    setChart2Data({
      labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      datasets: { label: "해결한 작업", data:  issueCountsByMonth },
    });

  }, [releaseList]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ position: "absolute", top: "10%", left: "2%", width: "95%" }}>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} mt={3}>
                <ReportsBarChart
                  color="info"
                  title="배포한 릴리즈 노트 수"
                  description="작성 중인 릴리즈 노트는 제외됩니다."
                  date="campaign sent 2 days ago"
                  chart={chartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} mt={3}>
                <ReportsLineChart
                  color="dark"
                  title="해결한 작업 수"
                  description="이슈 + 개선 사항"
                  date="updated just 5 minutes ago"
                  chart={chart2Data}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </div>
      <div style={{ float: "right", width: "33%", height: "100vh" }}>
        <MDBox>
          <OrdersOverview />
        </MDBox>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
