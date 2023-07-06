import React from 'react';
import { useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { useMatch } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';

import { IssueLink, Issue, Title, Bottom, Assignees, AssigneeAvatar } from './Styles';
import Modal from 'react-modal';
import IssueDetail from '../../detail-issue';
import MDBadge from "components/MDBadge";


const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
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


const addIssue = ({ projectUsers, issue, index }) => {
  const [activeModal, setActiveModal] = useState("");

  const openIssueDetailModal = () => {
    setActiveModal("detailIssue");
    console.log("이슈 내용: ", issue);
  };

  const closeModal = () => {
    setActiveModal(null);
  };


  console.log("index", index);
  const assignees = issue.userIds.map(userId => projectUsers.find(user => user.id === userId));

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'success';
      case 'backlog':
        return 'dark';
      case 'inprogress':
        return 'warning';
      default:
        return 'default';
    }
  }

  const getPriorityColor = (priority) => {
    if (priority >= 90) {
      return 'error';
    } else if (priority < 90 && priority >= 50) {
      return 'warning';
    } else {
      return 'info';
    }
  }

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <IssueLink
          //to={`$/issues/${issue.id}`}
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div onClick={openIssueDetailModal}>
            <Issue isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
              <Title>{issue.title}</Title>
              <Bottom>
                <div>
                  <MDBadge
                    badgeContent={issue.status}
                    color={getStatusColor(issue.status)}
                    variant="gradient"
                    size="sm"
                  />

                  <MDBadge
                    badgeContent={issue.type}
                    color={getPriorityColor(issue.priority)}
                    variant="gradient"
                    size="sm"
                  />

                </div>
                <Assignees>
                  {assignees.map(user => (
                    <AssigneeAvatar
                      key={user.id}
                      size={24}
                      avatarUrl={user.avatarUrl}
                      name={user.name}
                    />
                  ))}
                </Assignees>
              </Bottom>
            </Issue>
          </div>
          <Modal
            isOpen={activeModal === "detailIssue"}
            onRequestClose={closeModal}
            style={customModalStyles}
          >
            <IssueDetail issue={issue} />
          </Modal>
        </IssueLink>
      )}
    </Draggable>
  );
};

addIssue.propTypes = propTypes;

export default addIssue;
