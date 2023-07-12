import { useState } from "react";
import axios from "axios";

import PageLayout from "../../../examples/LayoutContainers/PageLayout";
import NavigationBar from "../components/NavigationBar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Select } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const token = localStorage.getItem("ACCESS_TOKEN");
const NewProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    description: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Send form data as JSON using Axios
    axios
      .post("/api/project", formData, {headers})
      .then((response) => {
        console.log("Form submitted successfully", response);
        alert(response.data.message);
        // Reset form fields and state
        setFormData({
          name: "",
          status: "",
          description: "",
        });
        setIsFormValid(false);
        window.location.href = "/home/manage-project";
      })
      .catch((error) => {
        console.log(formData);
        console.error("Error submitting form", error);
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
                  <MDButton
                    variant="gradient"
                    color="info"
                    disabled={!isFormValid}
                    onClick={handleFormSubmit}
                  >
                    생성
                  </MDButton>
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
