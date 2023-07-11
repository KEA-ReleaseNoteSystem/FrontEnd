import React from 'react';
import PropTypes from 'prop-types';

import { sortByNewest } from 'shared/utils/javascript';

import Create from './Create';
import Comment from './Comment';
import { Comments, Title } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};



const ProjectBoardIssueDetailsComments = ({ issue, fetchIssue }) => (
  <Comments>
    
    <Create issueId={issue.memoId} fetchIssue={fetchIssue} />
   

    {sortByNewest(issue, 'createdAt').map(comment => (
      <Comment key={comment.memoId} comment={comment} fetchIssue={fetchIssue} />
    ))}
  </Comments>
);

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
