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
import { React, useState, useRef ,useEffect } from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";

// react-routers components
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import defimg from "assets/images/default_avatar.jpg";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import Edit from "layouts/profile/edit"
import breakpoints from "assets/theme/base/breakpoints";

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000', // add a high zIndex value
  },
  content: {
    width: '60%',
    height: '80%',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -45%)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'relative', // make sure it's a positioned element
    zIndex: '10001',// it should be higher than overlay's zIndex to appear on top
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'transparent'
  }
};

function ProfileInfoCard({ title, description, info, social, action, shadow ,memberId,handleCopy}) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;
  const [activeModal, setActiveModal] = useState(false);
  const [image, setImage] = useState(defimg)
  const [profileImg, setProfileImg] = useState(new FormData());
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const fileInput = useRef(null)
  const token = localStorage.getItem('ACCESS_TOKEN');


  const openProfileEditModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

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
    setImage("https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/ff71cfd6bffa41b5ba1c19d02635640f/releasy/profile%2F" + memberId);
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
        alert(response.data.message);
      })
      .catch((error) => {
        // 에러 처리를 합니다.
        console.error("이미지 전송 에러:", error);
      });
  };



  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
      
    </MDBox>
  ));

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  


  return (
    <Card sx={{ height: "100%", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", width: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top" onClick={openProfileEditModal}>
            <Icon>edit</Icon>
          </Tooltip>
          <Modal
            isOpen={activeModal}
            onRequestClose={closeModal}
            style={customModalStyles}
          >
            <Edit info={info} description={description}/>
          </Modal>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
         
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
        <div style={containerStyle}>
        <MDAvatar src={image} onError= {handleImageError} alt="profile-image" size="xl" shadow="sm" onClick={() => { fileInput.current.click() }} />
            <MDButton onClick={handleSubmit} sx={{ height: "18px" , marginTop:"4%"}}>등록</MDButton><br/>
              <input
                type='file'
                style={{ display: 'none' }}
                accept='image/jpg,image/png,image/jpeg'
                name='profileImg'
                onChange={onChange}
                ref={fileInput} />
                    </div>
       
          {renderItems}
          <CopyToClipboard text={info.groupCode} onCopy={handleCopy} style={{marginLeft : "20%"}}>
            <MDButton>그룹 코드 복사</MDButton>
            </CopyToClipboard>
          
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
