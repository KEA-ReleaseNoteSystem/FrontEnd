import { useState } from "react";

import PageLayout from "../../../examples/LayoutContainers/PageLayout";
import NavigationBar from "../components/NavigationBar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Select } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const NewProject = () => {

    //상태 선택 위함
    const [state, setState] = useState('');

    const handleChange = (event) => {
        setState(event.target.value);
    };

    return (
        <PageLayout>
            <NavigationBar />
            <MDBox mb={2} />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
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
                                    프로젝트 생성
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="프로젝트 이름" defaultValue="" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="그룹" defaultValue="" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">상태</InputLabel>
                                        <Select label="상태" value={state} onChange={handleChange} fullWidth sx={{height:"5.5vh"}}>
                                            <MenuItem value={"Stopped"}>중단됨</MenuItem>
                                            <MenuItem value={"In-progress"}>진행중</MenuItem>
                                            <MenuItem value={"Completed"}>완료됨</MenuItem>
                                            <MenuItem value={"Not-started"}>시작 전</MenuItem>
                                        </Select>
                                    </FormControl>
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="textarea" label="설명" defaultValue="" multiline rows={5} fullWidth />
                                </MDBox>
                                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                                    <MDButton variant="gradient" color="info" >
                                        생성
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </PageLayout>
    );
}


export default NewProject;