/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// @mui material components
import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import axios from 'axios';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data(selectedMemberId) {
  
const [projectMembers, setProjectMembers] = useState([]);
console.log("asdfasdf" ,projectMembers);
useEffect(() => {
  const getMemberProjectData = async () => {
    try {
      const response = await axios.get(`/api/project/1/members/${selectedMemberId}`
      );
 
      if (response.data.data.length === 0) {
        setProjectMembers([]);
      } else {
        setProjectMembers(response.data.data);
      }
    } catch (error) {
      console.error(error);
      setProjectMembers([]);
    }
  };
  getMemberProjectData();
}, [selectedMemberId]);



  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  const columns = [
    { Header: "프로젝트", accessor: "project", width: "30%", align: "left" },
    { Header: "상태", accessor: "status", align: "center" },
    { Header: "생성일자", accessor: "date", align: "center" }
  ];

  const rows = projectMembers.map((project) => ({
    project: <Project  name={project.name} />,
    status: (
      <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {project.status}
      </MDTypography>
    ),
    date: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {String(project.createdAt).slice(0, 10)}
      </MDTypography>
    ),
  }));
  return {
    columns,
    rows,
  };
}
