import React from 'react';
import { useState, useEffect } from 'react';
import MDTypography from 'components/MDTypography';
import { Grid } from '@mui/material';
import axios from 'axios';
import Level1 from 'assets/images/levels/level1.png'
import Level2 from 'assets/images/levels/level2.png'
import Level3 from 'assets/images/levels/level3.png'
import Level4 from 'assets/images/levels/level4.png'
import BadgeCollection from './Badge';


const CalendarHeatmap = (issuescore) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const [userActivityData, setUserActivityData] = useState([]);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [hoveredCount, setHoveredCount] = useState(0);
    const [hoveredCellTop, setHoveredCellTop] = useState(0);
    const [hoveredCellLeft, setHoveredCellLeft] = useState(0);
    const [hoveredCellWidth, setHoveredCellWidth] = useState(0);
    const [level, setLevel] = useState("Level 1")

    console.log("issuescore", issuescore);

    const calculateLevel = (score) => {
        if (score >= 0 && score <= 100) {
            return 'Level 1';
        } else if (score <= 200) {
            return 'Level 2';
        } else if (score <= 500) {
            return 'Level 3';
        } else if (score <= 1000) {
            return 'Level 4';
        } else {
            return 'Unknown';
        }
    };


    let levelImageSrc;
    switch (level) {
        case 'Level 1':
            levelImageSrc = Level1;
            break;
        case 'Level 2':
            levelImageSrc = Level2;
            break;
        case 'Level 3':
            levelImageSrc = Level3;
            break;
        case 'Level 4':
            levelImageSrc = Level4;
            break;
        default:
            levelImageSrc = Level1;
    }


    // Update the level state based on the issuescore
    useEffect(() => {
        const level = calculateLevel(issuescore.issueScore);
        setLevel(level);
    }, [issuescore]);

    // 셀에 마우스 진입 이벤트를 처리하는 함수
    const handleCellMouseEnter = (date) => {
        const count = getActivityCount(date);
        setHoveredDate(date.toISOString().slice(0, 10));
        setHoveredCount(count);
    };

    // 셀에서 마우스 떠남 이벤트를 처리하는 함수
    const handleCellMouseLeave = () => {
        setHoveredDate(null);
        setHoveredCount(0);
    };

    useEffect(() => {


        //
        const getIssueData = async (token) => {
            try {
                const response = await axios.get(`/api/mypage/issue`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length === 0) {
                    setUserActivityData([{ date: "2023-01-01", count: 1 }]);
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
        console.log("userActivityData", userActivityData);
    }, []);

    // userActivityData가 준비되지 않은 경우, 0인 값 하나 넣어서 표가 표시되도록 만들기
    if (!userActivityData || userActivityData.length === 0) {
        setUserActivityData([{ date: "2023-01-01", count: 0 }]);
    }

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
        gap: '4px',
        gridRowGap: '2px', // 추가된 부분
        overflow: 'hidden', // 추가된 부분
        height: '120px', // 12px * 7 = 84px, 사용자가 보이는 영역만 남기도록 설정
        width: '100%',
        marginLeft: '9%'
    };


    const tooltipStyle = {
        position: 'absolute',
        top: hoveredDate ? `${hoveredCellTop - 490}px` : '-9999px', // hide tooltip if not hovered
        left: hoveredDate ? `${hoveredCellLeft - (655 + hoveredCellWidth)}px` : '0',
        transform: 'translate(-50%, -100%)',
        backgroundColor: 'black',
        color: 'white',
        paddingTop: '1px',
        paddingBottom: '1px',
        paddingLeft: '5px',
        paddingRight: '5px',
        borderRadius: '3px',
        zIndex: 1,
    };

    const levelImageStyle = {

        position: 'absolute',
        left: '0', // 왼쪽에 배치
        top: '58%', // 세로 중앙 정렬
        transform: 'translateY(-50%)', // 세로 중앙 정렬을 위해 translateY 사용
        marginLeft: '3%',

    };


    const getHoveredCellPosition = (event) => {
        const hoveredCell = event.target.getBoundingClientRect();
        const hoveredCellTop = hoveredCell.top + window.scrollY; // Add scroll offset
        const hoveredCellLeft = hoveredCell.left;
        const hoveredCellWidth = hoveredCell.width;
        setHoveredCellTop(hoveredCellTop);
        setHoveredCellLeft(hoveredCellLeft);
        setHoveredCellWidth(hoveredCellWidth);
    };

    return (
        <>

            <div style={{ flexDirection: 'column', marginLeft: "9%" }}>
                <img id='batch' src={levelImageSrc} alt="Level" style={levelImageStyle} />
                <MDTypography variant="caption" color="black" style={{ textAlign: 'center' }}>{level}</MDTypography>
                <BadgeCollection badgeCount={4} level={level} />
            </div>


            <Grid container justifyContent="center" sx={{ marginLeft: "10%" }} >


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

            <div id="jandi" style={containerStyle} >

                {dates.map((week, weekIndex) => (
                    <React.Fragment key={weekIndex}>
                        {week.map((date, dayIndex) => (
                            
                                <div 
                                    key={date.toISOString().slice(0, 10)}
                                    style={{
                                        overflowX: 'auto',
                                        gridRow: dayIndex + 1,
                                        gridColumn: weekIndex + 1,
                                        width: '10px',
                                        height: '10px',
                                        background: `rgba(0, 128, 0, ${getActivityCount(date) / 10})`,
                                        border: '1.5px solid #ddd',
                                        position: 'relative', // 부모에 position 속성 추가
                                    }}
                                    // onMouseEnter와 onMouseLeave 이벤트 핸들러 추가
                                    onMouseEnter={(event) => {
                                        handleCellMouseEnter(date, event);
                                        getHoveredCellPosition(event);
                                    }}
                                    onMouseLeave={handleCellMouseLeave}
                                />
                        
                        ))}
                    </React.Fragment>
                ))}

            </div>
            {/* 호버된 날짜와 활동량을 검정 배경 말풍선으로 표시 */}
            <div style={tooltipStyle}>
                <MDTypography variant="caption" color="white">{hoveredDate}</MDTypography><br />
                <MDTypography variant="caption" color="white">{hoveredCount}개 이슈 해결</MDTypography>
            </div>


        </>
    );
};

export default CalendarHeatmap;
