import { useState, useEffect, useRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import axios from "interceptor/TokenCheck.js";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import defimg from "assets/images/default_avatar.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDButton from "components/MDButton";
// import backgroundImage from "assets/images/home.png";

function Header({ children, info , memberId}) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const fileInput = useRef(null)
  const token = localStorage.getItem('ACCESS_TOKEN');
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [image, setImage] = useState(defimg)
  const [profileImg, setProfileImg] = useState(new FormData());

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const newProfileImg = new FormData();
      newProfileImg.append("profileImg", e.target.files[0]);
      setProfileImg(newProfileImg);
    } else { //업로드 취소할 시
      setImage(defimg);
      setProfileImg(new FormData());
      return
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    setImage("http://localhost:8080/" + memberId + ".jpg");
    console.log("memberId" , memberId);
  }, [memberId]);

  const handleImageError = () => {
    setImage(defimg);
  };

  const handleSubmit = () => {
    profileImg.append("profileImg", image);
    axios
      .post("/api/member/profileImage",profileImg,
        {
          headers: 
          { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // 에러 처리를 합니다.
        console.error("이미지 전송 에러:", error);
      });
  };


  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={image} onError= {handleImageError} alt="profile-image" size="xl" shadow="sm" onClick={() => { fileInput.current.click() }} />
            <MDButton onClick={handleSubmit}>등록</MDButton>
            <input
              type='file'
              style={{ display: 'none' }}
              accept='image/jpg,image/png,image/jpeg'
              name='profileImg'
              onChange={onChange}
              ref={fileInput} />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {/* {info.nickname} */}     {/* <- 이게 문제. 주석처리하면 됨. */}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;