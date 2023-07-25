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
import Pagination from 'react-bootstrap/Pagination';
// import Divider from "assets/theme/components/divider";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import PageLayout from "../../../examples/LayoutContainers/PageLayout";
import NavigationBar from "../components/NavigationBar";
// Data
import Header from "layouts/profile/components/Header";

import { React, useState, useEffect } from "react";
import axios from "axios";
import { CommentsDisabledOutlined } from "@mui/icons-material";
import '../data/button.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// Images
import team2 from "assets/images/team-2.jpg";

function MyPage() {
    const [memberInfo, setMemberInfo] = useState([]);
    const [groupMember, setGroupMember] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const Author = ({ image, name, nickname }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm" />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{nickname}</MDTypography>
            </MDBox>
        </MDBox>
    );

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
        const showButton = member.authority !== "GM"; // Check if the authority is not "GM"
      
        return {
          author: (
            <Author image={team2} name={member.name} nickname={member.nickname} />
          ),
          job: <Job title={member.position} />,
          authority: <MDBox>{member.authority}</MDBox>,
          email: <MDBox>{member.email}</MDBox>,
          button: showButton ? (
            <button className="styled-button" onClick={() => { setSelectedMemberId(member.id); setShowConfirmation(true);}}>
              {'삭제'}
            </button>
          ) : <button
          className="styled-button"
          onClick={() => handleDissolveGroup(member.id)} // Call the handleDissolveGroup function when clicked
        >
          {'그룹 해산'}
        </button>, // Render the button only if showButton is true, otherwise, render null
        };
      });
    let showDeleteButton = true;

    const handleDelete = (index) => {
        
    };

    console.log("dasfsaf", groupMember);


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
                console.log(response.data.data.groupMember);
                setMemberInfo(response.data.data);
                setGroupMember(response.data.data.groupMember);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    console.log(memberInfo);

    return (
        <PageLayout>
            <NavigationBar />
            {/* <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s"> */}
            <MDBox mb={2} />
            <Header info={{ nickname: memberInfo.nickname }}>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={12} md={6} xl={12} sx={{ display: "flex" }}>
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
                                }}
                                action={{ route: "", tooltip: "Edit Profile" }}
                                shadow={false}
                            />
                            <Divider orientation="vertical" sx={{ mx: 0 }} />
                        </Grid>
                    </Grid>
                </MDBox>
            </Header>
            <Card>
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
                    {rows.length > 0 ? (
                        <DataTable
                            table={{ columns, rows }}
                            isSorted={false}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            noEndBorder
                        />
                    ) : (
                        <MDTypography variant="body1">멤버 정보가 없습니다.</MDTypography>
                    )}
                </MDBox>
            </Card>
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} >
            <Modal.Header closeButton>
              <Modal.Title>삭제 확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>정말로 해당 멤버를 그룹에서 삭제하시겠습니까?</p>
              <p style={{ color: "red", fontSize: "15px" }}>해당 멤버는 그룹에 대한 권한을 모두 잃게 됩니다.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                취소
              </Button>
              <Button variant="danger" onClick={handleDelete(selectedMemberId)}>
                삭제
              </Button>
            </Modal.Footer>
            </Modal>
        </PageLayout >
    );
}

export default MyPage;
