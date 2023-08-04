/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { useState, useEffect } from "react";
import axios from 'axios';

// Images
import team2 from "assets/images/team-2.jpg";

import { Menu, MenuItem, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { token } from "stylis";

import { useRecoilState } from 'recoil';
import { projectIdState } from '../../../examples/Sidenav/ProjectIdAtom';
import defimg from "assets/images/default_avatar.jpg";

export default function data({ projectInfo }) {

  console.log("asdf", projectInfo.memberInfoDTOList);
  const handleOnClickAddMember = (projectId, memberId) => {
    console.log("추가 클릭");
    joinProjectMemberData(projectId, memberId, token);
  }

  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(projectId);

  const [memberList, setMemberList] = useState([]);
  const token = localStorage.getItem('ACCESS_TOKEN');

  const getProjectMemberData = async (token) => {

    try {
      const response = await axios.get(`/api/group/members`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
  
      if (response.data.length === 0) {
        return [];
      } else {
        console.log("그룹 데이터", response.data.data.groupMember);
        return response.data.data.groupMember;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const joinProjectMemberData = async (projectId, memberId) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.post(`/api/project/member`, {
        projectId: projectId,
        memberId: memberId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.statusCode === 200) {
        window.alert(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    async function fetchData() {
      
      const data = await getProjectMemberData(token);

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
    { Header: "팀원", accessor: "author", width: "45%", align: "left" },
    { Header: "직책/역할", accessor: "function", align: "center" },
    { Header: "가입일", accessor: "createdAt", align: "center" },
    { Header: "추가", accessor: "join", align: "center" },
  ];

  const rows = memberList.map((member) => {
    // projectInfo.memberInfoDTOList에 현재 멤버의 id가 존재하는지 확인합니다.
    const isMemberInProjectInfo = projectInfo.memberInfoDTOList.some(
      (projectMember) => projectMember.id === member.id
    );
  
    return {
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
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {member && member.createdAt.slice(0, 10)}
        </MDTypography>
      ),
      join: isMemberInProjectInfo ? (
        <span>멤버 이미 추가됨</span>
      ) : (
        <IconButton onClick={() => handleOnClickAddMember(projectId, member.id)} disabled={isSubmitting}>
          <AddCircleOutlineIcon color="info" />
        </IconButton>
      ),
    };
  });

  return {
    columns,
    rows,
  };
}
