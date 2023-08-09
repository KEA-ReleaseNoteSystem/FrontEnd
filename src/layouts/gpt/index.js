import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../examples/Sidenav/ProjectIdAtom';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PageLayout from "examples/LayoutContainers/PageLayout";
// Data
import issue from "layouts/gpt/data/issue";

const getIssueData = async (projectId, token) => {
  try {
    const response = await axios.get(`/api/${encodeURIComponent(projectId)}/issues`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.length === 0) {
      return [];
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getGPTRecommend = async (projectId, token) => {
  try {
    const response = await axios.get(`/api/project/${encodeURIComponent(projectId)}/importance`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response);
    if (response.data.length === 0) {
      return [];
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

function Tables() {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const token = localStorage.getItem("ACCESS_TOKEN");

  const [data, setData] = useState([]);
  const [issues, setIssues] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [newImportance, setNewImportance] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const issueData = await getIssueData(projectId, token);
      setData(issueData);

      console.log("issueData", data);

      const initialIssues = issueData.filter((item) => item.status !== "done").map((item) => ({
        id: item.id,
        name: `#${item.issueNum} ${item.title}`,
        description: item.description,
        member: item.memberIdInCharge.name,
        due: new Date(item.createdAt).toISOString().split("T")[0],
        importance: item.importance,
      }));

      setIssues(initialIssues);
      console.log("issues", issues);

    }
    fetchData();
  }, [projectId, token]);

  const { columns, rows } = issue({ issues });

  async function getRecommend() {
    try {
      const recommends = await getGPTRecommend(projectId, token);
      setRecommend(recommends);

      const newImportanceValues = recommends.map((recommend) => recommend.importance);
      setNewImportance(newImportanceValues);

      if (newImportanceValues.length == 0) {
        alert("일시적인 오류입니다. 다시 시도해주세요.");
      } else {
        // "newImportanceValues"를 사용하여 새로운 "issues" 배열을 생성합니다.
        const updatedIssues = data.filter((item) => item.status !== "done").map((item, index) => ({
          id: item.id,
          name: `#${item.issueNum} ${item.title}`,
          description: item.description,
          member: item.memberIdInCharge.name,
          due: new Date(item.createdAt).toISOString().split("T")[0],
          importance: newImportance[index],
        }));
        setIssues(updatedIssues);
        console.log("updatedIssues", updatedIssues);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // newImportance가 변경되었을 때 호출되는 함수
    // newImportance로 issues 상태를 업데이트
    const handleNewImportanceChange = () => {
      const updatedIssues = issues.map((item, index) => ({
          ...item,
          importance: newImportance[index],
        }));
      setIssues(updatedIssues);
      console.log("updatedIssues", updatedIssues);
    };

    // newImportance가 변경되면 호출되도록 등록
    handleNewImportanceChange();
  }, [newImportance]);

  const saveGPTRecommend = async (projectId, token) => {
    try {
      const requestData = issues.map((issue) => ({
        id: issue.id,
        importance: issue.importance,
      }));
      console.log("requestData", requestData);
      const response = await axios.post(
        `/api/project/${encodeURIComponent(projectId)}/importance`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleRecommendClick = async () => {
    await getRecommend(); // 추천 정보를 가져오기 위해 getRecomend 함수 호출
  };

  const handleSaveClick = async () => {
    await saveGPTRecommend(projectId, token);
    window.location.reload()
    alert("GPT가 추천한 이슈 별 중요도가 저장되었습니다!");
  }

  return (
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
                이슈 리스트
              </MDTypography>
            </MDBox>
            <MDTypography variant="body2" ml={3} mt={3}>
              완료되지 않은 이슈만 표시됩니다.
            </MDTypography>
            <MDBox pt={2}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <MDButton color="primary" onClick={handleRecommendClick}>Chat GPT 추천</MDButton>
          <MDButton color="info" sx={{ ml: 2 }} onClick={handleSaveClick}>저장하기</MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Tables;
