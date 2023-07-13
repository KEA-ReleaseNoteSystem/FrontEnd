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
import { Link, useLocation, useNavigate } from "react-router-dom";

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
import { Alert } from "react-bootstrap";
import axios from "axios";
import { from } from "stylis";

function JoinGroup() {
  const [groupName, setGroupName] = useState("");

  const location = useLocation();
  const { name, nickname, position, email, password, provider } = location.state;

  const handleGroupCodeChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = () => {
    // POST 요청을 보내는 부분
    axios.post("/api/member/signup/group/join", {
      name: name,
      nickname: nickname,
      position: position,
      provider: provider,
      email: email,
      password: password,
      groupName: groupName,
      // 다른 데이터들도 추가로 설정할 수 있습니다.
    })
    .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          window.location.href = "/authentication/sign-in";
        } // Alert 창을 띄웁니다.
    })
    .catch((error) => {
      // 요청이 실패한 경우의 처리
      console.error(error);
    });
  };

  const isGroupCodeEmpty = groupName === "";

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
          textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            회원가입 - 그룹 참여
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            참여할 그룹의 코드를 입력해주세요.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="그룹 코드" fullWidth required value={groupName} onChange={handleGroupCodeChange}/>
            </MDBox>
            { isGroupCodeEmpty ? ( <MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;그룹 코드를 입력해주세요.</MDTypography> ) : <MDTypography> </MDTypography>}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" disabled={isGroupCodeEmpty} onClick={handleSubmit}>
                회원가입
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default JoinGroup;