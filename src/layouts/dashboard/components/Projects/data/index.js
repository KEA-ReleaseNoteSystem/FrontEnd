/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
// 로고 넣기
import logoXD from "assets/images/small-logos/logo-xd.svg";

// 팀원 넣기
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const issues = [
  {
    name: "#00 Test issue",
    member: "서강덕",
    due: "0000-00-00",
    value: 30,
  },
  {
    name: "#00 Test issue",
    member: "서지원",
    due: "0000-00-00",
    value: 99,
  },
];

export default function data() {
  const Issue = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "이슈", accessor: "issue", width: "45%", align: "left" },
    { Header: "담당자", accessor: "member", width: "10%", align: "center" },
    { Header: "기한", accessor: "due", align: "center" },
    { Header: "중요도", accessor: "importance", align: "center" },
  ];

  const rows = issues.map((issues) => ({
    issue: <Issue name={issues.name} />,
    member: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {issues.member}
      </MDTypography>
    ),
    due: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {issues.due}
      </MDTypography>
    ),
    importance: (
      <MDBox width="8rem" textAlign="left">
        <MDProgress 
          value={issues.value}
          color={issues.value<30?"info":issues.value<60?"warning":issues.value<80?"error":"primary"} variant="gradient" label={false} />
      </MDBox>
    ),
  }));

  return {
    columns,
    rows,
  };
}
