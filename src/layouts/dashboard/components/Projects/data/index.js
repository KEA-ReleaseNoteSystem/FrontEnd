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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function data({issues}) {
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


  const renderProgress = (value) => {
    if (value === null) {
      return <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>지정되지 않음</MDTypography>;
    }

    const color =
      value < 30 ? 'info' : value < 60 ? 'warning' : value < 80 ? 'error' : 'primary';

    return (
      <MDProgress
        value={value}
        color={color}
        variant="gradient"
        label={false}
      />
    );
  };
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
        {renderProgress(issues.value)}
      </MDBox>
    ),
  }));

  return {
    
    columns,
    rows,
  };
}
