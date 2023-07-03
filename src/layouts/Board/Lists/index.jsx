import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import useCurrentUser from 'shared/hooks/currentUser';
// import api from 'shared/utils/api';
import { moveItemWithinArray, insertItemIntoArray } from 'shared/utils/javascript';
import { IssueStatus } from 'shared/constants/issues';

import List from './List';
import { Lists } from './Styles';



const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const currentUserIdMock = 1;

const ProjectBoardLists = ({ project, filters, updateLocalProjectIssues }) => {
  
  const [updatedProject, setUpdatedProject] = useState(project);




  const { currentUserId } = currentUserIdMock;

  const handleIssueDrop = ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source,destination)) return;

    const issueId = Number(draggableId);
    

    console.log("draggableId",draggableId)
    console.log("destination",destination)
    console.log("source",source)

    const updateLocalProjectIssuesMock = (issueId, fields) => {
      const issueToUpdate = project.issues.find(issue => issue.id === issueId);
  
      if (issueToUpdate) {
        issueToUpdate.status = fields.status;
        issueToUpdate.listPosition = fields.position;
      }
  
      
      // Update the state with the updated project
      setUpdatedProject({ ...project });
    };
    
    updateLocalProjectIssuesMock(issueId,{ status: destination.droppableId ,position: 
      calculateIssueListPosition(project.issues, destination, source, issueId)});
   

    
    // console.log("꺅",updateLocalProjectIssuesMock(issueId,{ status: destination.droppableId }))
    
    // fields => updateLocalProjectIssues(issueId, fields);
  //   api.optimisticUpdate(`/issues/${issueId}`, {
  //     updatedFields: {
  //       status: destination.droppableId,
  //       listPosition: calculateIssueListPosition(project.issues, destination, source, issueId),
  //     },
  //     currentFields: project.issues.find(({ id }) => id === issueId),
  //     setLocalData: fields => updateLocalProjectIssues(issueId, fields),
  //   });
   };

   
   
   console.log("프로젝트 목록", project);
   console.log("필터 목록", filters);
   console.log("뭐더",Object.values(IssueStatus))



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
  console.log("prevIssue",prevIssue)
  console.log("nextIssue",nextIssue)
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position = prevIssue.listPosition + (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }

  console.log("position",position);
  return position;
};

const getAfterDropPrevNextIssue = (allIssues, destination, source, droppedIssueId) => {
  const beforeDropDestinationIssues = getSortedListIssues(allIssues, destination.droppableId);
  const droppedIssue = allIssues.find(issue => issue.status === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index-1)
    : insertItemIntoArray(beforeDropDestinationIssues, droppedIssue, destination.index+1);

  console.log("가자",afterDropDestinationIssues);

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

ProjectBoardLists.propTypes = propTypes;

export default ProjectBoardLists;
