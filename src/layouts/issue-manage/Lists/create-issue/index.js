import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { Icon, IconButton, Menu, MenuItem, Input, Snackbar } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import { useRecoilState } from 'recoil';
import { projectIdState } from '../../../../examples/Sidenav/ProjectIdAtom';
import { DropzoneDialog } from 'material-ui-dropzone'


let memberInChargeId = null;

function MDDatePicker({ label, defaultValue, onChange }) {
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  const handleDateChange = (date) => {
  };

  return (
    <MDBox mb={2}>
      <MDInput
        type="text"
        label={label}
        value={getToday(selectedDate)} 
        fullWidth
        InputProps={{
          startAdornment: (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy.MM.dd"
              showYearDropdown
              showMonthDropdown
              customInput={<CalendarTodayIcon />}
              locale="ko"
            />
          ),
        }}
      />
    </MDBox>
  );
}

function getToday(date){
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

function MDIssueType({ label, value, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [selecteType, setSelecteType] = useState(value);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBug = () => {
    setSelecteType("bug");
    handleClose();
  };

  const handleFeat = () => {
    setSelecteType("task");
    handleClose();
  };

  const handleImprove = () => {
    setSelecteType("story");
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
                <ArrowCircleDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleBug}>Bug</MenuItem>
                <MenuItem onClick={handleFeat}>Test</MenuItem>
                <MenuItem onClick={handleImprove}>Story</MenuItem>
              </Menu>
            </div>
          ),
        }}
      />
    </MDBox>
  );
}

function MDMemberInCharge({ label, value, onChange, damdangjaId }) {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const [selectMember, setSelectMember] = useState(value);
  const [membersData, setMembersData] = useState([]);
  const [memberList, setMemberList] = useState();
  const [memberId, setMemberId] = useState();
  const token = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await axios.get(`/api/project/${encodeURIComponent(projectId)}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchedMembersData = membersResponse.data.data;
        console.log("fetchedMembersData: ", fetchedMembersData);

        setMembersData(fetchedMembersData);

        const memberItems = fetchedMembersData.map((member) => (
          <MenuItem key={member.id} onClick={() => handleName(member)}>
            {member.name}
          </MenuItem>
        ));

        console.log("memberItems", memberItems);

        setMemberList(memberItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId, token]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleName = (value) => {
    console.log("handleName: ", value);
      setSelectMember(value.name);
    
    damdangjaId(value.memberId);

    handleClose();
  };

  onChange(selectMember, memberId);  // ***

  return (
    <MDBox mb={2}>
      <MDInput
        label={label}
        value={selectMember}
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
                <div style={{ maxHeight: 150, overflowY: 'auto' }}>
                  {memberList}
                </div>
              </Menu>
            </div>
          ),
        }}
      />
    </MDBox>
  );
}


function Overview() {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const [valueFromChild, setValueFromChild] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [issueType, setIssueType] = useState("타입을 선택해주세요(필수)"); // 선택된 이슈 타입을 저장하는 상태
  const [writerName, setWriterName] = useState("담당자를 지정해주세요(필수)");
  const [memberId, setMemberId] = useState();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [showDropzone, setShowDropzone] = useState(false); // DropzoneArea의 표시 여부 상태

  const [memberChargedId, setMemberChargedId] = useState();
  const [files, setFiles] = useState();

  const [importance, setImportance] = useState(null); // 중요도를 저장하는 상태
  
  const handleImportanceChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = Number(inputValue);
    if (numericValue >= 0 && numericValue <= 100) {
      setImportance(numericValue);
    } else {
      setImportance(null);
    }
  };

  const onClickSubmitButton = (files) => {
    setFiles(files);
    setOpen(false);
  }

  const handleInputChange = (event) => {
    setInputWidth(event.target.value.length * 8);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.target.value);
  };

  const handleIssueTypeChange = (type) => {
    setIssueType(type);
  };

  console.log("handleWriterChange", writerName);
  const handleWriterChange = (name, id) => {
    setWriterName(name);
    setMemberId(id);
  }
  const handleChangeTitle = (title) => {
    setTitle(title.target.value);
  }
  const handleDescription = (description) => {
    setDescription(description.target.value);
  }
  const handleOnClickAttachFile = () => {
    setShowDropzone(true); // 파일 첨부 버튼 클릭 시 DropzoneArea 표시
  };
  const isAddButtonDisabled = !title || (issueType==="타입을 선택해주세요(필수)") || (writerName==="담당자를 지정해주세요(필수)");
  const getDamdangjaId = (damdangjaId) => {
    console.log('담당자 id:', damdangjaId);
    setMemberChargedId(damdangjaId);
    // 여기에서 자식 컴포넌트에서 가져온 값을 사용할 수 있습니다.
  };
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
  const handleOnClickCreateIssue = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const formData = new FormData();
      if (files != null) {
        files.map(file => formData.append('image', file));
      } else {
        formData.append('image', null)
      }

      const jsonData = {
        title: title,
        memberInCharge: writerName === "담당자를 지정해주세요(필수)" ? null : writerName,
        memberInChargeId : Number(memberChargedId),
        importance: importance,
        type: issueType,
        description: description,
        // date: String(selectedDate),
      };

      formData.append('jsonData', new Blob([JSON.stringify(jsonData)], {
        type: "application/json"
      }));

      const response = axios.post(`api/project/${projectId}/issue`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        })
        .then(response => {
          console.log('Upload successful!', response.data);
          setIsSnackbarOpen(true); // 스낵바 열기
          setSnackbarMessage('이슈가 성공적으로 생성되었습니다.'); 
          window.location.reload();
        })
        .catch(error => {
          console.error('Error uploading the image:', error);
        });

      // if (response.data.statusCode === 200) {
      //   window.location.reload();
      // }
    } catch (error) {
      // 오류 처리
      console.error("API 요청 중 오류 발생:", error.message);
    }

  }

  const handleChildValueChange = (value) => {
    setValueFromChild(value);
  }
  const maxSizeInBytes = 5 * 1024 * 1024;
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
              <MDInput type="text" label="이슈 제목(필수)" onChange={handleChangeTitle} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDMemberInCharge
                label="담당자"
                value={writerName}
                onChange={handleWriterChange}
                damdangjaId={getDamdangjaId} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDIssueType
                label="타입"
                value={issueType} // 선택된 이슈 타입을 전달
                onChange={handleIssueTypeChange} // 선택된 이슈 타입 변경 시 호출되는 핸들러 함수
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                value={importance !== null ? importance : ""}
                label="중요도(선택)"
                placeholder="[0-100]"
                onChange={handleImportanceChange}
                fullWidth
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
              <MDButton variant="contained" color="info" onClick={() => setOpen(true)}>
                Add Image
              </MDButton>
              <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                maxFileSize={5000000}
                open={open}
                onClose={() => setOpen(false)}
                onSave={onClickSubmitButton}
                showPreviews={true}
                showFileNamesInPreview={true}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="textarea" label="설명" onChange={handleDescription} rows={4} multiline fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1} display="flex" justifyContent="center">
              <MDButton variant="gradient" color="info" onClick={handleOnClickCreateIssue} onClose={handleClose} disabled={isAddButtonDisabled}>
                추가
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
      <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
    />
    </MDBox>
  );
}

export default Overview;