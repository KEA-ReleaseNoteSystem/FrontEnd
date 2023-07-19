import React, { useState, useEffect } from 'react';
import "./index.css"
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Description from 'layouts/issue/IssueDetails/Description';
import Comments from 'layouts/issue/IssueDetails/Comments';


function IssueEditing({ issue, updateIssue, fetchedMemo }) {


    // console.log("updateIssue",updateIssue);
  
    const [Memo, setMemo] = useState(fetchedMemo);
  
    useEffect(() => {
      setMemo(fetchedMemo);
    }, [updateIssue]);
  
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
                    <Grid item xs={11} >
                      <MDTypography variant="body2" fontWeight="medium" multiline fullWidth>
                        댓글
                      </MDTypography>
                       <Comments issue={issue} memo={Memo} fetchedMemo={fetchedMemo} setMemo={setMemo}/>
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