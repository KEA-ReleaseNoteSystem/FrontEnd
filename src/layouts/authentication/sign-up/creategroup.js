
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bgtmp.png";

function CreateGroup() {


    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        회원가입 - 새 그룹 생성
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        생성할 그룹의 이름을 입력해주세요.
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput type="text" label="그룹 이름" fullWidth />
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton variant="gradient" color="info" fullWidth component={Link} to="/home">
                                회원가입
                            </MDButton>
                        </MDBox>
                    </MDBox>
                    <MDBox mt={3} mb={1} textAlign="center">
                        <MDTypography fontWeight="light" variant="caption">
                            “내 정보” 페이지에서 그룹 코드를 확인할 수 있으며,<br/>그룹 코드를 통해 구성원들이 참가할 수 있습니다.
                        </MDTypography>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default CreateGroup;