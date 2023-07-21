import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

import useCurrentUser from 'shared/hooks/currentUser';
// import api from 'shared/utils/api';
import { moveItemWithinArray, insertItemIntoArray } from 'shared/utils/javascript';
import { IssueStatus } from 'shared/constants/issues';

import List from './List';
import { Lists } from './Styles';
import { Button } from '@mui/material';


const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const currentUserIdMock = 1;

const ProjectBoardLists = ({ project, filters, updateLocalProjectIssues }) => {

  // console.log("projectId: ", project);
  console.log("projectId: ", project.id);
  const [updatedProject, setUpdatedProject] = useState(project);

  const { currentUserId } = currentUserIdMock;

  const handleIssueDrop = async ({ draggableId, destination, source }) => {
    /*
    console.log("draggableId: ", draggableId);
    console.log("destination: ", destination);
    console.log("source: ", source);
    // 이거 가지고 수정 API 날리면 됨
    */
    
  await axios.post(`/api/project/${project.id}/issues/management/dragndrop`, {
    issueId : Number(draggableId),
    destinationStatus: destination.droppableId,
    sourceStatus: source.droppableId
  });


    if (!isPositionChanged(destination, source)) return;

    const issueId = Number(draggableId);

    const updateLocalProjectIssuesMock = (issueId, fields) => {

      const issueToUpdate = project.issues.find(issue => issue.id === issueId);

      if (issueToUpdate) {
        issueToUpdate.status = fields.status;
        issueToUpdate.listPosition = fields.position;
      }

      console.log("최종 다시 세팅한 project: ", project);
      // Update the state with the updated project

      setUpdatedProject({ ...project });
      console.log("## updatedProject: ", updatedProject);
    };

    updateLocalProjectIssuesMock(issueId, {
      status: destination.droppableId,
      position:
        calculateIssueListPosition(updatedProject.issues, destination, source, issueId)
    });
  };

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {Object.values(IssueStatus).map(status => (
          <List
            key={status}
            status={status}
            project={updatedProject}
            filters={filters}
            currentUserId={currentUserId}
          />
        ))}
      </Lists>

    </DragDropContext>
  );
};

const isPositionChanged = (destination, source) => {
  if (!destination) return false;

  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateIssueListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);

  let position;

  if ((!prevIssue && !nextIssue) || (prevIssue === undefined && nextIssue === undefined)) {
    position = 1;
  } else if (!prevIssue || prevIssue === undefined) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue || nextIssue === undefined) {
    position = prevIssue.listPosition + 1;
  } else {
    position = prevIssue.listPosition + (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }
  return position;
};

const getAfterDropPrevNextIssue = (allIssues, destination, source, droppedIssueId) => {
  let tt = destination.droppableId;
  let beforeDropDestinationIssues = getSortedListIssues(allIssues, tt);

  let droppedIssue = [];
  let diffIssue = [];
  for (let i = 0; i < allIssues.length; i++) {
    if (allIssues[i].status === destination.droppableId)
      droppedIssue.push(allIssues[i]);
    else if (allIssues[i].id === droppedIssueId)
      diffIssue.push(allIssues[i]);
  }
  const isSameList = destination.droppableId === source.droppableId;

  let afterDropDestinationIssues = null;
  if (isSameList) {
    afterDropDestinationIssues = moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index);
    console.log(afterDropDestinationIssues[destination.index])
    if (source.index > destination.index) {
      return {
        prevIssue: afterDropDestinationIssues[destination.index - 1],
        nextIssue: afterDropDestinationIssues[destination.index],
      };
    } else {
      return {
        prevIssue: afterDropDestinationIssues[destination.index],
        nextIssue: afterDropDestinationIssues[destination.index + 2],
      };
    }
  } else {
    afterDropDestinationIssues = insertItemIntoArray(beforeDropDestinationIssues, diffIssue, destination.index);
    return {
      prevIssue: afterDropDestinationIssues[destination.index - 1],
      nextIssue: afterDropDestinationIssues[destination.index + 1],
    };
  }
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

export default ProjectBoardLists;