import { useState } from "react";
import axios from "axios";

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
import { Select } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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
          alert(response.data.message);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Validate input fields
    if (name === "name" && value.trim() === "") {
      setIsFormValid(false);
    } else if (name === "status" && value.trim() === "") {
      setIsFormValid(false);
    } else if (name === "description" && value.trim() === "") {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  return (
    <PageLayout>
      <NavigationBar />
      <MDBox mb={2} />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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
                ml={3}
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
                    <InputLabel id="select-label">상태</InputLabel>
                    <Select
                      label="상태"
                      value={formData.status}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ height: "5.5vh" }}
                      required
                      name="status"
                    >
                      <MenuItem value={"Stopped"}>중단됨</MenuItem>
                      <MenuItem value={"In-progress"}>진행중</MenuItem>
                      <MenuItem value={"Completed"}>완료됨</MenuItem>
                      <MenuItem value={"Not-started"}>시작 전</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="textarea"
                    label="설명"
                    defaultValue=""
                    multiline
                    rows={5}
                    fullWidth
                    required
                    name="description"
                    onChange={handleInputChange}
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
