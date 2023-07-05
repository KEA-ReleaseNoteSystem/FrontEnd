import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

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



  const [updatedProject, setUpdatedProject] = useState(project);




  const { currentUserId } = currentUserIdMock;

  const handleIssueDrop = ({ draggableId, destination, source }) => {

    if (!isPositionChanged(destination, source)) return;


    console.log("== draggableId:", draggableId);
    const issueId = Number(draggableId);



    console.log("draggableId", draggableId)
    console.log("--destination", destination)
    console.log("source", source)

    const updateLocalProjectIssuesMock = (issueId, fields) => {
      console.log("&& fields: ", fields);
      // console.log("&& project: ", project);
      const issueToUpdate = project.issues.find(issue => issue.id === issueId);
      console.log("&& issueToUpdate: ", issueToUpdate);
      // const issueToUpdate = project.issues.filter(issue => issue.id !== issueId);
      // console.log("&& issueId: ", issueId);

      if (issueToUpdate) {
        issueToUpdate.status = fields.status;
        issueToUpdate.listPosition = fields.position;
      }

      // console.log("@@ issueToUpdate: ", issueToUpdate);
      // project.issues.splice(issueId, 1);

      // console.log("추출한 project: ", tt);
      // issueToUpdate.splice(issueId, 0,tt);
      // console.log("다시 세팅한 project: ", issueToUpdate);

      // project.issues = issueToUpdate;
      console.log("최종 다시 세팅한 project: ", project);
      // Update the state with the updated project

      setUpdatedProject({ ...project });
      console.log("## updatedProject: ", updatedProject);
    };

    
    console.log("issueId: ", issueId);

    updateLocalProjectIssuesMock(issueId, {
      status: destination.droppableId, 
      position:
        calculateIssueListPosition(updatedProject.issues, destination, source, issueId)
    });



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
  console.log("** prevIssue", prevIssue)
  console.log("** nextIssue", nextIssue)
  let position;

  if ((!prevIssue && !nextIssue) || (prevIssue===undefined && nextIssue===undefined)) {
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
  // const beforeDropDestinationIssues = getSortedListIssues(allIssues, destination.droppableId);
  let beforeDropDestinationIssues = getSortedListIssues(allIssues, tt);

  let droppedIssue = [];
  let diffIssue = [];
  for(let i=0; i< allIssues.length; i++){
    if(allIssues[i].status === destination.droppableId)
    droppedIssue.push(allIssues[i]);
    else if(allIssues[i].id === droppedIssueId)
    diffIssue.push(allIssues[i]);
  }

  // const droppedIssue = allIssues.find((issue) => { 
  //   console.log("** issue.status: ", issue.status);
  //   return issue.status === droppedIssueId});

  const isSameList = destination.droppableId === source.droppableId;

//======
  // const afterDropDestinationIssues = isSameList
  //   ? moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index)
  //   : insertItemIntoArray(beforeDropDestinationIssues, diffIssue, destination.index);

  //   console.log("** afterDropDestinationIssues **: ", afterDropDestinationIssues);
  //   console.log("** destination.index **: ", destination.index);

  // return {
  //   prevIssue: afterDropDestinationIssues[destination.index],
  //   nextIssue: afterDropDestinationIssues[destination.index + 2],
  // };

  // ======
  let afterDropDestinationIssues = null;
  if(isSameList){
    afterDropDestinationIssues = moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index);
    console.log(afterDropDestinationIssues[destination.index])
    if(source.index > destination.index){
      return {
        prevIssue: afterDropDestinationIssues[destination.index-1],
        nextIssue: afterDropDestinationIssues[destination.index ],
      };
    }else{
      return {
        prevIssue: afterDropDestinationIssues[destination.index],
        nextIssue: afterDropDestinationIssues[destination.index + 2],
      };
    }
  }else{
    afterDropDestinationIssues = insertItemIntoArray(beforeDropDestinationIssues, diffIssue, destination.index);
    return {
      prevIssue: afterDropDestinationIssues[destination.index-1],
      nextIssue: afterDropDestinationIssues[destination.index + 1],
    };
  }

};

// const getSortedListIssues = (issues, status) =>{
//   console.log(" --- issues: ", issues);
//   console.log(" --- status: ", status);
//   let temp = [];
//   for(let i = 0; i< issues.length; i++){
//     if(String(issues[i].status) == String(status)){
//       temp.push(issues[i]);
//       console.log("** i: ", i);
//       console.log(`** issues[${i}]: `, issues[i]);
//     }
    
//   }
//   // temp.push(issues.map(issue => issue.status === status));
//   console.log("--- temp : ", temp);
//   for(let i=0; i<temp.length; i++){
//     console.log("--- temp[i] : ", temp[i]);
//   }
//   return temp;
//   // .sort((a, b) => a.listPosition - b.listPosition);
// }

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

  

// ProjectBoardLists.propTypes = propTypes;

export default ProjectBoardLists;