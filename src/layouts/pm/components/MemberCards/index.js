// react-router-dom components
import { Link } from "react-router-dom";
import {useState} from "react";
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

import { Modal, Button } from "react-bootstrap";

const token = localStorage.getItem("ACCESS_TOKEN");

function DefaultProjectCard({ id, projectId, image, name, nickname, position, email, role }) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    })
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

    axios.patch('/api/project/role/pm', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
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
            {role !== "PM" && (
              <MDButton
                variant="outlined"
                size="small"
                color="info"
                onClick={() => setShowAssignModal(true)}
              >
                PM 양도
              </MDButton>
            )}
            {role !== "PM" && (
              <MDButton
                component="a"
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                size="small"
                color="error"
                onClick={() =>setShowDeleteModal(true)}
              >
                삭제
              </MDButton>
            )}
          </MDBox>
        </MDBox>
      </Card>
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} style={{ top: "30%"}}>
        <Modal.Header closeButton>
          <Modal.Title>권한 양도</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말로 PM 권한을 {name}에게 양도하시겠습니까? 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            닫기
          </Button>
          <Button variant="info" onClick={() => handleOnClickAssign(id)}>
            PM 양도
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} style={{ top: "30%"}}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말로 {name} 프로젝트에서 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleOnClickDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DefaultProjectCard;
