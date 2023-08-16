// react-router-dom components
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "interceptor/TokenCheck.js";

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
  const oauthEmail = searchParams.get("email");
  const oauthName = searchParams.get('username');
  const joinEmail = location.state?.email;
  console.log(joinEmail);
  console.log("oauth", oauthEmail);
  const [email, setEmail] = useState(joinEmail);
  useEffect(() => {
    if(oauthEmail !== "" && oauthName !== "" && oauthEmail!=null) {
      console.log("111");
      setEmail(oauthEmail);
    }else{
      console.log("222");
      setEmail(joinEmail);
    }
  }, [joinEmail]);

  console.log("adsfasd", email);

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
            그룹 재참가
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mt={1} mb={1} textAlign="center">
              <MDButton variant="gradient" color="info" type="submit" size="large" 
              component={Link} to={"/authentication/rejoin/create-group"} state = {{
                  email: email
                }}
              >
                새 그룹 생성
              </MDButton>
              &nbsp;&nbsp;
              <MDButton variant="gradient" color="info" type="submit" size="large"
              component={Link} to={"/authentication/rejoin/join-group"}
                state = {{
                  email: email
                }
              }>
                그룹 참가
              </MDButton>
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
