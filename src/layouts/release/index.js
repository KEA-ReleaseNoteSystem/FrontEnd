import React, { useState, useEffect } from 'react';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Icon, IconButton, Menu, MenuItem } from '@mui/material';
import MDButton from 'components/MDButton';

import { Link } from 'react-router-dom';


import { Modal, Button } from "react-bootstrap";

import { releaseView,releaseViewCopy } from "shared/constants/TableOrTree"
import Select from '@mui/material/Select';
import ReleaseTree from './releaseTree';
import { projectIdState } from '../../examples/Sidenav/ProjectIdAtom.js';
import axios from 'axios';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";

import { useRecoilState } from 'recoil';

function Release() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReleaseId, setSelectedReleaseId] = useState(null);
  const [selectedReleaseVersion, setSelectedReleaseVersion] = useState(null);
  const [releaseList, setReleaseList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = localStorage.getItem('ACCESS_TOKEN');
  const [projectId, setProjectId] = useRecoilState(projectIdState);

  console.log("릴리즈 노트 projectId",projectId );

  
const getReleaseNoteData = async (projectId, token) => {
  try {
    const response = await axios.get(`/api/release?projectId=${encodeURIComponent(projectId)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("response",response.data.data);
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

  useEffect(() => {
    async function fetchData() {
      const data = await getReleaseNoteData(projectId, token);
      setReleaseList(data);
    }
    fetchData();
  }, []);

  const handleClick = (event, releaseId , releaseVersion) => {
    setSelectedReleaseId(releaseId); 
    setSelectedReleaseVersion(releaseVersion);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReleaseId(null); // 선택한 releaseId 초기화
  };

  const handleDelete = async (releaseId) => {
    console.log('릴리즈 삭제 시도');
    try {
      await axios.delete(`/api/release/${encodeURIComponent(releaseId)}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // 삭제 요청 성공 시 해당 releaseId를 releaseList에서 제거
      setReleaseList(releaseList.filter((release) => release.id !== releaseId));
      setShowDeleteModal(false)
      console.log(`삭제 성공`);
    } catch (error) {
      console.log("삭제 실패");
      console.error(error);
    }
  };

  const sortedRelease = releaseList
    ? releaseList.sort((a, b) =>
      b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: 'base' })
    )
    : [];

  const handleDeleteClick = (releaseId) => {
    handleDelete(releaseId);
    handleClose();
  };

  const columns = [
    { Header: '버전', accessor: 'version', width: '5%', align: 'left' },
    { Header: '릴리즈 일자', accessor: 'releaseDate', width: '5%', align: 'center' },
    { Header: '작성자', accessor: 'author', width: '5%', align: 'center' },
    { Header: '작성 일자', accessor: 'createDate', width: '5%', align: 'center' },
    { Header: '상태', accessor: 'status', width: '5%', align: 'center' },
    { Header: '옵션', accessor: 'option', width: '5%', align: 'center' }
  ];


  const rows = sortedRelease.map((release) => {
    const releaseId = release.id; // release.id 값을 별도의 변수에 저장
    return {
      version: (
        <Link to={`/release/${encodeURIComponent(releaseId)}`}>
          {release.version}
        </Link>
      ),
      releaseDate: release.releaseDate && release.releaseDate.slice(0, 10),
      author: release.member && release.member.username,
      createDate: release.releaseDate && release.createdAt.slice(0, 10),
      status: release.status,
      option: (
  
        <div>
          <IconButton onClick={(event) => handleClick(event, releaseId , release.version )}>
            <Icon>settings</Icon>
          </IconButton>
          {anchorEl && (
            <>
            <Menu anchorEl={anchorEl} open={selectedReleaseId === releaseId} onClose={handleClose}>
              <MenuItem><Link to={`/release/${encodeURIComponent(releaseId)}`}>조회 및 수정</Link></MenuItem>
              <MenuItem onClick={() => {setShowDeleteModal(true); setAnchorEl(null);}}>삭제</MenuItem>
            </Menu>
          </>
          )}
        </div>  
      )
    };
  });

  const [view, setView] = useState('table');

  // Handler for changing the view
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  //릴리스 작성하기 버튼
  const handleRelaseAddOnClick = (event) => {
    console.log("릴리스 추가")
    setAnchorEl(event.currentTarget);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Select
          labelId="filter-select-label"
          id="view-select"
          value={view}
          onChange={handleViewChange}
          sx={{ minHeight: 40 , maxWidth: 60  }}
          displayEmpty
        >
          <MenuItem disabled>
            보기 방식 선택
          </MenuItem>
          {Object.values(releaseView).map(view => (
            <MenuItem key={view} value={view}>
              {releaseViewCopy[view]}
            </MenuItem>
          ))}
        </Select>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                width={300}
                mx="auto"
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex" // flex display 설정
                justifyContent="center" 
              >
                <MDTypography variant="h6" color="white">
                  릴리즈 노트 목록
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {view === 'table' ? (
                  <>
                  <DataTable
                    table={{ columns, rows}}
                    isSorted={false}
                    entriesPerPage={10}
                    showTotalEntries={false}
                    noEndBorder
                  />
                  </>
                ) : (
                  <ReleaseTree />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={handleRelaseAddOnClick} href="/release/create">
          <AddCircleOutlineIcon color="info"/>
        </IconButton>
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} style={{ top: "30%" }}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말로 릴리즈노트 {selectedReleaseVersion}을(를) 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedReleaseId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
}

export default Release;
