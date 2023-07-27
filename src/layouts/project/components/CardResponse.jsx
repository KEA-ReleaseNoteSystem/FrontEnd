import React, { useState, useCallback } from 'react';
import '../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown as ReactBootstrapDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Project from '../../../assets/images/survey.png';
import Badge from 'react-bootstrap/Badge';
import 'animate.css';
import tableData from "layouts/project/data/tableData";
import DataTable from "examples/Tables/DataTable";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Cardm from "@mui/material/Card";

import { useRecoilState } from 'recoil';
import { projectIdState } from '../../../examples/Sidenav/ProjectIdAtom.js';


function projectStatus(status) {
  if (status == "In-progress") {
    return (<Badge bg="primary" style={{ fontSize: '12px' }}>
      '진행중'
    </Badge>);
  }
  else if (status == "Completed") {
    return (<Badge bg="success" style={{ fontSize: '12px' }}>
      '완료'
    </Badge>);
  }
  if (status == "Stopped") {
    return (<Badge bg="danger" style={{ fontSize: '12px' }}>
      '중단함'
    </Badge>);
  }
  else {
    return (<Badge bg="warning" style={{ fontSize: '12px' }}>
      '시작 전'
    </Badge>);
  }
}

const Card = ({ key, itemId, id, title, pmname, status, date }) => {
  
  const { columns, rows } = tableData(id={id});
  const project = "릴리즈 노트 조회";
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReleaseNoteModal, setShowReleaseNoteModal] = useState(false);

  const [projectId, setProjectId] = useRecoilState(projectIdState);
  console.log(projectId);
  const onClickHandleRecoil = useCallback((id) => {
    setProjectId(id);
    console.log(projectId);
  }, [setProjectId]);

  return (
    <div className="col-lg-3A wow slideInUp" data-wow-delay="0.2s" >


      <img className="img-fluid" src={Project} alt="" style={{ width: '100%' }} />
      <div className="p-5" style={{ height: '200px', backgroundColor: '#F8F9FA', boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.2)' }}>
        {projectStatus(status)}<br></br>
        <h5 className="fw-bold  card-title">{title}</h5>

        <ReactBootstrapDropdown>
          <ReactBootstrapDropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-info dropdown-toggle">
            <span className="fas fa-ellipsis-v ellipsis-icon"></span>
          </ReactBootstrapDropdown.Toggle>
          <ReactBootstrapDropdown.Menu>

            <ReactBootstrapDropdown.Item className="custom-dropdown-item" onClick={() =>  {onClickHandleRecoil(id); setShowReleaseNoteModal(true);}}>
              릴리즈노트 조회
            </ReactBootstrapDropdown.Item>

          </ReactBootstrapDropdown.Menu>
        </ReactBootstrapDropdown>
        <Modal size="lg" show={showReleaseNoteModal} onHide={() => setShowReleaseNoteModal(false)}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body >
            {/* Add the content for release note here */}
            <MDBox pt={6} pb={3}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Cardm>
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
                        {project}
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={3}>
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </MDBox>
                  </Cardm>
                </Grid>
              </Grid>
            </MDBox>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReleaseNoteModal(false)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
        <MDTypography variant="body2">
          <i className="far fa-user text-primary me-2" />{pmname}
          <br />
          <i className=" far fa-calendar-alt text-primary me-" />&nbsp;&nbsp;{date}
        </MDTypography>
      </div>
    </div>
  );
};

export default Card;