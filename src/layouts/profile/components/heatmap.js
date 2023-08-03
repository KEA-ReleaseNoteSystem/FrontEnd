import React from 'react';
import { useState, useEffect } from 'react';
import MDTypography from 'components/MDTypography';
import { Grid } from '@mui/material';
import axios from 'axios';

// // const getIssueData = async (token) => {
// //     try {
// //       const response = await axios.get(`/api/mypage/issue`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       });
      
// //       if (response.data.length === 0) {
// //         return [];
// //       } else {
// //         console.log(response.data.data);
// //         return response.data.data;
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       return [];
// //     }
// //   };

//   
//   const userActivityData = getIssueData(token)

const CalendarHeatmap = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const [userActivityData, setUserActivityData] = useState([]);

    useEffect(() => {
        const getIssueData = async (token) => {
            try {
                const response = await axios.get(`/api/mypage/issue`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length === 0) {
                    setUserActivityData([]);
                } else {
                    setUserActivityData(response.data.data);
                }
            } catch (error) {
                console.error(error);
                setUserActivityData([]);
            }
        };

        const token = localStorage.getItem('ACCESS_TOKEN');
        getIssueData(token);
    }, []);

     // userActivityData가 준비되지 않은 경우, 렌더링하지 않고 null을 반환
     if (!userActivityData || userActivityData.length === 0) {
        return null;
    }

    // 사용자의 가장 최근 커밋 날짜를 가져옵니다.
    const latestDate = userActivityData.reduce((maxDate, activity) => {
        return activity.date > maxDate ? activity.date : maxDate;
    }, userActivityData[0].date);

    // 달력 날짜의 시작과 끝을 계산합니다.
    const startYear = new Date().getFullYear();
    const startDate = new Date(startYear, 0, 2); // 1월 1일
    const endDate = new Date(startYear, 11, 32); // 12월 31일

    // 달력 날짜를 배열로 생성합니다.
    const dates = [];
    let currentDate = new Date(startDate);
    let week = [];

    while (currentDate <= endDate) {
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);

        // 7일이 되면 새로운 주(행)을 추가합니다.
        if (week.length === 7 || currentDate > endDate) {
            dates.push(week);
            week = [];
        }
    }

    // 날짜에 해당하는 활동량을 가져옵니다.
    const getActivityCount = (date) => {
        const activity = userActivityData.find((activity) => activity.date === date.toISOString().slice(0, 10));
        return activity ? activity.count : 0;
    };

    // 사용자가 보는 영역만 남기도록 스타일을 설정합니다.
    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 12px)',
        gap: '1px',
        gridRowGap: '1px', // 추가된 부분
        overflow: 'hidden', // 추가된 부분
        height: '90px', // 12px * 7 = 84px, 사용자가 보이는 영역만 남기도록 설정
    };

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={1}><MDTypography variant="body2">Jan</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Feb</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Mar</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Apr</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">May</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Jun</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Jul</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Aug</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Sep</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Oct</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Nov</MDTypography></Grid>
                <Grid item xs={1}><MDTypography variant="body2">Dec</MDTypography></Grid>
            </Grid>
            <div style={containerStyle}>
                {dates.map((week, weekIndex) => (
                    <React.Fragment key={weekIndex}>
                        {week.map((date, dayIndex) => (
                            <div
                                key={date.toISOString().slice(0, 10)}
                                style={{
                                    gridRow: dayIndex + 1,
                                    gridColumn: weekIndex + 1,
                                    width: '12px',
                                    height: '12px',
                                    background: `rgba(0, 128, 0, ${getActivityCount(date) / 10})`,
                                    border: '1px solid #ddd', // 테두리 스타일
                                }}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default CalendarHeatmap;
