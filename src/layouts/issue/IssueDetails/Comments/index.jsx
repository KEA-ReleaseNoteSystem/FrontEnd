import React from 'react';
import PropTypes from 'prop-types';

import { sortByNewest } from 'shared/utils/javascript';

import Create from './Create';
import Comment from './Comment';
import { Comments, Title } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  fetchedMemo: PropTypes.func.isRequired,
};



const ProjectBoardIssueDetailsComments = ({issue,memo,setMemo}) => (
  <Comments>
    <Create issue={issue} fetchedMemo={memo} setMemo={setMemo}  />
    {sortByNewest(memo, 'createdAt').map(comment => (
      <Comment key={comment.id} comment={comment} fetchedMemo={memo} />
    ))}
  </Comments>
);

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
