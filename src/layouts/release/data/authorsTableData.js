import React, { useState, useEffect } from 'react';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import { Icon, IconButton, Menu, MenuItem } from '@mui/material';
import axios from 'axios';

const getReleaseNoteData = () => {
  const [releaseList, setReleaseList] = useState(null);
  const token = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/release?projectId=1", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.length === 0) {
          setReleaseList([]);
        } else {
          setReleaseList(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return releaseList;
};

export default function data() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log('릴리즈 삭제');
    handleClose();
  };

  const handleEdit = () => {
    console.log('릴리즈 확인 / 수정');
    handleClose();
  };

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const releaseList = getReleaseNoteData();

  const sortedRelease = releaseList ? releaseList.sort((a, b) =>
    b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: 'base' })
  ) : [];

  const columns = [
    { Header: '버전', accessor: 'version', width: '5%', align: 'left' },
    { Header: '릴리즈 날짜', accessor: 'releaseDate', width: '5%', align: 'left' },
    { Header: '작성자', accessor: 'author', width: '5%', align: 'left' },
    { Header: '작성 날짜', accessor: 'createDate', width: '5%', align: 'left' },
    { Header: '옵션', accessor: 'option', width: '5%', align: 'center' }
  ];

  const rows = sortedRelease.map((release) => ({
    version: release.version,
    releaseDate: release.releaseDate,
    author: release.member.name,
    createDate: release.createdAt,
    option: (
      <div>
        <IconButton onClick={handleClick}>
          <Icon>settings</Icon>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      </div>
    )
  }));

  return {
    columns,
    rows
  };
}
