import React, { useState, useEffect } from 'react';
import { Icon, IconButton, Menu, MenuItem } from '@mui/material';
import MDButton from 'components/MDButton';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  const token = localStorage.getItem('ACCESS_TOKEN');
  const projectId = 1;

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
              <MenuItem><Link to={`/release/${encodeURIComponent(releaseId)}`}>조회 및 수정</Link></MenuItem>
              <MenuItem onClick={() => handleDeleteClick(releaseId)}>삭제</MenuItem>
            </Menu>
          )}
        </div>
      )
    };
  });

  return {
    columns,
    rows
  };
}
