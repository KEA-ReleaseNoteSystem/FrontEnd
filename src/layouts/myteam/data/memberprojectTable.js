/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from 'axios';

// Images
import defimg from "assets/images/default_avatar.jpg";

const projectId = 1;

const getProjectMemberData = async (projectId, token) => {
  try {
    const response = await axios.get(`/api/project/${encodeURIComponent(projectId)}/members`, {
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

export default function data(setSelectedMemberId) {
  const [memberList, setMemberList] = useState([]);
  console.log(memberList);
  const token = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    async function fetchData() {
      const data = await getProjectMemberData(projectId, token);
      setMemberList(data);
    }
    fetchData();
  }, []);

  const Author = ({ image, name, nickname }) => {
    const [avimage, setImage] = useState(image);
    const handleImageError = () => {
      setImage(defimg);
    };
    return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={avimage} onError={handleImageError} name={name} size="sm"/>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{nickname}</MDTypography>
      </MDBox>
    </MDBox>
  )};


  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "팀원", accessor: "author", align: "left" },
    { Header: "직책/역할", accessor: "function", align: "left" },
    { Header: "접속", accessor: "status", align: "center" },
    { Header: "가입일", accessor: "createdAt", align: "center" },
    { Header: "", accessor: "button", align: "center" }
  ];

  const rows = memberList.map((member) => ({
    author: (
      <Author image={"http://localhost:8080/" + member.id + ".jpg"} name={member.name} email={member.email} />
    ),
    function: <Job title={member.role} description={member.position} />,
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
    createdAt: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {member && member.createdAt.slice(0, 10)}
      </MDTypography>),
    button: (
        <Button variant="contained" color="inherit" onClick={() => setSelectedMemberId(member.id)}>
         조회
      </Button>
    ),
  }));

  return {
    columns,
    rows,
  };
}
