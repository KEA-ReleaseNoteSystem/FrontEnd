import  react,{ useState, useEffect } from 'react';

import { FilterSelectComponent } from './FilterSelectComponent';
import axios from "axios";



export const FilterComponent = ({
  firstfilter,
  handleFilterstatus,
  issueStatus,
  secfilter,
  handleFiltertype,
  issueType,
  thirdfilter,
  handleFiltermember,
  memberList2,
  handleRefresh,
}) => {

  const [filter,setFilter] = useState("");

  const filterIssue = async (url) => {
    try {
      // URL에서 마지막 '&' 문자 제거
      url = url.slice(0, -1);

      console.log("url", url);

      // API 호출하여 이슈 업데이트
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("updatedFields", response.data.data);

      // 필터링된 이슈 목록 설정
      setFetchedIssues(response.data.data);
      setInit(true);
      setSelectedIssueIndex(0);
      console.log("response.data.data.issue[0]", response.data.data[0]);
      setIssueDetail(response.data.data[0]);
      console.log("loggg", response.data.data[0]);
      console.log("response.data.data == [] ", response.data.data == []);
      response.data.data[0] === undefined
        ? setIsLoading(true)
        : setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = (event) => {
    const selectedValue = event.target.value;
    const newFilter = [...filter, selectedValue];
    setFilter((prevFilters) => [...prevFilters, selectedValue]);
    console.log("Filter", filter);

    console.log("membersData", membersData);
    console.log("newFilter", newFilter);

    var filters = {
      status: null,
      type: null,
      username: null,
    };

    for (let i = 0; i < newFilter.length; i++) {
      if (newFilter[i].toUpperCase() in IssueStatus) {
        filters.status = newFilter[i];
      } else if (newFilter[i].toUpperCase() in IssueType) {
        filters.type = newFilter[i];
      } else if (
        membersData.some((member) => member.name === newFilter[i])
      ) {
        filters.username = newFilter[i];
      }
    }

    let url = "/api/1/issues?";

    for (const [key, value] of Object.entries(filters)) {
      console.log("key, value", key, value);
      if (value == null) {
        continue;
      }
      url += `${key}=${value}&`;
    }
    console.log("add url", url);

    filterIssue(url);
  };

  return (
    <div>
      <FilterSelectComponent
        label="상태"
        value={firstfilter}
        handleFilter={handleFilter}
        filterList={issueStatus}
        renderValue={(value) =>
          value === "" ? "상태" : `상태 : ${value}`
        }
        sx={{ minHeight: 40 }}
      />
      &nbsp; &nbsp;
      <FilterSelectComponent
        label="타입"
        value={secfilter}
        handleFilter={handleFilter}
        filterList={issueType}
        renderValue={(value) =>
          value === "" ? "타입" : `타입 : ${value}`
        }
        sx={{ minHeight: 40 }}
      />
      &nbsp; &nbsp;
      <FilterSelectComponent
        label="담당자"
        value={thirdfilter}
        handleFilter={handleFilter}
        filterList={memberList2}
        renderValue={(value) =>
          value === "" ? "담당자" : `담당자 : ${value}`
        }
        sx={{ minHeight: 40 }}
      />
      &nbsp; &nbsp;
      <Button onClick={handleRefresh}>새로고침</Button>
    </div>
  );
};
