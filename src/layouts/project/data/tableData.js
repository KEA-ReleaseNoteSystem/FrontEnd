import React, { useState, useEffect } from 'react';
import { Icon, IconButton, Menu, MenuItem } from '@mui/material';
import MDButton from 'components/MDButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ViewIssue from '../pages/viewIssue';
const getReleaseNoteData = async (projectId, token) => {
  try {
    const response = await axios.get(`/api/release?projectId=${encodeURIComponent(projectId)}`, {
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

export default function Data() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReleaseId, setSelectedReleaseId] = useState(null);
  const [releaseList, setReleaseList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const projectId = 1;


  const handleDetailClick = () => {
    if (selectedReleaseId) {
      // 선택한 releaseId가 있는 경우에만 모달을 띄웁니다.
      console.log('상세 조회 버튼이 눌렸습니다. ReleaseId:', selectedReleaseId);
      setModalOpen(true); // 모달 열기
      setAnchorEl(null);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // 모달 닫기
  };


  useEffect(() => {
    async function fetchData() {
      const data = await getReleaseNoteData(projectId, token);
      setReleaseList(data);
    }
    fetchData();
  }, []);

  const handleClick = (event, releaseId) => {
    setSelectedReleaseId(releaseId); // 선택한 releaseId 설정
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReleaseId(null); // 선택한 releaseId 초기화
  };

  const sortedRelease = releaseList
    ? releaseList.sort((a, b) =>
      b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: 'base' })
    )
    : [];
  const columns = [
    { Header: '버전', accessor: 'version', width: '5%', align: 'left' },
    { Header: '릴리즈 날짜', accessor: 'releaseDate', width: '5%', align: 'center' },
    { Header: '작성자', accessor: 'author', width: '5%', align: 'center' },
    { Header: '작성 날짜', accessor: 'createDate', width: '5%', align: 'center' },
    { Header: '상태', accessor: 'status', width: '5%', align: 'center' },
    { Header: '옵션', accessor: 'option', width: '5%', align: 'center' }
  ];

  const rows = sortedRelease.map((release) => {
    const releaseId = release.id; // release.id 값을 별도의 변수에 저장

    return {
      version: release.version,
      releaseDate: release.releaseDate && release.releaseDate.slice(0, 10),
      author: release.member && release.member.username,
      createDate: release.releaseDate && release.createdAt.slice(0, 10),
      status: release.status,
      option: (
        <div>
          <IconButton onClick={(event) => handleClick(event, releaseId)}>
            <Icon>settings</Icon>
          </IconButton>
          {anchorEl && (
            <Menu anchorEl={anchorEl} open={selectedReleaseId === releaseId} onClose={handleClose}>
              <MenuItem onClick={handleDetailClick} >상세 조회</MenuItem>
            </Menu>
          )}

          <Modal size="xl" show={modalOpen} onHide={() => setModalOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>상세 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <ViewIssue releaseId={selectedReleaseId}/>
            </Modal.Body>
          </Modal>
        </div>
      )
    };
  });

  return {
    columns,
    rows
  };
}
