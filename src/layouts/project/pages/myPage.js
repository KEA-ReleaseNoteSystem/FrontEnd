// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DataTable from "../../../examples/Tables/DataTable";
// import Divider from "assets/theme/components/divider";

import ProfileInfoCard from "layouts/project/components/profile.js";

import PageLayout from "../../../examples/LayoutContainers/PageLayout";
// Data
import Header from "layouts/project/components/Header";

import { React, useState, useEffect } from "react";

import CopyToClipboard from "react-copy-to-clipboard";
import axios from "interceptor/TokenCheck.js";


import '../data/button.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// Images
import DefaultNavbar from 'layouts/homepage/examples/Navbars/DefaultNavbar';
import routes from '../data/home.routes.js';
import MDButton from "components/MDButton";
import defimg from "assets/images/default_avatar.jpg";

function MyPage() {
  const [memberInfo, setMemberInfo] = useState([]);
  const [groupMember, setGroupMember] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMemberName, setSelectedMemberName] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    alert("그룹 코드가 클립보드에 복사되었습니다.");
    setTimeout(() => setCopied(false), 3000);
  };


  const Author = ({ image, name, nickname }) => {
    const [avimage, setImage] = useState(image);
    const handleImageError = () => {
      setImage(defimg);
    };
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={avimage} onError={handleImageError} name={name} size="sm" />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption">{nickname}</MDTypography>
        </MDBox>
      </MDBox>
    )
  };

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "팀원/닉네임", accessor: "author", width: "45%", align: "left" },
    { Header: "권한", accessor: "authority", align: "left" },
    { Header: "직책", accessor: "job", align: "left" },
    { Header: "이메일", accessor: "email", align: "center" },
    { Header: "삭제", accessor: "button", align: "center" },
  ];

  const rows = groupMember.map((member, index) => {
    const showButton = member.authority !== "GM";
    return {
      author: (
        <Author image={"https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/ff71cfd6bffa41b5ba1c19d02635640f/releasy/profile%2F" + member.id} name={member.name} nickname={member.nickname} />
      ),
      job: <Job title={member.position} />,
      authority: <MDBox>{member.authority}</MDBox>,
      email: <MDBox>{member.email}</MDBox>,
      button: memberInfo.authority === "GM" && showButton ? (
        <button className="styled-button" onClick={() => { setSelectedMemberName(member.name); setSelectedMemberId(member.id); setShowConfirmation(true); }}>
          {'삭제'}
        </button>
      ) : <>권한 불가</>
    };
  });
  let showDeleteButton = true;
  const token = localStorage.getItem('ACCESS_TOKEN');

  const handleConfirmDelete = () => {
    axios.delete(`/api/groupMember`, { //   생성한 설문 가져오는 요청
      headers: {
        Authorization: `Bearer ${token}`,
        // JWT 토큰을 헤더에 추가합니다.
      },
      data: {
        id: selectedMemberId,
        name: selectedMemberName
      }
    })
      .then(response => {
        // 삭제 성공 후 실행할 코드를 작성합니다.
        console.log('그룹에서 유저 삭제 성공');
        alert(response.data.message);
        window.location.reload();
      })
      .catch(error => {
        // 삭제 실패 후 실행할 코드를 작성합니다.
        console.error('그룹에서 유저 삭제 실패', error);
      });

  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const response = await axios.get("/api/group/members", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data.data);
        setMemberInfo(response.data.data);
        if (Array.isArray(response.data.data.groupMember)) {
          setGroupMember(response.data.data.groupMember);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(memberInfo);

  return (
    <PageLayout>
      <DefaultNavbar
        routes={routes}
        sticky
      />
      <MDBox sx={{ mb: 2, mt: 11 }} />
      <Header info={{ nickname: memberInfo.nickname }} memberId = {memberInfo.id}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description={memberInfo.introduce}
                info={{
                  fullName: memberInfo.name,
                  nickname: memberInfo.nickname,
                  team: memberInfo.groupName,
                  position: memberInfo.position,
                  email: memberInfo.email,
                  GroupCode: memberInfo.groupCode,              
                }}
                handleCopy = {handleCopy}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
             
              <Divider orientation="vertical" sx={{ mx: 0 }} />

            </Grid>
          </MDBox>
        </Grid>
      </Grid>

      </Header>

      
      <Card>
        {rows.length > 0 ? (
          <>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                그룹 멤버
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </>
        ) : null}
      </Card>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} >
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말로 {selectedMemberName}님을 그룹에서 삭제하시겠습니까?</p>
          <p style={{ color: "red", fontSize: "15px" }}>해당 멤버는 그룹에 대한 권한을 모두 잃게 됩니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={() => handleConfirmDelete(selectedMemberId)}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </PageLayout >
  );
}

export default MyPage;