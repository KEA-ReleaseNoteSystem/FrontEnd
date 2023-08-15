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

import { useState, Link, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";

import Gpt from "layouts/gpt"
//GPT
import teamTable from "layouts/myteam";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from 'recoil';
import { projectIdState } from '../../../../examples/Sidenav/ProjectIdAtom.js';
import { ConstructionOutlined } from "@mui/icons-material";
import axios from 'axios';

function Projects() {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [myName, setMyName] = useState("");

  async function getIssueData(projectId, token) {
    try {
      const response = await axios.get(`/api/${encodeURIComponent(projectId)}/issues`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIssues(response.data.data);
      setFilteredIssues(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMyInfo(token) {
    try {
      const response = await axios.get(`/api/member`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyName(response.data.data.name);
      console.log("내이름", myName);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getIssueData(projectId, token);
    getMyInfo(token);
    
    setLoading(false);
  }, []);

  const { columns, rows } = data({ issues: filteredIssues });
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [openModals, setOpenModal] = useState(false);
  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  // 이전 코드
  const onClicks = () => {
    openModal();
    setMenu(null);
  };

  const handleShowAssignedIssues = () => {
    const filteredIssues = issues.filter((issue) => issue.memberIdInCharge.name === myName);
    setFilteredIssues(filteredIssues);
    setMenu(null);
  };

  const handleSort = (sortType) => {
    let sortedArray = [...issues];

    if (sortType === "value") {
      sortedArray.sort((a, b) => {
        if (a.importance === null) return -1;
        if (b.importance === null) return 1;
        return b.importance - a.importance;
      });
    } else if (sortType === "due") {
      sortedArray.sort((a, b) => {
        if (a.due === "0000-00-00") return 1;
        if (b.due === "0000-00-00") return -1;
        return new Date(a.due) - new Date(b.due);
      });
    }

    setFilteredIssues(sortedArray);
    setMenu(null);
  };

  const renderModal = (
    <Modal
      open={openModals}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: "absolute", borderRadius: "100px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Box sx={{ bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 10 }}>
          <Gpt />
        </Box>
      </Box>
    </Modal>
  );

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handleShowAssignedIssues()}>나에게 배정된 Issue만 확인</MenuItem>
      <MenuItem onClick={() => handleSort("value")}>중요도 순 정렬</MenuItem>
      <MenuItem onClick={() => handleSort("due")}>생성일 순 정렬</MenuItem>
      <MenuItem onClick={onClicks}>GPT 추천</MenuItem>
    </Menu>
  );
    return (
      <Card>
        {loading ? (
        <MDBox display="flex" justifyContent="center" alignItems="center" height="200px">
          로딩 중...
        </MDBox>
      ) : (
        <>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Issues
            </MDTypography>
            <MDBox display="flex" alignItems="center" lineHeight={0}>
              <Icon
                sx={{
                  fontWeight: "bold",
                  color: ({ palette: { info } }) => info.main,
                  mt: -0.5,
                }}
              >
                done
              </Icon>
              <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp; 현재 처리 중인 이슈들을 확인하세요. 
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox color="text" px={2}>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
              more_vert
            </Icon>
          </MDBox>
          {renderMenu}
        </MDBox>
        <MDBox sx={{ overflowY: "scroll", maxHeight: "500px" }}>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
          {renderModal}
        </MDBox>
        </>)}
      </Card>
    );

}

export default Projects;