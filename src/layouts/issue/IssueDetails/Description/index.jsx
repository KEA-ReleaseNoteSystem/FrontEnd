import React, { Fragment, useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import MDInput from 'components/MDInput';
import MDTypography from "components/MDTypography";
import { getTextContentsFromHtmlString } from 'shared/utils/browser';
import { TextEditor, TextEditedContent, Button } from 'shared/components';

import { Title, EmptyLabel, Actions } from './Styles';
import axios from 'axios';
const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDescription = ( {issue,updateIssue} ) => {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [isEditing, setEditing] = useState(false);
  
  console.log("updateIssue" , updateIssue);

  // const handleUpdate = async () => {
  //   setEditing(false);
  //   console.log(`DS 변경 ${issue.id}`);
  //   setDescription(description);

  //   // const response = await axios.put(`/api/project/${1}/issues/${issueDetail.id}`,{
  //     const response = await axios.put(`/api/${Number(1)}/issues/${issue.id}`,{
  //     title : null, 
  //     description : description
  //   });
  // };


  useEffect(() => {
    setTitle(issue.title);
    setDescription(issue.description);
  }, [issue.title,issue.description]);
  

  const isDescriptionEmpty = getTextContentsFromHtmlString(description).trim().length === 0;

  

  const handleUpdate = () => {
  setEditing(false);
  updateIssue({ title, description });
  
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
<Fragment>
      
      {isEditing ? (
        <Fragment>
          <MDTypography variant="h6">
                &nbsp; 이슈 :&nbsp;  <MDInput variant="standard" defaultValue={title} onChange={handleTitleChange} />
                <br/><br/>
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
              &nbsp;  세부 설명
                </MDTypography>
          <TextEditor
            placeholder="Describe the issue"
            defaultValue={description}
            onChange={setDescription}
          />
          <Actions>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
            <Button variant="empty" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Actions>
        </Fragment>
      ) : (
        <Fragment>
          {isDescriptionEmpty ? (
            <EmptyLabel onClick={() => setEditing(true)}>Add a description...</EmptyLabel>
          ) : (
            <Fragment>
              <MDTypography variant="h6">
                이슈 :&nbsp;   <MDInput variant="standard" value={title} onClick={() => setEditing(true)} />
              </MDTypography>
              <br/>
              <MDTypography variant="body2" fontWeight="medium">
               세부 설명 
              <TextEditedContent content={description} onClick={() => setEditing(true)} />
              </MDTypography>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
    
  );
};

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
