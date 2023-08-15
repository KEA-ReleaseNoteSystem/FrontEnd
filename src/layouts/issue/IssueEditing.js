import React, { useState, useEffect } from 'react';
import "./index.css"
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from 'components/MDButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Description from 'layouts/issue/IssueDetails/Description';
import Comments from 'layouts/issue/IssueDetails/Comments';
import Modal from 'react-modal';
import ProjectBoardListIssue from 'layouts/Board/Lists/List/Issue/ListAll';
import ListChildIssue from 'layouts/Board/Lists/List/Issue/ListChild';
import ListSelectedChildIssue from 'layouts/Board/Lists/List/Issue/ListChildBySelected';
import axios from "axios";
import Dropzone  from 'layouts/release/components/Dropzone.jsx'

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000', // add a high zIndex value
  },
  content: {
    width: '60%',
    height: '80%',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -45%)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    position: 'relative', // make sure it's a positioned element
    zIndex: '10001', // it should be higher than overlay's zIndex to appear on top
    paddingTop: '3%'
  }
};


function IssueEditing({ issue, updatedchildIssues, updateIssue, deleteChild, fetchedMemo, projectId, createChildIssue ,submitIssue}) {
  console.log("issue", issue);
  console.log("issue1", issue.imgUrl_1);
  console.log("issue2", issue.imgUrl_2);
  const [Memo, setMemo] = useState(fetchedMemo);
  const [childIssues, setChildIssues] = useState(updatedchildIssues);
  const [activeModal, setActiveModal] = useState("");
  const [selectedIssueIndex, setSelectedIssueIndex] = useState();
  const [currentIds, setCurrentIds] = useState([issue.id]);
  const [otherIssue, setOtherIssue] = useState([]);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [selectedIssueIndices, setSelectedIssueIndices] = useState([]);

  const [dialogInitialFiles, setDialogInitialFiles] = useState([
    process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.imgUrl_1,
    process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.imgUrl_2,
    process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.imgUrl_3
  ].filter(url => url !== "" && url !== process.env.REACT_APP_KIC_OBJECT_STORAGE && url !== (process.env.REACT_APP_KIC_OBJECT_STORAGE)+null&& url !== (process.env.REACT_APP_KIC_OBJECT_STORAGE)+undefined));

  useEffect(() => {
    setDialogInitialFiles([
      process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.imgUrl_1,
      process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.imgUrl_2,
      process.env.REACT_APP_KIC_OBJECT_STORAGE + issue.imgUrl_3
    ].filter(url => url !== "" && url !== process.env.REACT_APP_KIC_OBJECT_STORAGE && url !== (process.env.REACT_APP_KIC_OBJECT_STORAGE)+null && url !== (process.env.REACT_APP_KIC_OBJECT_STORAGE)+undefined));
  }, [issue]);

  const openIssueAddModal = () => {
    setActiveModal("addChildIssue");
  };

  const closeModal = () => {
    setCurrentIds([issue.id]);
    setActiveModal(null);
    setSelectedIssueIndices([]);
  };


  const handleClick = (issue, issueIndex) => {
   
    setSelectedIssueIndices(prevIndices => {
        if (prevIndices.includes(issueIndex)) {
            return prevIndices.filter(idx => idx !== issueIndex);
        } else {
            return [...prevIndices, issueIndex];
        }
    });

 
    setSelectedIssues(prevIssues => {
        const existingIssue = prevIssues.find(si => si.id === issue.id);
        if (existingIssue) {
           
            return prevIssues.filter(si => si.id !== issue.id);
        } else {
      
            return [...prevIssues, issue];
        }
    });
};

  const handleAddIssues = () => {
    createChildIssue(selectedIssues);
    setSelectedIssues([]);
    closeModal();
  };


  const handleDelete = async (issue, issueIndex) => {
    deleteChild(issue);
    setChildIssues(prevChildIssues => prevChildIssues.filter(item => item.id !== issue.id));
  };


  


  const getOtherIssue = async (excludeissues) => {
    try {

      const response = await axios.get(`/api/${projectId}/issues?exclude=${excludeissues.join(',')}`);

      setOtherIssue(response.data.data);

    


    }
    catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    setMemo(fetchedMemo);
  }, [updateIssue]);


  useEffect(() => {
    setCurrentIds([issue.id]);
    setChildIssues(updatedchildIssues);
  }, [issue.id, issue.childIssue, createChildIssue]);



  const handleDropzoneChange = (files) => {

    submitIssue(files, currentIds); 
  };



  

  return (
    <Grid item xs={12} id="right" container direction="column" lg={200}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            이슈 편집
          </MDTypography>
        </MDBox>
        <Grid item xs={12} >
          <MDBox pt={2} px={2}>
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#F0EDEE' }}>
              <MDBox pt={2} px={2} pb={2}>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="body2">
                    <Description issue={issue} updateIssue={updateIssue} />
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
          <MDBox pt={5} px={5} mb={5}>
            <Card sx={{backgroundColor: 'white' }}>
              <Dropzone
                onClick={handleDropzoneChange}
                initialFiles={dialogInitialFiles}
              />
          
              
            </Card>
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>

            <Card sx={{ backgroundColor: '#F0EDEE' }}>
              <MDBox pt={2} px={3} pb={2}>
                {/* {!isChild ? (  */}
                <Grid container spacing={0}>
                  <Grid item xs={8}>
                    <MDTypography variant="body2" fontWeight="medium" multiline fullWidth>
                      하위 이슈 관리
                    </MDTypography>
                  </Grid>
                  <MDButton size="small" color="black" onClick={() => { openIssueAddModal(); getOtherIssue(currentIds); }}  style={{ marginLeft: '80px' }}>
                      <AddCircleOutlineIcon color="white" />&nbsp; 추가
                    </MDButton>
                  <Grid item xs={4}>
                  
                    <Modal
                      isOpen={activeModal === "addChildIssue"}
                      onRequestClose={closeModal}
                      style={customModalStyles}
                    >
                      <Card>
                        <MDBox
                          mx={2}
                          mt={-3}
                          py={3}
                          px={2}
                          variant="gradient"
                          bgColor="info"
                          borderRadius="lg"
                          coloredShadow="info"
                        >

                          <MDTypography variant="h6" color="white">
                            하위 이슈 추가
                          </MDTypography>
                        </MDBox>
                        <MDBox pt={1} pl={1} pr={1} style={{ overflowY: 'auto', maxHeight: '550px',minHeight:"550px"}}>
                          <MDTypography variant="caption" color="info" sx={{ ml: 1 }}>연결된 하위 이슈를 추가할 수 있습니다.</MDTypography>
                          {!otherIssue ? (
                              <MDTypography>There are no issues</MDTypography>
                          ) : (
                              otherIssue.map((issue, index) => (
                                  <div
                                      key={issue.id}
                                      onClick={() => { handleClick(issue, index) }}
                                  >
                                      <ListChildIssue
                                          issue={issue}
                                          index={index}
                                          selected={selectedIssueIndices.includes(index)}
                                        
                                      />
                                  </div>
                              ))
                          )}
                      </MDBox>
                   
                      </Card>
                      <br/>
                      <MDButton 
                            size="small" 
                            color="info" 
                            onClick={handleAddIssues} 
                            style={{ paddingLeft: '100px', paddingRight: '100px' }}
                        >
                          <AddCircleOutlineIcon color="white" />&nbsp; 추가
                        </MDButton>
                    </Modal>
                  </Grid>
                  <Grid item xs={8} sx={{ m: 3 }}>

                    {!childIssues ? (
                      null
                    ) : (
                      childIssues.map((issue, index) => (
                        <div
                          key={issue.id}
                         
                        >
                          <ListSelectedChildIssue
                            issue={issue}
                            index={index}
                            selected={selectedIssueIndex === index}
                            onDelete={handleDelete}
                          />
                        </div>
                      ))
                    )}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </MDBox>
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#F0EDEE' }}>
              <MDBox pt={2} px={2} pb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={11} >
                    <MDTypography variant="body2" fontWeight="medium" multiline fullWidth>
                      댓글
                    </MDTypography>
                    <Comments issue={issue} memo={Memo} fetchedMemo={fetchedMemo} setMemo={setMemo} />
                  </Grid>
                  <Grid item xs={8}>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography variant="button">
                    </MDTypography>
                  </Grid>
                </Grid>
                <MDBox pt={2} px={2}>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
        </Grid>
      </Card>
    </Grid>
  );
}


export default IssueEditing;