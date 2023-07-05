
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


const NewProject = () => {

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
                                    <MDInput type="text" label="프로젝트 이름" defaultValue="BrainForm" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="그룹" defaultValue="kakao99%" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="상태" defaultValue="stop" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="textarea" label="설명" defaultValue="뇌파를 이용한 설문조사 서비스" fullWidth />
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