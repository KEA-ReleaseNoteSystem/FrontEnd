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
                },{
                    id: 3,
                    title: "Project 3",
                    updatedAt: "2023-07-02",
                    startDate: "2023-07-01",
                    endDate: "2023-07-31",
                    member: {
                        nickname: "Jane"
                    }
                }
            ];

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
        </div>
        </PageLayout>
    );
};

export default ManagementPage;
