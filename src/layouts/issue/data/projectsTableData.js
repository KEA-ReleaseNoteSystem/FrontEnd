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
    version: "v 1.0.1",
    writer: "박도영",
    role: "pm",
    note: "이동하기",
  },
  {
    project: {
      image: logoGithub,
      name: "John Michael",
    },
    status: "running",
    date: "23/04/18",
    version: "v 1.0.1",
    writer: "박도영",
    role: "pm",
    note: "이동하기",
  },
  {
    project: {
      image: logoGithub,
      name: "John Michael",
    },
    status: "cancled",
    date: "23/04/18",
    version: "v 1.0.1",
    writer: "박도영",
    role: "pm",
    note: "이동하기",
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
      <MDBox ml={0.4} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  
  const columns = [
    { Header: "Description", accessor: "project_", width: "30%", align: "left" },
    { Header: "상태", accessor: "status_", align: "center" },
    { Header: "버전", accessor: "version_", align: "center" },
    { Header: "최근 릴리즈", accessor: "releaseDate_", align: "center" },
    { Header: "작성자", accessor: "writer_", align: "center" },
    { Header: "역할", accessor: "role_", align: "center" },
    { Header: "릴리즈 노트", accessor: "note_", align: "center" },
  ];

  const rows = projects.map((project) => ({
    project_: <Project image={project.project.image} name={project.project.name} />,
    status_: (
      <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {project.status}
      </MDTypography>
    ),
    version_: (
      <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {project.version}
      </MDTypography>
    ),
    releaseDate_: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {project.date}
      </MDTypography>
    ),
    writer_: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {project.writer}
      </MDTypography>
    ),
    role_: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {project.role}
      </MDTypography>
    ),
    note_: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {project.note}
      </MDTypography>
    ),
    // completion: <Progress color={project.completion == 0 ? 'error' : project.completion == 100 ? 'success' : 'info'} value={project.completion} />,
  }));
  return {
    columns,
    rows,
  };
}