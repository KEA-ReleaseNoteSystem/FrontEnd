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
import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
        justifyContent: 'center',
        position: 'relative', // make sure it's a positioned element
        zIndex: '10001', // it should be higher than overlay's zIndex to appear on top
        paddingTop: '30%'
    }
};

function CreateRelease() {
    const { issues, users } = window.projectMock
    const [issueDetail, setIssueDetail] = useState("");

    const [info, setInfo] = useState({
        version: "1.0.0",
        abstract: "이 프로젝트의 간략한 설명",
        content: "이 프로젝트에 대한 자세한 설명(필요 시)",
        createDate: "2023-07-01",
        releaseDate: "2023-07-02",
        memberInCharge: "RiverDuck",
        progress: 92
    });

    const members = ["박도영", "박재석", "서강덕", "서지원", "안해빈"];

    //릴리스 작성하기 버튼
    const handleRelaseAddOnClick = (event) => {
        console.log("릴리스 저장")
        setAnchorEl(event.currentTarget);
    };

    const [state, setState] = useState('');
    const [menu1, setMenu1] = useState(null); // 상태 필터
    const [menu2, setMenu2] = useState(null); // 담당자 필터

    const openMenu1 = ({ currentTarget }) => setMenu1(currentTarget);
    const closeMenu1 = () => setMenu1(null);
    const openMenu2 = ({ currentTarget }) => setMenu2(currentTarget);
    const closeMenu2 = () => setMenu2(null);

    const memberList = members.map((name) => (<MenuItem onClick={closeMenu2}>{name}</MenuItem>))

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

    const [activeModal, setActiveModal] = useState("");

    const openIssueAddModal = () => {
        setActiveModal("addIssue");
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
                                <MDTypography variant="h6">
                                    릴리즈 버전: &nbsp;<MDInput variant="standard" defaultValue={info.version} />
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
                                                <MDInput variant="standard" defaultValue={info.abstract} multiline fullWidth />
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
                                                <MDInput variant="standard" defaultValue={info.content} multiline fullWidth />
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
                                                {issues.map((issue, index) => (
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
                                            <MenuItem value={"Released"}>릴리즈 안됨(예정)</MenuItem>
                                            <MenuItem value={"Not-Released"}>랄리즈 됨</MenuItem>
                                        </Select>
                                        <FormHelperText>릴리즈 상태를 설정해주세요.</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item m={2} xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <MDButton color="info" type="submit" sx={{ mt: -4, mb: 2 }} component={Link} to={"/release"}><h6>전체 저장</h6></MDButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">생성 일자</MDTypography>
                                                    <MDTypography variant="subtitle2" ml={10}>{info.createDate}</MDTypography>
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">릴리즈 일자</MDTypography>
                                                    <MDTypography variant="subtitle2" ml={12}>{info.releaseDate}</MDTypography>
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">담당자</MDTypography>
                                                    <MDTypography variant="subtitle2" ml={10}>{info.memberInCharge}</MDTypography>
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">진행률</MDTypography>
                                                    <MDProgress
                                                        value={info.progress}
                                                        color={info.progress < 30 ? "primary" : info.progress < 60 ? "error" : info.progress < 80 ? "warning" : "info"} variant="gradient" label={info.progress} />
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
                        {issues.map((issue, index) => (
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

export default CreateRelease;
