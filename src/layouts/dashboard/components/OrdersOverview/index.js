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

// @mui material components
import { Timeline } from "@mui/icons-material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  const orderData = [
    {
      color: "info",
      icon: "notifications",
      title: "#00 이슈가 000에게 배정되었습니다.",
      dateTime: "2023-06-30 11:29",
    },
    {
      color: "error",
      icon: "notifications",
      title: "새로운 이슈(#00)가 발견되었습니다.",
      dateTime: "2023-06-30 10:19",
    },
    {
      color: "primary",
      icon: "inventory",
      title: "ver 0.0.0 릴리즈 노트 배포 완료",
      dateTime: "2023-06-30 10:15",
    },
    {
      color: "success",
      icon: "vpn_key",
      title: "#00 이슈 해결 완료",
      dateTime: "2023-06-30 10:05",
    },
    {
      color: "info",
      icon: "notifications",
      title: "#00 이슈가 000에게 배정되었습니다.",
      dateTime: "2023-06-26 11:29",
    },
    {
      color: "error",
      icon: "notifications",
      title: "새로운 이슈(#00)가 발견되었습니다.",
      dateTime: "2023-06-26 10:19",
    },
    {
      color: "primary",
      icon: "inventory",
      title: "ver 0.0.0 릴리즈 노트 배포 완료",
      dateTime: "2023-06-25 10:15",
    },
    {
      color: "success",
      icon: "vpn_key",
      title: "#00 이슈 해결 완료",
      dateTime: "2023-06-23 16:05",
    }
  ];
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
            color={order.color}
            icon={order.icon}
            title={order.title}
            dateTime={order.dateTime}
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
