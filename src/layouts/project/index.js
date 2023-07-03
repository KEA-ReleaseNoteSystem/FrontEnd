import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './index.css';
import Card from './components/Card';
import CardResponse from './components/CardResponse';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.css';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import PageLayout from "examples/LayoutContainers/PageLayout";
import NavigationBar from './components/NavigationBar';

const PAGE_SIZE = 1; // You can adjust this to change how many surveys are shown per page


const ManagementPage = () => {




    const [projectData, setProjectData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectDataAnswered, setProjectDataAnswered] = useState([]);
    const token = localStorage.getItem('ACCESS_TOKEN');



    useEffect(() => {

        async function fetchData() {
            const dummyData = [
                {
                    id: 1,
                    title: "Project 1",
                    updatedAt: "2023-07-01",
                    startDate: "2023-06-01",
                    endDate: "2023-06-30",
                    member: {
                        nickname: "John"
                    }
                },
                {
                    id: 2,
                    title: "Project 2",
                    updatedAt: "2023-07-02",
                    startDate: "2023-07-01",
                    endDate: "2023-07-31",
                    member: {
                        nickname: "Jane"
                    }
                }
            ];

            /*
          //   생성한 설문 가져오는 요청
            try {
                console.log("ACCESS-Token: ", token);
                // 페이지가 마운트된 후에 서버로 GET 요청 보내기
                const response = await axios.get('/api/data', { //   생성한 설문 가져오는 요청
                    headers: {
                        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
                    }
                });
                console.log("response.data", response.data);
                if (response.data.length === 0) {
                    setProjectData([]);
                } else {
                    setProjectData(response.data); // 데이터를 상태로 설정합니다.
                    console.log("response.data: ", response.data);
                }

            } catch (error) {
                console.error(error);
            }

            //   응답한 설문 가져오는 요청
            try {
                // 페이지가 마운트된 후에 서버로 GET 요청 보내기
                const response2 = await axios.get('/api/data/answered', { //   생성한 설문 가져오는 요청
                    headers: {
                        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
                    }
                });
                console.log("response2.data", response2.data);
                if (response2.data.length === 0) {
                    setProjectDataAnswered([]);
                } else {
                    setProjectDataAnswered(response2.data); // 데이터를 상태로 설정합니다.
                    console.log("응답한 설문 response.data: ", response2.data);
                }
            } catch (error) {
                console.error(error);
            }
*/
            setProjectData(dummyData);
            setProjectDataAnswered([]);
        }

        fetchData();
    }, []);


    return (
        <Managesurvey projectData={projectData} projectDataAnswered={projectDataAnswered} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    )
};



const Managesurvey = ({ projectData, projectDataAnswered, currentPage, setCurrentPage }) => {
    const [selectedSurvey, setSelectedSurvey] = useState('');

    const currentdate = new Date();
    console.log("현재시간", currentdate);
    if (!projectData) {
        return <div>Loading...</div>;
    }

    const handleStatisticsClick = (projectData) => {
        setSelectedSurvey(projectData);
    };

    console.log(projectData);
    return (
        <PageLayout>
            <NavigationBar />
        <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container py-5 grid-margin wow fadeInUp">
                <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: 5000 }}>
                    <Pagination className='pagination'>
                        <Pagination.Item active={currentPage === 1} onClick={() => setCurrentPage(1)}>
                            내가 참여 중인 프로젝트
                        </Pagination.Item>
                        <Pagination.Item active={currentPage === 2} onClick={() => setCurrentPage(2)}>
                            내 그룹의 프로젝트
                        </Pagination.Item>
                    </Pagination>

                    {currentPage === 1 && (
                        <>
                            <h5 className="fw-bold text-primary  text-uppercase wow">Manage Project</h5>
                            <h1 className="mb-0">Participating Projects</h1>
                        </>
                    )}

                    {currentPage === 2 && (
                        <>
                            <h5 className="fw-bold text-primary text-uppercase">Manage Project</h5>
                            <h1 className="mb-0">Your Groups Projects</h1>
                        </>
                    )}
                </div>

                {currentPage === 1 && (
                    <div className="row g-3">
                        {projectData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((survey) => (
                            <div className="col-lg-3" key={survey.id}>
                                <Card itemId={survey.member.nickname} id={survey.id} title={survey.title} date={survey.updatedAt.slice(0, 10)} startdate={survey.startDate.slice(0, 10)} enddate={survey.endDate.slice(0, 10)} currentdate={currentdate} />
                            </div>
                        ))}
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="row g-3">
                        {projectDataAnswered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((survey) => (
                            <div className="col-lg-3" key={survey.id}>
                                <CardResponse itemId={survey.member.nickname} id={survey.id} title={survey.title} date={survey.updatedAt.slice(0, 10)} startdate={survey.startDate.slice(0, 10)} enddate={survey.endDate.slice(0, 10)} currentdate={currentdate} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </PageLayout>
    );
};

export default ManagementPage;
