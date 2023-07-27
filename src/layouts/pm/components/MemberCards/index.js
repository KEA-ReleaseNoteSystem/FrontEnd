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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

import axios from 'axios';

const token = localStorage.getItem("ACCESS_TOKEN");

function DefaultProjectCard({ id, projectId,image, name, nickname,position, email, role }) {


  const handleOnClickDelete = (id) => {

    axios.delete('/api/project/member', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        memberId: id,
        projectId: projectId
      }
    } )
    .then(response => {
      if (response.status === 200) {
        window.location.reload();
      }
    })
    .catch(error => {
      console.error('Error updating member info:', error);
    });
  }

  const handleOnClickAssign = (id) => {

    console.log(token);
    const data = {
      memberId: id,
      projectId: projectId
    };

    axios.patch('/api/project/role/pm', data,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    } )
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
        window.location.href = '/dashboard';
      }
    })
    .catch(error => {
      console.error('Error updating member info:', error);
    });
  }

  return (
    <>
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          name={name}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDBox mb={1}>
    
            <MDTypography
              component="a"
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {nickname}
            </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {name} / {position} 
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {email}
          </MDTypography>
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {role}
          </MDTypography>
        </MDBox>
        <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDButton
            variant="outlined"
            size="small"
            color="info"
            onClick={() => handleOnClickAssign(id)}
          >
            Assign
          </MDButton>

            <MDButton
              component="a"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleOnClickDelete(id)}
            >
              DELETE
            </MDButton>
        </MDBox>
      </MDBox>
    </Card>
    </>
  );
}

export default DefaultProjectCard;
