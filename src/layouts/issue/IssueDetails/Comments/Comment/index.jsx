import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';


import { formatDateTimeConversational } from 'shared/utils/dateTime';
import Axios from 'axios';
import BodyForm from '../BodyForm';

import { RecoilRoot ,useRecoilState} from "recoil";
import { projectIdState } from 'examples/Sidenav/ProjectIdAtom';

  
import {
  Comment,
  UserAvatar,
  Content,
  Username,
  CreatedAt,
  Body,
  EditLink,
  DeleteLink,
} from './Styles';

const propTypes = {
  comment: PropTypes.object.isRequired,
  fetchedMemo: PropTypes.func.isRequired,
};
const ProjectBoardIssueDetailsComment = ({ comment, fetchedMemo }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [isDeleted, setDeleted] = useState(false); // 상태 추가
  const [body, setBody] = useState(comment.memo_content);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [projectId, setProjectId] = useRecoilState(projectIdState);



  const handleCommentDelete = async () => {
    try {
      console.log("comment.issueId", comment.issueId);
      console.log("comment.id", comment.id);
      
    const result = await Axios.delete(`/api/memo/${encodeURIComponent(projectId)}/${comment.issueId}/${comment.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      
  
      // Assuming you want to setDeleted only if the deletion is successful
      if (result.status === 200) {
        setDeleted(true); // Set the deleted state
      }
    } catch (error) {
      console.error('Error making the request:', error.message);
      console.error('Full error object:', error);

    }
  };
  


  const handleCommentUpdate = async () => {
    try {
      setUpdating(true);
      var now = new Date().toISOString();
      let result = await Axios.patch(`/api/memo/${encodeURIComponent(projectId)}/${comment.issueId}/${comment.id}`, {
        memoId : comment.id,
        content: body,
        updatedAt: now
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUpdating(false);
      setFormOpen(false);
    } catch (error) {
      console.error('Error making the request:', error.message);
      console.error('Full error object:', error);

    }
  };


  return (
    !isDeleted && (
      <Comment data-testid="issue-comment">
        {/* <UserAvatar name={comment.memberNickName} avatarUrl={null} /> */}
        <Content>
          <Username>{comment.memberNickName}</Username>
          <CreatedAt>{formatDateTimeConversational(comment.createdAt)}</CreatedAt>
  
          {isFormOpen ? (
            <BodyForm
              value={body}
              onChange={setBody}
              isWorking={isUpdating}
              onSubmit={handleCommentUpdate}
              onCancel={() => setFormOpen(false)}
            />
          ) : (
            <Fragment>
              <Body>{body}</Body>
              <EditLink onClick={() => setFormOpen(true)}>Edit</EditLink>
              <DeleteLink onClick={() => handleCommentDelete()}>Delete</DeleteLink>
            </Fragment>
          )}
        </Content>
      </Comment>
    )
  );
  }

ProjectBoardIssueDetailsComment.propTypes = propTypes;

export default ProjectBoardIssueDetailsComment;
