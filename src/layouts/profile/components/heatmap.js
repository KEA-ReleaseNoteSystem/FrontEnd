import React from 'react';
import MDTypography from 'components/MDTypography';
import { Grid } from '@mui/material';

// 사용자의 활동 데이터 (예시로 하드코딩한 데이터)
const userActivityData = [
    { date: '2023-01-01', count: 1 },
    { date: '2023-01-31', count: 3 },
    { date: '2023-02-01', count: 1 },
    { date: '2023-02-28', count: 3 },
    { date: '2023-03-01', count: 1 },
    { date: '2023-03-31', count: 3 },
    { date: '2023-04-01', count: 1 },
    { date: '2023-04-30', count: 3 },
    { date: '2023-05-01', count: 1 },
    { date: '2023-05-31', count: 3 },
    { date: '2023-06-01', count: 1 },
    { date: '2023-06-30', count: 3 },
    { date: '2023-07-01', count: 1 },
    { date: '2023-07-31', count: 3 },
    { date: '2023-08-01', count: 1 },
    { date: '2023-08-31', count: 3 },
    { date: '2023-09-01', count: 1 },
    { date: '2023-09-30', count: 3 },
    { date: '2023-10-01', count: 1 },
    { date: '2023-10-31', count: 3 },
    { date: '2023-11-01', count: 1 },
    { date: '2023-11-30', count: 3 },
    { date: '2023-12-01', count: 1 },
    { date: '2023-12-31', count: 3 }
    // ... 나머지 데이터는 여기에 추가하면 됩니다.
];

const CalendarHeatmap = () => {
    // 사용자의 가장 최근 커밋 날짜를 가져옵니다.
    const latestDate = userActivityData.reduce((maxDate, activity) => {
        return activity.date > maxDate ? activity.date : maxDate;
    }, userActivityData[0].date);

    // 달력 날짜의 시작과 끝을 계산합니다.
    const startDate = new Date(latestDate);
    startDate.setFullYear(startDate.getFullYear() - 1); // 최근 1년 간의 데이터만 보여줄 것이라고 가정합니다.
    const endDate = new Date(latestDate);

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
