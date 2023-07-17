import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Axios from "axios"

// import useCurrentUser from 'shared/hooks/currentUser';
import toast from 'shared/utils/toast';

import BodyForm from '../BodyForm';
import ProTip from './ProTip';
import { Create, UserAvatar, Right, FakeTextarea } from './Styles';

const propTypes = {
  issueId: PropTypes.number.isRequired,
  fetchIssue: PropTypes.func.isRequired,
  setMemo: PropTypes.func.isRequired, 
};

const ProjectBoardIssueDetailsCommentsCreate = ({ issue, fetchedMemo, setMemo }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState('');
  const [memoLength, setMemoLength] = useState(fetchedMemo.id);
  console.log("body", body);
  const { currentUser } = 1;

  const token = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    setMemoLength(fetchedMemo.id);
  }, [fetchedMemo]);

  const handleCommentCreate = async () => {
    try {
      setCreating(true);
      var now = new Date().toISOString();
      let result = await Axios.post(`/api/memo/1/${issue.id}`, {
        issueId: issue.id,
        content: body,
        createdAt: now
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("result",result.data);
      
      var data = {
        id: result.data.memoId,
        issueId: issue.id,
        memo_content: body,
        memberNickName : result.data.memberNickname,
        createdAt: now,
      };

      setFormOpen(false);
      setCreating(false);
      setMemo(prevMemo => [...prevMemo, data]); // Use callback form to access previous state
      setBody('');
    } catch (error) {
      console.error('Error making the request:', error.message);
      console.error('Full error object:', error);
      toast.error(error);
    }
  };

  return (
    <Create>
      {currentUser && <UserAvatar name={currentUser.name} avatarUrl={currentUser.avatarUrl} />}
      <Right>
        {isFormOpen ? (
          <BodyForm
            value={body}
            onChange={setBody}
            isWorking={isCreating}
            onSubmit={handleCommentCreate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <FakeTextarea onClick={() => setFormOpen(true)}>Add a comment...</FakeTextarea>
            <ProTip setFormOpen={setFormOpen} />
          </Fragment>
        )}
      </Right>
    </Create>
  );
};

ProjectBoardIssueDetailsCommentsCreate.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsCreate;