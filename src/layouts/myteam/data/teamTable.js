/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";

const Team = [
  {
    author: {
      image: team2,
      name: "John Michael",
      email: "john@creative-tim.com",
    },
    job: {
      title: "Manager",
      description: "Organization",
    },
    status: "online",
    employed: "23/04/18",
  },
  {
    author: {
      image: team2,
      name: "John Michael",
      email: "john@creative-tim.com",
    },
    job: {
      title: "Manager",
      description: "Organization",
    },
    status: "offline",
    employed: "23/04/18",
  },
  {
    author: {
      image: team2,
      name: "John Michael",
      email: "john@creative-tim.com",
    },
    job: {
      title: "Manager",
      description: "Organization",
    },
    status: "online",
    employed: "23/04/18",
  },
  {
    author: {
      image: team2,
      name: "John Michael",
      email: "john@creative-tim.com",
    },
    job: {
      title: "Manager",
      description: "Organization",
    },
    status: "online",
    employed: "23/04/18",
  },
];

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const columns = [
    { Header: "팀원", accessor: "author", width: "45%", align: "left" },
    { Header: "직책/역할", accessor: "function", align: "left" },
    { Header: "접속", accessor: "status", align: "center" },
    { Header: "채용일", accessor: "employed", align: "center" },
  ];

  const rows = Team.map((member) => ({
    author: (
      <Author image={member.author.image} name={member.author.name} email={member.author.email} />
    ),
    function: <Job title={member.job.title} description={member.job.description} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={member.status}
          color={member.status === "offline" ? "dark" : "success"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {member.employed}
      </MDTypography>
    ),
  }));

  return {
    columns,
    rows,
  };
}
