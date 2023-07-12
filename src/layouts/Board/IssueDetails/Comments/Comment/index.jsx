import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import Axios from "axios";
import toast from 'shared/utils/toast';
import { formatDateTimeConversational } from 'shared/utils/dateTime';
import { ConfirmModal } from 'shared/components';

import BodyForm from '../BodyForm';
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
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsComment = ({ comment, fetchIssue }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [body, setBody] = useState(comment.body);

  const handleCommentDelete = async () => {
    try {
      await Axios.patch(`/api/memo/${projectId}/${issueId}/${memoId}/delete`, {
        memberId: 1,
        issueId: 1,
        content: body,
        createdAt: currentDateTime,
      }, {
        headers: {
          'Content-Type': 'application/json', // 요청 본문의 타입을 지정합니다.
        }
      });
    } catch (error) {
      console.error('Error making the request:', error.message);
      console.error('Full error object:', error);
      toast.error(error);
    }
  };

  const handleCommentUpdate = async () => {
    try {
      setUpdating(true);
      await Axios.patch(`api/memo/${projectId}/${issueId}/${memoId}/patch`, {
        memberId: 1,
        issueId: 1,
        content: body,
        createdAt: currentDateTime,
      }, {
        headers: {
          'Content-Type': 'application/json', // 요청 본문의 타입을 지정합니다.
        }
      });
      setUpdating(false);
      setFormOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Comment data-testid="issue-comment">
      <UserAvatar name={comment.user.name} avatarUrl={comment.user.avatarUrl} />
      <Content>
        <Username>{comment.user.name}</Username>
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
            <Body>{comment.body}</Body>
            <EditLink onClick={() => setFormOpen(true)}>Edit</EditLink>
            <ConfirmModal
              title="Are you sure you want to delete this comment?"
              message="Once you delete, it's gone for good."
              confirmText="Delete comment"
              onConfirm={handleCommentDelete}
              renderLink={modal => <DeleteLink onClick={modal.open}>Delete</DeleteLink>}
            />
          </Fragment>
        )}
      </Content>
    </Comment>
  );
};

ProjectBoardIssueDetailsComment.propTypes = propTypes;

export default ProjectBoardIssueDetailsComment;
