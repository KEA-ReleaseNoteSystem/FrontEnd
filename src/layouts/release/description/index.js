import React, { Fragment, useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import MDInput from 'components/MDInput';
import MDTypography from "components/MDTypography";
import { getTextContentsFromHtmlString } from 'shared/utils/browser';
import { TextEditor, TextEditedContent, Button } from 'shared/components';

import { Title, EmptyLabel, Actions } from './Styles';
import axios from 'axios';
const propTypes = {

};

const ProjectBoardIssueDetailsDescription = ( {description,setDescription} ) => {
  
  // const [description, setDescription] = useState(issue.description);
  const [isEditing, setEditing] = useState(false);
  

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


  // useEffect(() => {
  
  //   setDescription(issue.description);
  // }, [issue.description]);
  

  const isDescriptionEmpty = getTextContentsFromHtmlString(description).trim().length === 0;

  

  const handleUpdate = () => {
  setEditing(false);

  
  };



  return (
<Fragment> 
      {isEditing ? (
        <Fragment>
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
              <br/>
              <TextEditedContent content={description} onClick={() => setEditing(true)} />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
    
  );
};

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
