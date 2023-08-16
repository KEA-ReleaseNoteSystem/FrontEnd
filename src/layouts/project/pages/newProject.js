import { useState } from "react";
import axios from "interceptor/TokenCheck.js";

import PageLayout from "../../../examples/LayoutContainers/PageLayout";
import NavigationBar from "../components/NavigationBar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Description from 'layouts/release/description';
import { Select } from "@mui/material";

import { Icon, IconButton, Menu, MenuItem, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DefaultNavbar from 'layouts/homepage/examples/Navbars/DefaultNavbar';
import routes from '../data/home.routes.js';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';


function ProjectStatusSelector({ label, value, onChange }) {
  const [selectedStatus, setSelectedStatus] = useState("프로젝트 상태를 설정해주세요.");
  const [anchorEl, setAnchorEl] = useState(null);

  const statuses = [
    { label: "중단됨", value: "중단됨" },
    { label: "진행중", value: "진행중" },
    { label: "완료됨", value: "완료됨" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (statusValue) => {
    setSelectedStatus(statusValue);
    onChange(statusValue);  // Call parent's onChange with the new status value
    handleClose();
  };

  return (
    <MDBox mb={2}>
      <MDInput
        label={label}
        value={selectedStatus}
        fullWidth
        InputProps={{
          startAdornment: (
            <div>
              <IconButton onClick={handleClick}>
                <ArrowCircleDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} onClick={() => handleStatusChange(status.value)}>
                    {status.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ),
        }}
      />
    </MDBox>
  );
}


const NewProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    description: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleFormSubmit = (event) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    event.preventDefault();
    setIsLoading(true); // Start loading
    


    // Send form data as JSON using Axios
    axios
      .post("/api/project", formData, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Form submitted successfully", response);
        setIsLoading("success"); // Set loading state to success
        setTimeout(() => {
          // Reset form fields and state
          setFormData({
            name: "",
            status: "",
            description: "",
          });
          setIsFormValid(false);
          setIsLoading(false); // Stop loading
          window.location.href = "/home/manage-project";
        }, 2000); // Wait for 2 seconds
      })
      .catch((error) => {
        console.log(formData);
        console.error("Error submitting form", error);
        setIsLoading("error"); // Set loading state to error
        setTimeout(() => {
          setIsLoading(false); // Stop loading
        }, 2000); // Wait for 2 seconds
      });
  };

  const handleStatusChange = (newStatus) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: newStatus,
    }));
    const isAnyFieldEmpty =
      formData.name.trim() === "" ||
      newStatus.trim() === "" ||
      formData.description.trim() === "";
    setIsFormValid(!isAnyFieldEmpty);
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    const isAnyFieldEmpty =
      formData.name.trim() === "" ||
      formData.status.trim() === "" ||
      formData.description.trim() === "";

    // isFormValid를 하나 이상의 필드가 비어있으면 false로 설정, 그렇지 않으면 true로 설정
    setIsFormValid(!isAnyFieldEmpty);
  };

  return (
    <PageLayout>
      <DefaultNavbar
        routes={routes}
        sticky
      />
      <MDBox sx={{ mb: 2, mt: 15 }} />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} >
          <Card style={{ maxWidth: "1300px",minHeight: "600px", margin: "0 auto" }}>
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
              <MDBox
                component="form"
                role="form"
                mt={6}
                ml={9}
                mr={10}
              >
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="프로젝트 이름"
                    defaultValue=""
                    fullWidth
                    required
                    name="name"
                    onChange={handleInputChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <FormControl fullWidth>
                  <ProjectStatusSelector 
                    label="상태" 
                    value={formData.status} 
                    onChange={handleStatusChange}
                  />
                  </FormControl>
                </MDBox>
                <MDBox mb={10}>
                {/* <MDBox pt={2} px={2} mb={2}>
                                <Card sx={{ backgroundColor: '#e9e9e9' }}>
                                    <MDBox pt={2} px={2} pb={2}>
                                        <MDTypography variant="body2" fontWeight="medium">
                                            세부 설명
                                        </MDTypography>
                                        <MDBox pt={1} px={2}>
                                            <Description />
                                        </MDBox>
                                    </MDBox>
                                </Card>
                            </MDBox> */}
                  <MDInput
                    type="textarea"
                    label="설명"
                    defaultValue=""
                    multiline
                    rows={10}
                    fullWidth
                    required
                    name="description"
                    onChange={handleInputChange}
                    style={{ fontSize: '14.5rem', height: '200px' }}
                  />
                </MDBox>
                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                  {isLoading ? (
                    isLoading === "success" ? ( // Render success message if loading state is "success"
                      <MDBox display="flex" alignItems="center">
                        <CircularProgress color="info" size={30} />
                        <MDTypography variant="body2" ml={2}>
                          프로젝트 생성중...
                        </MDTypography>
                      </MDBox>
                    ) : <MDBox display="flex" alignItems="center"></MDBox>
                  ) : (
                    <MDButton
                      variant="gradient"
                      color="info"
                      disabled={!isFormValid}
                      onClick={handleFormSubmit}
                    >
                      생성
                    </MDButton>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
};

export default NewProject;
