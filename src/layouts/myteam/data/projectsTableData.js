/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// @mui material components
import Icon from "@mui/material/Icon";

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

const projects = [
  {
    project: {
      image: logoGithub,
      name: "John Michael",
    },
    status: "running",
    date: "23/04/18",
    completion: 100,
  },
  {
    project: {
      image: logoGithub,
      name: "John Michael",
    },
    status: "running",
    date: "23/04/18",
    completion: 80,
  },
  {
    project: {
      image: logoGithub,
      name: "John Michael",
    },
    status: "cancled",
    date: "23/04/18",
    completion: 0,
  },
];

export default function data() {
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
    { Header: "생성일자", accessor: "date", align: "center" },
    { Header: "진행도", accessor: "completion", align: "center" },
  ];

  const rows = projects.map((project) => ({
    project: <Project image={project.project.image} name={project.project.name} />,
    status: (
      <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {project.status}
      </MDTypography>
    ),
    date: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {project.date}
      </MDTypography>
    ),
    completion: <Progress color={project.completion == 0 ? 'error' : project.completion == 100 ? 'success' : 'info'} value={project.completion} />,
  }));
  return {
    columns,
    rows,
  };
}
