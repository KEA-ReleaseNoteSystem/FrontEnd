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

function CreateRelease() {
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

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={3} pb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <MDBox pt={2} px={2}>
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
                                                    이슈
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
                                                <MDTypography variant="button">
                                                    <AddCircleOutlineIcon color="black" /> 추가하기
                                                </MDTypography>
                                            </Grid>
                                        </Grid>
                                        <MDBox pt={2} px={2}>

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
                                            backgroundColor="white"
                                            sx={{ minHeight: 50 }}
                                        >
                                            <MenuItem value={"Released"}>릴리즈 안됨(예정)</MenuItem>
                                            <MenuItem value={"Not-Released"}>랄리즈 됨</MenuItem>
                                        </Select>
                                        <FormHelperText>릴리즈 상태를 설정해주세요.</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item p={2} xs={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <MDButton color="info" sx={{ mt: -4, mb: 2 }}>전체 저장</MDButton>
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
                                                        백로그: 0<br/>
                                                        진행중: 0<br/>
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
        </DashboardLayout >
    );
}

export default CreateRelease;
