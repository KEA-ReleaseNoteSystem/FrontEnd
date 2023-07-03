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

import googleLogin from "assets/images/google_login.png";
import kakaoLogin from "assets/images/kakao_login.png";
import naverLogin from "assets/images/naver_login.png";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const isEmailEmpty = (email === "") || !(email.includes("@"));
  const isPasswordEmpty = password === "";

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
            로그인
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            이메일 또는 소셜 로그인을 진행할 수 있습니다.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="이메일" fullWidth required value={email} onChange={handleEmailChange}/>
              {isEmailEmpty ? ( <MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;이메일 형식이 틀립니다.</MDTypography> ) : <MDTypography> </MDTypography> }
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="비밀번호" fullWidth required value={password} onChange={handlePasswordChange}/>
              {isPasswordEmpty ? ( <MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;패스워드를 입력해주세요.</MDTypography> ) : <MDTypography> </MDTypography> }
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;이메일 기억하기
              </MDTypography>
            </MDBox>
            <MDBox mt={1} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth component={Link} to={"/home"} disabled={isEmailEmpty || isPasswordEmpty}>
                로그인
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                아직 계정이 없으신가요?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  회원가입
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <a href='http://localhost:8080/oauth2/authorization/kakao'>
              <img width="100%" height="35px" src={kakaoLogin} alt="카카오 로그인" /></a>
            <br />
            <a href='http://localhost:8080/oauth2/authorization/naver'>
              <img width="100%" height="35px" src={naverLogin} alt="네이버 로그인" /></a>
            <br />
            <a href='http://localhost:8080/oauth2/authorization/google'>
              <img width="100%" height="35px" src={googleLogin} alt="구글 로그인" /></a>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography
              component={Link}
              to="/home"
              variant="button"
              color="gray"
              fontWeight="light"
            >
              메인 화면으로 돌아가기
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
