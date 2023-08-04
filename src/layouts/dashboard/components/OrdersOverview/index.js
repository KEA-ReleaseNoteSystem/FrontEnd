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
// @mui material components
import { Timeline } from "@mui/icons-material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

import axios from 'axios';
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../../../examples/Sidenav/ProjectIdAtom.js'

function OrdersOverview() {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const token = localStorage.getItem('ACCESS_TOKEN');

  const [orderData, setOrderData] = useState([]);

  async function getNotificationData(projectId, token) {
    try {
        const response = await axios.get(`/api/project/${encodeURIComponent(projectId)}/notification`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const reversedArray = [...response.data.data].reverse();
        setOrderData(reversedArray);
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
  getNotificationData(projectId, token);
  // 컴포넌트가 마운트된 후에 10초마다 데이터를 업데이트하기 위해 setInterval을 사용
  const intervalId = setInterval(() => {
    getNotificationData(projectId, token);
    console.log("10초마다 notification 최신화");
  }, 10000); // 10초(10000ms)마다 호출

  // 컴포넌트가 언마운트되면 setInterval을 정리(clear)하여 메모리 누수 방지
  return () => clearInterval(intervalId);
}, [projectId, token]);

  // green: success, orange: error, blue: info, yellow: warning, pink: primary
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Notifications
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {orderData.map((order, index) => (
          <TimelineItem
            key={index}
            color={order.type == "issue" ? "info" : order.type == "releaseNote" ? "primary" : "warning"}
            icon={order.type == "issue" ? "notifications" : order.type == "releaseNote" ? "inventory" : "vpn_ley"}
            title={order.message}
            dateTime={order.createdAt && order.createdAt.slice(0,10)}
          />
        ))}
      </MDBox>  
    </Card>
  );
}

export default OrdersOverview;
