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
import axios from "axios";

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


function IssueEditing({ issue, updateIssue, fetchedMemo,projectId }) {
  // console.log("updateIssue",updateIssue);
  const [Memo, setMemo] = useState(fetchedMemo);
  const [childIssues, setChildIssues] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(0);

  const [currentIds, setCurrentIds] = useState([issue.id]);
  const [otherIssue, setOtherIssue] = useState([]);
  const [isLoading,setIsLoading] = useState(true);



  const openIssueAddModal = () => {
    setActiveModal("addChildIssue");
  };
 
  const closeModal = () => {
    setCurrentIds([issue.id]);
    setActiveModal(null);
    console.log("이슈id",issue.id);
  };


  const handleClick = (issue, issueIndex) => {
    setSelectedIssueIndex(issueIndex);

  };



  //


  // const getOtherIssue = async (excludeissues) => {
  //   try {
  //     console.log("시발");
  //     const response = await axios.get(`/api/${projectId}/issues?exclude=${excludeissues.join(',')}` , { headers : {
  //       Authorization: `Bearer ${token}`
  //     }});
  //     console.log('Response other:', response.data.data);
  //     setOtherIssue(response.data.data);
  //     setIsLoading(false);

    
  //   } 
  //   catch (error) {
  //   console.error(error);
  //   }
  // };

  
  const getOtherIssue = async (excludeissues) => {
    try {
      console.log("시발롬아!",`/api/${projectId}/issues?exclude=${excludeissues.join(',')}`);
      const response = await axios.get(`/api/${projectId}/issues?exclude=${excludeissues.join(',')}`);

      console.log('Response other:', response.data.data);
      setOtherIssue(response.data.data);
      setIsLoading(false);

    
    } 
    catch (error) {
    console.error(error);
    }
  };


  

  // const handleCurrentIds = (id) => {
  //   setCurrentIds(prevState => {
  //     if (prevState.includes(id)) {
  //       return prevState;
  //     } else {
  //       return [...prevState, id];
  //     }
  //   });
  // };
  


  // async function getChildIssues(issueId, token) {
  //   try {
  //     const response = await axios.get(`/api/childIssues/${encodeURIComponent(issueId)}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setChildIssues(response.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    setMemo(fetchedMemo);
    
    // getChildIssues()
  }, [updateIssue]);


  useEffect(() => {
    setCurrentIds([issue.id])
    
    // getChildIssues()
  }, [issue.id]);

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
          <MDBox pt={2} px={2} mb={2}>
            <Card sx={{ backgroundColor: '#F0EDEE' }}>
              <MDBox pt={2} px={2} pb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={8}>
                    <MDTypography variant="body2" fontWeight="medium" multiline fullWidth>
                      하위 이슈 관리
                    </MDTypography>
                  </Grid>
                  <Grid item xs={4}>
                    <MDButton size="small" color="black"  onClick={() => { openIssueAddModal(); getOtherIssue(currentIds);}}>
                      <AddCircleOutlineIcon color="white" />&nbsp; 추가
                    </MDButton>
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
          <MDBox pt={1} pl={1} pr={1}>
            <MDTypography variant="caption" color="info" sx={{ ml: 1 }}>연결된 하위 이슈를 추가할 수 있습니다.</MDTypography>
            {isLoading ? (
                    <MDTypography>There are no issues</MDTypography>
                  ) : (
                    otherIssue.map((issue, index) => (
                      <div
                        key={issue.id}
                        onClick={() => {handleClick(issue, index)}}
                      >
                        <ProjectBoardListIssue
                          issue={issue}
                          index={index}
                          selected={selectedIssueIndex === index}
                        />
                      </div>
                    ))
                  )}
          </MDBox>
        </Card>
      </Modal>
                  </Grid>
                  <Grid item xs={8} sx={{ m: 3 }}>
                    테스트
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