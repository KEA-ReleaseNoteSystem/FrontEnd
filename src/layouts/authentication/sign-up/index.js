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

// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bgtmp.png";

function Cover() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleJobChange = (event) => {
    setJob(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isNameEmpty = name === "";
  const isNicknameEmpty = nickname === "";
  const isJobEmpty = job === "";
  const isEmailEmpty = (email === "") || !(email.includes("@"));
  const isPasswordEmpty = password === "";

  return (
    <BasicLayout image={bgImage}>
      <br />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            회원가입
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            회원가입에 필요한 정보를 입력해주세요.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="이름" variant="standard" fullWidth value={name} onChange={handleNameChange} required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="닉네임" variant="standard" fullWidth value={nickname} onChange={handleNicknameChange} required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="직무 (예시: FE, BE)" variant="standard" fullWidth value={job} onChange={handleJobChange} required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="이메일" variant="standard" fullWidth value={email} onChange={handleEmailChange} required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="비밀번호" variant="standard" fullWidth value={password} onChange={handlePasswordChange} required/>
            </MDBox>
            {(isEmailEmpty || isJobEmpty || isNameEmpty || isNicknameEmpty || isPasswordEmpty) ?  ( <MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;제대로 입력되지 않은 칸이 존재합니다.</MDTypography> ) : <MDTypography> </MDTypography>}
            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton variant="gradient" color="info" type="submit" size="large" disabled={isEmailEmpty || isJobEmpty || isNameEmpty || isNicknameEmpty || isPasswordEmpty}
              component={Link} to={{
                pathname: "/authentication/sign-up/create-group",
                state: {
                  name,
                  nickname,
                  job,
                  email,
                  password,
                },
              }}>
                새 그룹 생성
              </MDButton>
              &nbsp;&nbsp;
              <MDButton variant="gradient" color="info" type="submit" size="large" disabled={isEmailEmpty || isJobEmpty || isNameEmpty || isNicknameEmpty || isPasswordEmpty}
              component={Link} to={{
                pathname: "/authentication/sign-up/join-group",
                state: {
                  name,
                  nickname,
                  job,
                  email,
                  password,
                },
              }}>
                그룹 참가
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                이미 계정이 있으신가요?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  로그인
                </MDTypography>
              </MDTypography>
            </MDBox>
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

export default Cover;
