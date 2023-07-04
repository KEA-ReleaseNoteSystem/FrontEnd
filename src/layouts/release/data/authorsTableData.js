/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { date } from "yup";
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";

const Release = [
  {
    version: "1.0.0",
    author: {
      image: team2,
      name: "John Michael",
      email: "john@creative-tim.com",
    },
    status: "online",
    releaseDate: "23/04/18",
    createDate: "23/04/19"
  },
  {
    version: "1.1.0",
    author: {
      image: team2,
      name: "John Michael",
      email: "john@creative-tim.com",
    },
    status: "online",
    releaseDate: "23/04/18",
    createDate: "23/04/19"
  },
];


export default function data() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log("릴리즈 삭제");
    handleClose();
  };

  const handleEdit = () => {
    console.log("릴리즈 수정");
    handleClose();
  };

  const handleShare = () => {
    console.log("릴리즈 공유");
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
  const columns = [
    { Header: "버전", accessor: "version", width: "5%", align: "left" },
    { Header: "릴리즈 날짜", accessor: "releaseDate", width: "5%" ,align: "left" },
    { Header: "작성자", accessor: "author", width: "5%", align: "left" },
    { Header: "작성 날짜", accessor: "createDate", width: "5%" ,align: "left" },
    { Header: "옵션", accessor: "option", width: "5%",  align: "center" },
  ];

  const sortedRelease = Release.sort((a, b) => {
    return b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: 'base' });
  });

  const rows = sortedRelease.map((release) => ({
    version: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {release.version}
      </MDTypography>
    ),
    releaseDate: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {release.releaseDate}
      </MDTypography>
    ),
    author: (
      <Author image={release.author.image} name={release.author.name} email={release.author.email} />
    ),
    createDate: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {release.releaseDate}
      </MDTypography>
    ),
    option: (
      <div>
      <IconButton onClick={handleClick}>
        <Icon>settings</Icon>
      </IconButton>
      <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
      <MenuItem onClick={handleEdit}>Edit</MenuItem>
      <MenuItem onClick={handleShare}>Share</MenuItem>
    </Menu>
    </div>
    )
  }));

  return {
    columns,
    rows,
  };
}
