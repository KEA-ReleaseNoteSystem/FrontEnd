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
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Modal from 'react-modal';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDProgress from 'components/MDProgress';
import ProjectBoardListIssue from 'layouts/Board/Lists/List/Issue/ListAll';

import axios from 'axios';

const projectId = 1;

const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000', // add a high zIndex value
    },
    content: {
        width: '60%',
        height: '80%',
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -45%)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        position: 'relative', // make sure it's a positioned element
        zIndex: '10001', // it should be higher than overlay's zIndex to appear on top
        paddingTop: '3%'
    }
};

function ViewRelease() {
    const { releaseId } = useParams();
    const { users } = window.projectMock;
    
    const [releaseNoteData, setReleaseNoteData] = useState([]); //해당 릴리즈노트 정보
    const [membersData, setMembersData] = useState([]); //프로젝트에 속한 멤버들 정보
    const [issueData, setIssueData] = useState([]); //릴리즈노트와 연관된 이슈들 정보
    const [otherIssueData, setOtherIssueData] = useState([]); //릴리즈노트에 연관되지 않았지만 추가할 수 있어야되므로 이 프로젝트의 나머지 이슈들 정보

    const [state, setState] = useState(''); //우상단 상태 리스트 선택박스용
    const [memberInCharge, setmemberInCharge] = useState('');
    const [progress, setProgress] = useState(0); //프로그레스바 전용
    const [statusNo, setStatusNo] = useState([0, 0, 0]); //백로그, 진행중, 완료인 이슈 개수 세기
    const [issueDetail, setIssueDetail] = useState(""); //이슈 각각 눌렀을 때 상세정보

    const members = ["박도영", "박재석", "서강덕", "서지원", "안해빈"];
    const token = localStorage.getItem('ACCESS_TOKEN');

    // 이 릴리즈노트의 정보 받아오기
    async function getReleaseNoteData(releaseId, token) {
        try {
            const response = await axios.get(`/api/release/${encodeURIComponent(releaseId)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReleaseNoteData(response.data.data);
            setProgress(response.data.data.percent);
            setState(response.data.data.status);
            setmemberInCharge(response.data.data.member && response.data.data.member.username);
        } catch (error) {
            console.error(error);
        }
    };

    // 이 릴리즈 노트에 속한 이슈 받아오기
    async function getIssueData(releaseId, token) {
        try {
            const response = await axios.get(`/api/releaseNote/${encodeURIComponent(releaseId)}/issues`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIssueData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    async function getMembersData(projectId, token) {
        try {
            const response = await axios.get(`/api/project/${encodeURIComponent(projectId)}/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMembersData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getReleaseNoteData(releaseId, token);
        getIssueData(releaseId, token);
        getMembersData(projectId, token)
    }, [])


    //릴리스 작성하기 버튼
    const handleRelaseAddOnClick = (event) => {
        console.log("릴리스 저장")
        setAnchorEl(event.currentTarget);
    };

    const [menu1, setMenu1] = useState(null); // 상태 필터
    const [menu2, setMenu2] = useState(null); // 담당자 필터

    const openMenu1 = ({ currentTarget }) => setMenu1(currentTarget);
    const closeMenu1 = () => setMenu1(null);
    const openMenu2 = ({ currentTarget }) => setMenu2(currentTarget);
    const closeMenu2 = () => setMenu2(null);

    const memberList = membersData.map((member) => (
        <MenuItem key={member.name} onClick={closeMenu2}>
            {member.name}
        </MenuItem>
    ));

    const memberList2 = membersData.map((member) => (
        <MenuItem value={member.name}>
            {member.name}
        </MenuItem>
    ));

    // 이슈 상태 필터
    const renderMenu1 = (
        <Menu
            id="state-menu"
            anchorEl={menu1}

            open={Boolean(menu1)}
            onClose={closeMenu1}
        >
            <MenuItem onClick={closeMenu1}>Backlog</MenuItem>
            <MenuItem onClick={closeMenu1}>In progress</MenuItem>
            <MenuItem onClick={closeMenu1}>Done</MenuItem>
        </Menu>
    );

    // 이슈 담당자 필터
    const renderMenu2 = (
        <Menu
            id="member-menu"
            anchorEl={menu2}

            open={Boolean(menu2)}
            onClose={closeMenu2}
        >

            {memberList}
        </Menu>
    );

    // 우측상단 상태 선택 핸들링
    const handleChange = (event) => {
        setState(event.target.value);
    };

    const handlePercent = (event) => {
        setProgress(event.target.value);
    };

    const handleMemberInCharge = (event) => {
        setmemberInCharge(even.target.value);
    }

    const [activeModal, setActiveModal] = useState("");

    const openIssueAddModal = async () => {
        try { // 이 릴리즈 노트에 속하지 않았지만 프로젝트에는 속한 이슈 받아오기 (릴리즈 노트에 이슈를 추가하기 위한 용도)
            const response = await axios.get(`/api/project/${encodeURIComponent(projectId)}/releaseNote/${encodeURIComponent(releaseId)}/issues`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOtherIssueData(response.data.data);
        } catch (error) {
            console.error(error);
        }
        setActiveModal("addIssue");

        console.log(`이 프로젝트의 다른 이슈 가져오기 ${otherIssueData}`);
    };

    const openIssueInfoModal = (issue) => {
        setIssueDetail(issue);
        setActiveModal("issueInfo");
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={3} pb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <MDBox pt={2} px={3}>
                                <MDTypography variant="body2">
                                    릴리즈 버전: &nbsp;<MDInput variant="standard" defaultValue={releaseNoteData.version} multiline />
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2} px={2} mb={2}>
                                <Card sx={{ backgroundColor: '#e9e9e9' }}>
                                    <MDBox pt={2} px={2} pb={2}>
                                        <MDTypography variant="body2" fontWeight="medium">
                                            요약
                                        </MDTypography>
                                        <MDBox pt={2} px={2}>
                                            <MDTypography variant="body2">
                                                <MDInput variant="standard" defaultValue={releaseNoteData.brief} multiline fullWidth />
                                            </MDTypography>
                                        </MDBox>
                                    </MDBox>
                                </Card>
                            </MDBox>
                            <MDBox pt={2} px={2} mb={2}>
                                <Card sx={{ backgroundColor: '#e9e9e9' }}>
                                    <MDBox pt={2} px={2} pb={2}>
                                        <MDTypography variant="body2" fontWeight="medium">
                                            세부 설명
                                        </MDTypography>
                                        <MDBox pt={2} px={2}>
                                            <MDTypography variant="body2">
                                                <MDInput variant="standard" defaultValue={releaseNoteData.description} multiline fullWidth />
                                            </MDTypography>
                                        </MDBox>
                                    </MDBox>
                                </Card>
                            </MDBox>
                            <MDBox pt={2} px={2} mb={4}>
                                <Card sx={{ backgroundColor: '#e9e9e9' }}>
                                    <MDBox pt={2} px={2} pb={2}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={2}>
                                                <MDTypography variant="body2" fontWeight="medium">
                                                    관련 이슈
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <MDTypography variant="button">필터: &nbsp;</MDTypography>
                                                <MDButton size="small" color="dark" onClick={openMenu1}>상태</MDButton>
                                                {renderMenu1} &nbsp;
                                                <MDButton size="small" color="dark" onClick={openMenu2}>담당자</MDButton>
                                                {renderMenu2}
                                            </Grid>
                                            <Grid item xs={2}>
                                                <MDTypography variant="button" onClick={openIssueAddModal}>
                                                    <AddCircleOutlineIcon color="black" /> 추가하기
                                                </MDTypography>
                                            </Grid>
                                        </Grid>
                                        <MDBox pt={2} px={2}>
                                            <MDBox pt={3} pl={1} pr={1} sx={{ overflow: "scroll", maxHeight: "50vh" }}>
                                                {issueData.map((issue, index) => (
                                                    <div onClick={() => openIssueInfoModal(issue)}>
                                                        <ProjectBoardListIssue
                                                            key={issue.id}
                                                            projectUsers={users}
                                                            issue={issue}
                                                            index={index}
                                                        />
                                                    </div>
                                                ))}
                                            </MDBox>
                                        </MDBox>
                                    </MDBox>
                                </Card>
                            </MDBox>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <MDBox pt={3} px={3}>
                            <Grid container spacing={0}>
                                <Grid item xs={8}>
                                    <FormControl sx={{ mt: -2, pb: 2, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-helper-label">상태</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={state}
                                            label="릴리즈 상태"
                                            onChange={handleChange}
                                            sx={{ minHeight: 50 }}
                                        >
                                            <MenuItem value={"Not released"}>릴리즈 안됨(예정)</MenuItem>
                                            <MenuItem value={"Released"}>랄리즈 됨</MenuItem>
                                        </Select>
                                        <FormHelperText>릴리즈 상태를 설정해주세요.</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item m={2} xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <MDButton color="info" type="submit" sx={{ mt: -4, mb: 2 }} component={Link} to={"/release"}><h6>수정</h6></MDButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">생성 일자</MDTypography>
                                                    <MDTypography variant="subtitle2" ml={1}>{releaseNoteData.createdAt && releaseNoteData.createdAt.slice(0, 10)}</MDTypography>
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">릴리즈 일자</MDTypography>
                                                    <MDInput variant="standard" defaultValue={releaseNoteData.releaseDate && releaseNoteData.releaseDate.slice(0, 10)} multiline />
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">담당자</MDTypography>
                                                    {/* <MDTypography variant="subtitle2" ml={1}>
                                                        {releaseNoteData.member && releaseNoteData.member.username}
                                                    </MDTypography> */}
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={memberInCharge}
                                                        onChange={handleMemberInCharge}
                                                        sx={{ minHeight: 50 }}
                                                    >
                                                        {memberList2}
                                        </Select>
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">진행률</MDTypography>
                                                    <MDInput variant="standard" value={progress} onChange={handlePercent} sx={{ width: "5%" }} multiline />  %
                                                    <MDProgress
                                                        value={progress<=100 && progress>=0 ? progress : progress>100 ? 100 : 0 }
                                                        color={progress < 30 ? "primary" : progress < 60 ? "error" : progress < 80 ? "warning" : "info"} variant="gradient" />
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDBox pt={6} px={2} pb={3}>
                                                    <MDTypography variant="subtitle2">
                                                        백로그: 0<br />
                                                        진행중: 0<br />
                                                        완료: 0
                                                    </MDTypography>
                                                </MDBox>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Grid>
                </Grid >
            </MDBox >
            <Modal
                isOpen={activeModal === "addIssue"}
                onRequestClose={closeModal}
                style={customModalStyles}
            >
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
                            이슈 목록
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={3} pl={1} pr={1}>
                        {otherIssueData.map((issue, index) => (
                            <ProjectBoardListIssue
                                key={issue.id}
                                projectUsers={users}
                                issue={issue}
                                index={index}
                            />
                        ))}
                    </MDBox>
                </Card>
            </Modal>
            <Modal
                isOpen={activeModal === "issueInfo"}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '1000', // add a high zIndex value
                    },
                    content: {
                        width: '60%',
                        height: '80%',
                        top: '50%',
                        left: '55%',
                        transform: 'translate(-50%, -45%)',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 20,
                        justifyContent: 'center',
                        position: 'relative', // make sure it's a positioned element
                        zIndex: '10001', // it should be higher than overlay's zIndex to appear on top
                    }
                }}
            >
                <MDBox pt={3}>
                    <Grid>
                        <Grid item xs={12}>
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
                                    Issue #{issueDetail.id}
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="제목" defaultValue={issueDetail.title} disabled fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="보고자" defaultValue="서강덕" disabled fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="담당자" defaultValue="안해빈" disabled fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        label="타입"
                                        value={issueDetail.type}
                                        disabled
                                    />
                                    <MDInput
                                        label="상태"
                                        value={issueDetail.status}
                                        disabled
                                    />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        label="생성일"
                                        disabled
                                        defaultValue={issueDetail.updatedAt}

                                    />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="textarea" label="설명" defaultValue={issueDetail.description} disabled rows={4} multiline fullWidth />
                                </MDBox>
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </Modal>
        </DashboardLayout >
    );
}

export default ViewRelease;
