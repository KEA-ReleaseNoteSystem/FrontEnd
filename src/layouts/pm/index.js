import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../examples/Sidenav/ProjectIdAtom';
import Modal from 'react-modal';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Select } from "@mui/material";
import { Menu, MenuItem, IconButton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultProjectCard from "./components/MemberCards"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScrollHorizontal from 'react-scroll-horizontal';

import homeDecor2 from "assets/images/team-2.jpg";

import teamTable from "layouts/pm/join/memberTable";
import DataTable from "examples/Tables/DataTable";

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


function MDDatePicker({ label, defaultValue, onChange }) {
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <MDBox mb={2}>
      <MDInput
        type="text"
        label={label}
        value={defaultValue.toDateString()}
        readOnly
        fullWidth
        InputProps={{
          startAdornment: (
            <DatePicker
              selected={defaultValue}
              onChange={() => { }}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              customInput={<CalendarTodayIcon />}
            />
          ),
        }}
      />
    </MDBox>
  );
}

const PM = ({ projectInfo }, { project }) => {
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [groupMessage, setGroupMessage] = useState("");
  const [groupCodeMessage, setGroupCodeMessage] = useState("");
  const { columns, rows } = teamTable();

  const [activeModal, setActiveModal] = useState(false);

  const openAddMemberModal = () => {
    setActiveModal(true);
  };

  const closeAddMemberModal = () => {
    setActiveModal(false);
  };

  const handleGroupClick = () => {
    setGroupMessage("그룹 필드는 수정할 수 없습니다.");
    setTimeout(() => {
      setGroupMessage(""); // 일정 시간 후 메시지 지우기
    }, 2000);
  };

  const handleGroupCodeClick = () => {
    setGroupCodeMessage("그룹 코드 필드는 수정할 수 없습니다.");
    setTimeout(() => {
      setGroupCodeMessage(""); // 일정 시간 후 메시지 지우기
    }, 2000);
  };
  const handleFormSubmit = (event) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    event.preventDefault();
    setIsLoading(true); // Start loading
    // Send form data as JSON using Axios
    axios
      .put("/api/project", formData, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Form submitted successfully", response);
        setIsLoading("success"); // Set loading state to success
        setTimeout(() => {
          alert(response.data.message);
          // Reset form fields and state
          setFormData({
            id: "",
            name: "",
            status: "",
            description: "",
          });
          setIsFormValid(false);
          setIsLoading(false); // Stop loading
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

  const [formData, setFormData] = useState({
    id: projectInfo.id,
    name: projectInfo.name,
    status: projectInfo.status,
    description: projectInfo.description,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(projectInfo.id);
  console.log(projectInfo.name);
  const defaultValue = '뇌파를 이용한 설문조사 서비스';

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    <DashboardLayout>
      <DashboardNavbar />
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
                  Project Manage
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
                <MDBox mb={2}>
                  <MDInput type="text" label="프로젝트 이름" onChange={handleInputChange} name="name" defaultValue={projectInfo.name} fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput label="그룹" defaultValue={projectInfo.groupName} InputProps={{
                    readOnly: true,
                    onClick: handleGroupClick, // 클릭 이벤트 핸들러 추가
                  }} fullWidth />
                  {groupMessage && (
                    <MDTypography variant="body2" color="error">
                      {groupMessage}
                    </MDTypography>
                  )}
                </MDBox>
                <MDBox mb={2}>
                  <MDInput label="그룹 코드" defaultValue={projectInfo.groupCode} InputProps={{
                    readOnly: true,
                    onClick: handleGroupCodeClick, // 클릭 이벤트 핸들러 추가
                  }} fullWidth />
                  {groupCodeMessage && (
                    <MDTypography variant="body2" color="error">
                      {groupCodeMessage}
                    </MDTypography>
                  )}
                </MDBox>
                <MDBox mb={2}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">상태</InputLabel>
                    <Select
                      label="상태"
                      defaultValue={projectInfo.status}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ height: "5.5vh" }}
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
                    name="description"
                    defaultValue={projectInfo.description}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDDatePicker
                    label="생성일"
                    defaultValue={new Date(projectInfo.createAt)}
                    onChange={null}
                  />
                </MDBox>
                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                  {isLoading ? (
                    isLoading === "success" ? ( // Render success message if loading state is "success"
                      <MDBox display="flex" alignItems="center">
                        <CircularProgress color="info" size={30} />
                        <MDTypography variant="body2" ml={2}>
                          프로젝트 수정중...
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
                      수정
                    </MDButton>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium">
          Members
        </MDTypography>
        <MDBox mb={1}>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          {projectInfo.memberInfoDTOList && projectInfo.memberInfoDTOList.map(member => (
            <Grid item xs={12} md={6} xl={3} key={member.id}>
              <DefaultProjectCard
                image={homeDecor2}
                id={member.id}
                projectId={projectInfo.id}
                name={member.name}
                nickname={member.nickname}
                email={member.email}
                position={member.position}
                role={member.role}
              />
            </Grid>
            
          ))}


            <IconButton onClick={openAddMemberModal}>
              <AddCircleOutlineIcon color="info" />
            </IconButton>

          <Modal
            isOpen={activeModal}
            onRequestClose={closeAddMemberModal}
            style={customModalStyles}
          >
                          <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>

          </Modal>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
function Overview() {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  console.log("projectId in PM", projectId);
  const [projectInfo, setProjectInfo] = useState(null);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const location = useLocation();

  useEffect(() => {
    async function fetchProjectInfo() {
      try {
        const response = await axios.get(`/api/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProjectInfo(response.data.data);
      } catch (error) {
        window.alert(error.response.data.message);
        window.history.back();
      }
    }

    fetchProjectInfo();
  }, [projectId, token]);
  // projectInfo가 null일 때 null 반환

  if (!projectInfo) {
    return null;
  }

  return (
    <PM projectInfo={projectInfo} />
  );
}

export default Overview;
