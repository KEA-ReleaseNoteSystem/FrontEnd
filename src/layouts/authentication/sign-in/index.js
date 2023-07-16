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
import axios from "axios";
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

  const handleSubmit = () => {
    // POST 요청을 보내는 부분
    axios.post("/api/member/login", {
      email: email,
      password: password
      // 다른 데이터들도 추가로 설정할 수 있습니다.
    })
      .then((response) => {
        console.log(response)
        alert(response.data.message); // Alert 창을 띄웁니다.
        localStorage.setItem("ACCESS_TOKEN", response.data.data);
        window.location.href = "/home/manage-project";

      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
      });
  };




  const isEmailEmpty = email === "";
  const isEmailWrong = !(email && email.includes("@"));
  const isPasswordEmpty = password === "";
  const isPasswordUnderEight = password.length < 8;

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
              <MDInput type="email" label="이메일" fullWidth required value={email} onChange={handleEmailChange} />
              {(!isEmailEmpty && isEmailWrong) ? (<MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;이메일 형식이 틀립니다.</MDTypography>) : <MDTypography> </MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="비밀번호" fullWidth required value={password} onChange={handlePasswordChange} />
              {(!isPasswordEmpty && isPasswordUnderEight) ? (<MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;비밀번호는 8글자 이상입니다.</MDTypography> ) : <MDTypography> </MDTypography>}
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
              <MDButton variant="gradient" color="info" fullWidth disabled={isEmailEmpty || isPasswordUnderEight || isEmailWrong || isPasswordEmpty} onClick={handleSubmit}>
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
          <MDBox mt={1} mb={1}>
            <MDButton
              component="a"
              href="http://localhost:8080/oauth2/authorization/kakao"
              fullWidth
            >
              <img width="100%" src={kakaoLogin} alt="카카오 로그인" />
            </MDButton>
            <MDButton
              component="a"
              href="http://localhost:8080/oauth2/authorization/naver"
              fullWidth
            >
              <img width="100%" src={naverLogin} alt="네이버 로그인" />
            </MDButton>
            <MDButton
              component="a"
              fullWidth
              href="http://localhost:8080/oauth2/authorization/google"
            >
              <img width="100%" src={googleLogin} alt="구글 로그인" />
            </MDButton>
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
