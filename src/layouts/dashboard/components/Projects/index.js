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

import { useState, Link } from "react";
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
function Projects() {
  const [issues, setIssues] = useState([
    {
      name: "#00 Test issue",
      description: "어쩌구 되지않는 이슈",
      member: "서강덕",
      due: "2020-05-04",
      value: 20,
    },
    {
      name: "#00 Test issue",
      description: "어쩌구 되지않는 이슈",
      member: "서지원",
      due: "2020-08-02",
      value: 70,
    },
    {
      name: "#00 Test issue",
      description: "어쩌구 되지않는 이슈",
      member: "서지원",
      due: "2020-03-04",
      value: 40,
    },
    {
      name: "#00 Test issue",
      description: "어쩌구 되지않는 이슈",
      member: "박재석",
      due: "2020-06-03",
      value: null,
    },
    {
      name: "#00 Test issue",
      description: "어쩌구 되지않는 이슈",
      member: "서강덕",
      due: "2020-06-04",
      value: null,
    },
    {
      name: "#00 Test issue",
      description: "어쩌구 되지않는 이슈",
      member: "서강덕",
      due: "2020-06-09",
      value: null,
    },
    {
      name: "#00 Test issue",
      description: "어쩌구 되지않는 이슈",
      member: "박도영",
      due: "2020-06-25",
      value: 80,
    },
  ]);
  const [filteredIssues, setFilteredIssues] = useState(issues);
  const { columns, rows } = data({ issues:filteredIssues });
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
    const filteredIssues = issues.filter((issue) => issue.member === "서지원");
    setFilteredIssues(filteredIssues);
    setMenu(null);
  };

  const handleSort = (sortType) => {
    let sortedArray = [...issues];

    if (sortType === "value") {
      sortedArray.sort((a, b) => {
        if (a.value === null) return 1;
        if (b.value === null) return -1;
        return a.value - b.value;
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
      <Box sx={{ position: "absolute",borderRadius:"100px", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <Box sx={{ bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius:10}}>
          <Gpt/>
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
      <MenuItem onClick={() => handleSort("due")}>기한 순 정렬</MenuItem>
      <MenuItem  onClick={onClicks}>GPT 추천</MenuItem>
    </Menu> 
  );

  return (
    <Card>
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
      <MDBox sx={{ overflowY: "scroll",  maxHeight:"200px"}}>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
        {renderModal}
      </MDBox>
    </Card>
  );
}

export default Projects;