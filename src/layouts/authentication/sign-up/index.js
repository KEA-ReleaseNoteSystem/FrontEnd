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
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
import CreateGroup from "./creategroup";

// Images
import bgImage from "assets/images/bgtmp.png";

function Cover() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const provider = searchParams.get('provider');
  const oauthEmail = searchParams.get("email");
  const oauthName = searchParams.get('username');


  
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    
  useEffect(() => {
    if (oauthEmail !== "" && oauthName !== "") {
      setEmail(oauthEmail);
      setName(oauthName);
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCreateGroupOnClick = () => {
    navigate("/create-group", {
      state: {
        provider,
        name,
        nickname,
        position,
        email,
        password
      }
    });
  }

  const isNameEmpty = name === "";
  const isNicknameEmpty = nickname === "";
  const isPositionEmpty = position === "";
  const isEmailEmpty = ((email === oauthEmail && oauthEmail === null) || email === "" ? true : false);
  const isEmailWrong = !(email && email.includes("@"));
  const isPasswordEmpty = password === "";
  const isPasswordUnderEight = password.length < 8;

  console.log(`oauthEmail: ${oauthEmail}, isEmailEmpty: ${isEmailEmpty}, isEmailWrong: ${isEmailWrong}`);

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
              <MDInput type="text" label="이름" variant="standard" fullWidth defaultValue={oauthName ? oauthName : ""} onChange={handleNameChange}  disabled={!!oauthName} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="닉네임" variant="standard" fullWidth value={nickname} onChange={handleNicknameChange} required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="직무 (예시: FE, BE)" variant="standard" fullWidth value={position} onChange={handlePositionChange} required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="이메일" variant="standard" fullWidth defaultValue={oauthEmail ? oauthEmail : ""} onChange={handleEmailChange}  disabled={!!oauthEmail}/>
              {(!isEmailEmpty && isEmailWrong) ? (<MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;이메일 형식이 틀립니다.</MDTypography>) : <MDTypography> </MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="비밀번호" variant="standard" fullWidth value={password} onChange={handlePasswordChange} required/>
              {(!isPasswordEmpty && isPasswordUnderEight) ? (<MDTypography fontWeight="light" color="error" variant="caption">&nbsp;&nbsp;비밀번호는 8글자 이상입니다.</MDTypography> ) : <MDTypography> </MDTypography>}
            </MDBox>
            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton variant="gradient" color="info" type="submit" size="large" disabled={isEmailEmpty || isEmailWrong || isPositionEmpty || isNameEmpty || isNicknameEmpty || isPasswordEmpty || isPasswordUnderEight}
              component={Link} to={"/authentication/sign-up/create-group"} state = {{
                  provider: provider,
                  name: name,
                  nickname: nickname,
                  position: position,
                  email: email,
                  password: password
                }}
              >
                새 그룹 생성
              </MDButton>
              &nbsp;&nbsp;
              <MDButton variant="gradient" color="info" type="submit" size="large" disabled={isEmailEmpty || isEmailWrong || isPositionEmpty || isNameEmpty || isNicknameEmpty || isPasswordEmpty || isPasswordUnderEight}
              component={Link} to={"/authentication/sign-up/join-group"}
                state = {{
                  provider,
                  name,
                  nickname,
                  position,
                  email,
                  password,
                }
              }>
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
