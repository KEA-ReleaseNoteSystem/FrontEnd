import React from 'react';
import { useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { Droppable } from 'react-beautiful-dnd';
import { intersection } from 'lodash';

import { IssueStatusCopy } from 'shared/constants/issues';

import Issue from './Issue';
import CreateIssue from '../create-issue';
import { List, Title, IssuesCount, Issues } from './Styles';
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from 'react-modal';

const propTypes = {
  status: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
};

const defaultProps = {
  currentUserId: null,
};

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000', // add a high zIndex value
  },
  content: {
    width: '60%',
    height: '80%',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -45%)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'relative', // make sure it's a positioned element
    zIndex: '10001', // it should be higher than overlay's zIndex to appear on top
  }
};

const ProjectBoardList = ({ status, project, filters, currentUserId }) => {

  const [issue, setIssue] = useState(null);
  const [activeModal, setActiveModal] = useState("");

  const openIssueAddModal = () => {
    setActiveModal("createIssue");
    console.log("이슈 상태: ", activeModal);
  };

  const openIssueDetailModal = () => {
    setActiveModal("detailIssue");
    console.log("이슈 상태: ", activeModal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };


  const filteredIssues = filterIssues(project.issues, filters, currentUserId);
  const filteredListIssues = getSortedListIssues(project.issues, status);
  const allListIssues = getSortedListIssues(project.issues, status);
  console.log("filteredListIssues", filteredListIssues)

  const [anchorEl, setAnchorEl] = useState(null);

  //백로그 작성하기 버튼
  const handleBackLogAddOnClick = (event) => {
    console.log("백로그 추가")
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Droppable key={filteredListIssues} droppableId={status}>
        {provided => (
          <List>
            {/* <div onClick={openIssueDetailModal}> */}
            <Title>
              {`${IssueStatusCopy[status]} `}
              <IssuesCount>{formatIssuesCount(allListIssues, filteredListIssues)}</IssuesCount>
            </Title>
            <Issues
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredListIssues.map((issue, index) => (
                <Issue key={issue.id} projectUsers={project.users} issue={issue} index={index} />
              ))}
              {provided.placeholder}
            </Issues>
            {/* </div> */}
            {status === "backlog" && activeModal !== "createIssue" && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton onClick={openIssueAddModal}>
                    <AddCircleOutlineIcon color="info" />
                  </IconButton>
                </div>
              )}
          </List>
        )}
      </Droppable>
      <Modal
        isOpen={activeModal === "createIssue"}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <CreateIssue />
      </Modal>
    </>
  );
};

const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  let issues = projectIssues;
  if (userIds.length > 0) {
    issues = issues.filter(issue => intersection(issue.userIds, userIds).length > 0);
  }
  return issues;
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

const formatIssuesCount = (allListIssues, filteredListIssues) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

ProjectBoardList.propTypes = propTypes;
ProjectBoardList.defaultProps = defaultProps;

export default ProjectBoardList;
