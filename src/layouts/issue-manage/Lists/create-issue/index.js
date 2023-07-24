import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LinearScaleIcon from '@mui/icons-material/LinearScale';

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
        value={selectedDate.toDateString()}
        fullWidth
        InputProps={{
          startAdornment: (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
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

function MDIssueType({ label, value, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [selecteType, setSelecteType] = useState(value);


  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBug = () => {
    setSelecteType("버그");
    handleClose();
  };

  const handleFeat = () => {
    setSelecteType("기능");
    handleClose();
  };

  const handleImprove = () => {
    setSelecteType("개선");
    handleClose();
  };

  onChange(selecteType);  // ***

  return (
    <MDBox mb={2}>
      <MDInput
        label={label}
        value={selecteType}
        fullWidth
        InputProps={{
          startAdornment: (
            <div>
            <IconButton onClick={handleClick}>
              <LinearScaleIcon />
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleBug}>버그</MenuItem>
            <MenuItem onClick={handleFeat}>기능</MenuItem>
            <MenuItem onClick={handleImprove}>개선</MenuItem>
          </Menu>
          </div>
          ),
        }}
      />
    </MDBox>
  );
}


function Overview() {
  const [valueFromChild, setValueFromChild] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [issueType, setIssueType] = useState(""); // 선택된 이슈 타입을 저장하는 상태
  const [writerName, setWriterName] = useState("");
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleInputChange = (event) => {
    setInputWidth(event.target.value.length * 8);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.target.value);
  };

  const handleIssueTypeChange = (type) => {
    setIssueType(type);
  };
  const handleWriterChange = (name) => {
    setWriterName(name.target.value);
  }
  const handleChangeTitle = (title) => {
    setTitle(title.target.value); 
  }
  const handleDescription = (description) =>{
    setDescription(description.target.value);
  }

  const handleOnClickCreateIssue = async () => {
    await axios.post(`api/project/1/issue`, {
      title: title,
      writerName : writerName,
      type: issueType,
      description: description,
      date: String(selectedDate),
      userId: Number(1)
    });

    handleClose();
  }

  const handleChildValueChange = (value) =>{
    setValueFromChild(value);
  }

  return (
      <MDBox pt={3} pb={3} anchorEl={anchorEl}>
        <Grid>
          <Grid item xs={12}>
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
                  ADD Issue
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" mt={6} ml={3} mr={10}>
                <MDBox mb={2}>
                  <MDInput type="text" label="이슈 제목" onChange = {handleChangeTitle} fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  {/* <MDInput type="text" label="작성자" defaultValue="서강덕" disabled fullWidth/> */}
                  <MDInput type="text" label="작성자" onChange={handleWriterChange} fullWidth/>
                </MDBox>
                <MDBox mb={2}>
                  <MDIssueType
                    label="타입"
                    value={issueType} // 선택된 이슈 타입을 전달
                    onChange={handleIssueTypeChange} // 선택된 이슈 타입 변경 시 호출되는 핸들러 함수
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDDatePicker
                    label="생성일"
                    disabled
                    defaultValue={new Date()}
                    onChange={handleDateChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="textarea" label="설명" onChange={handleDescription} rows={4} multiline fullWidth />  
                </MDBox>
                <MDBox mt={4} mb={1} display="flex" justifyContent="center">
                  <MDButton variant="gradient" color="info" onClick={handleOnClickCreateIssue} onClose={handleClose}>
                    추가
                  </MDButton>
                </MDBox>
              </MDBox>
          </Grid>
        </Grid>
      </MDBox>
  );
}

export default Overview;
