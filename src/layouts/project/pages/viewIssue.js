import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { IssueLink, Issue, Title, Bottom, Assignees, AssigneeAvatar } from '../../issue-manage/Lists/List/Issue/Styles.js';

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
import MDBadge from "components/MDBadge";

import axios from 'axios';
import { StarRateOutlined } from '@mui/icons-material';

const projectId = 1;

const ViewIssue = ({releaseId}) =>{
    console.log(releaseId);
    const [releaseNoteData, setReleaseNoteData] = useState([]); //해당 릴리즈노트 정보
    const [membersData, setMembersData] = useState([]); //프로젝트에 속한 멤버들 정보
    const [issueData, setIssueData] = useState([]); //릴리즈노트와 연관된 이슈들 정보
    const [otherIssueData, setOtherIssueData] = useState([]); //릴리즈노트에 연관되지 않았지만 추가할 수 있어야되므로 이 프로젝트의 나머지 이슈들 정보
    const [filteredIssues, setFilteredIssues] = useState([]); //릴리즈노트와 관련된 이슈들 필터링 및 정렬 위함
    const [memberInCharge, setmemberInCharge] = useState('');

    const [statusNo, setStatusNo] = useState([0, 0, 0]); //백로그, 진행중, 완료인 이슈 개수 세기
    const [issueDetail, setIssueDetail] = useState([]); //이슈 각각 눌렀을 때 상세정보

    //POST 요청 위한 변수들
    const [version, setVersion] = useState('');
    const [state, setState] = useState(''); //우상단 상태 리스트 선택박스용
    const [progress, setProgress] = useState(0); //프로그레스바 전용
    const [brief, setBrief] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'done':
                return 'success';
            case 'backlog':
                return 'dark';
            case 'inprogress':
                return 'warning';
            default:
                return 'default';
        }
    }

    const getPriorityColor = (priority) => {
        if (priority >= 90) {
            return 'error';
        } else if (priority < 90 && priority >= 50) {
            return 'warning';
        } else {
            return 'info';
        }
    }

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
            setVersion(response.data.data.version);
            setBrief(response.data.data.brief);
            setDescription(response.data.data.description);
            setState(response.data.data.status);
            setProgress(response.data.data.percent);
            setReleaseDate(response.data.data.releaseDate);
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
            const counts = [0, 0, 0];
            setIssueData(response.data.data);
            setFilteredIssues(response.data.data);

            (response.data.data).forEach((issue) => {
                if (issue.status === 'backlog') {
                    counts[0]++;
                } else if (issue.status === 'inprogress') {
                    counts[1]++;
                } else if (issue.status === 'done') {
                    counts[2]++;
                }
            });
            setStatusNo(counts);

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
        console.log("정보를 받아와보자.")
        getReleaseNoteData(releaseId, token);
        getIssueData(releaseId, token);
        getMembersData(projectId, token);
    }, []);


    const [menu1, setMenu1] = useState(null); // 상태 필터
    const [menu2, setMenu2] = useState(null); // 담당자 필터

    const openMenu1 = ({ currentTarget }) => setMenu1(currentTarget);
    const closeMenu1 = () => setMenu1(null);
    const openMenu2 = ({ currentTarget }) => setMenu2(currentTarget);
    const closeMenu2 = () => setMenu2(null);

    const handleShowAssignedIssues = (name) => {
        const filtered = issueData.filter((issue) => issue.memberIdInCharge && issue.memberIdInCharge.name === name);
        setFilteredIssues(filtered);
        setMenu2(null);
    };
    
    const handlePercent = (event) => {
        let inputValue = event.target.value;
        if (Number.isNaN(Number(inputValue))) { inputValue = ''; }
        if (inputValue.length > 3) {
            inputValue = inputValue.slice(0, 3); // 최대 3글자까지만 유지
        }
        if (inputValue > 100) { inputValue = 100; }
        if (inputValue < 0) { inputValue = 0; }

        setProgress(inputValue);
    };

    const handleShowBacklog = () => {
        const filteredIssues = issueData.filter((issue) => issue.status === 'backlog');
        setFilteredIssues(filteredIssues);
        setMenu1(null);
    };

    const handleShowInProgress = () => {
        const filteredIssues = issueData.filter((issue) => issue.status === 'inprogress');
        setFilteredIssues(filteredIssues);
        setMenu1(null);
    };

    const handleShowDone = () => {
        const filteredIssues = issueData.filter((issue) => issue.status === 'done');
        setFilteredIssues(filteredIssues);
        setMenu1(null);
    };
    const filterReset = () => {
        setFilteredIssues(issueData);
    }

    const memberList = membersData && membersData.map((member) => (
        <MenuItem key={member.name} onClick={() => handleShowAssignedIssues(member.name)}>
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
            <MenuItem onClick={handleShowBacklog}>Backlog</MenuItem>
            <MenuItem onClick={handleShowInProgress}>In progress</MenuItem>
            <MenuItem onClick={handleShowDone}>Done</MenuItem>
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


    const [activeModal, setActiveModal] = useState("");



    const openIssueInfoModal = (issue) => {
        setIssueDetail(issue);
        setActiveModal("issueInfo");
    };



    return (
            <MDBox pt={3} pb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <MDBox pt={2} px={3}>
                                <MDTypography variant="body2">
                                    릴리즈 버전: &nbsp;<MDInput variant="standard" defaultValue={releaseNoteData.version} multiline disabled />
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
                                                <MDInput variant="standard" defaultValue={releaseNoteData.brief}  multiline fullWidth disabled />
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
                                                <MDInput variant="standard" defaultValue={releaseNoteData.description} multiline fullWidth disabled />
                                            </MDTypography>
                                        </MDBox>
                                    </MDBox>
                                </Card>
                            </MDBox>
                            <MDBox pt={2} px={2} mb={4}>
                                <Card sx={{ backgroundColor: '#e9e9e9' }}>
                                    <MDBox pt={2} px={2} pb={2}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={10}>
                                                <MDTypography variant="body2" fontWeight="medium">
                                                    관련 이슈
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <MDTypography variant="button">필터: &nbsp;</MDTypography>
                                                <MDButton size="small" color="dark" onClick={openMenu1}>상태</MDButton>
                                                {renderMenu1}
                                                <MDButton size="small" color="dark" onClick={openMenu2}>담당자</MDButton>
                                                {renderMenu2}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <MDButton size="small" color="dark" onClick={filterReset}>필터 초기화</MDButton>
                                            </Grid>
                                        </Grid>
                                        <MDBox pt={1} px={2}>
                                            <MDBox pt={3} pl={1} pr={1} sx={{ overflow: "scroll", maxHeight: "50vh" }}>
                                                {filteredIssues && filteredIssues.map((issue) => (
                                                    <div onClick={() => openIssueInfoModal(issue)}>
                                                        <Issue>
                                                            <Title>#{issue.issueNum} {issue.title}
                                                                <MDBadge
                                                                    badgeContent={issue.status}
                                                                    color={getStatusColor(issue.status)}
                                                                    variant="gradient"
                                                                    size="sm"
                                                                />

                                                                <MDBadge
                                                                    badgeContent={issue.issueType}
                                                                    color={getPriorityColor(issue.importance)}
                                                                    variant="gradient"
                                                                    size="sm"
                                                                />
                                                            </Title>
                                                            <Bottom>
                                                                <MDTypography variant="caption" fontWeight="light">담당자: {issue.memberIdInCharge.name}</MDTypography>
                                                            </Bottom>
                                                        </Issue>
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
                                    <MDInput
                                        label="상태"
                                        value={state}
                                        disabled
                                    />
                                    </FormControl>
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
                                                    <MDTypography variant="subtitle2" ml={1}>{releaseNoteData.releaseDate && releaseNoteData.releaseDate.slice(0, 10)}</MDTypography>
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDBox pt={2} px={2}>
                                                    <MDTypography variant="h6">작성자</MDTypography>
                                                    <MDTypography variant="subtitle2" ml={1}>
                                                        {releaseNoteData.member && releaseNoteData.member.username}
                                                    </MDTypography>
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDBox pt={2} px={2} pb={5}>
                                                    <MDTypography variant="h6">진행률</MDTypography>
                                                    <MDInput variant="standard" value={progress} sx={{ width: "10%" }} multiline disabled />  %
                                                    <MDProgress
                                                        value={progress <= 100 && progress >= 0 ? progress : progress > 100 ? 100 : 0}
                                                        color={progress < 30 ? "primary" : progress < 60 ? "error" : progress < 80 ? "warning" : "info"} variant="gradient" />
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
    );
}

export default ViewIssue;