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

const PAGE_SIZE = 1; // You can adjust this to change how many projects are shown per page


const ManagementPage = () => {


    const [projectData, setProjectData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [groupProjectData, setGroupProjectData] = useState([]);
    const token = localStorage.getItem('ACCESS_TOKEN');


    useEffect(() => {
        async function fetchData() {
            try {
                console.log("ACCESS-Token: ", token);
                // 페이지가 마운트된 후에 서버로 GET 요청 보내기
                const response = await axios.get('/api/myProject', { //   생성한 설문 가져오는 요청
                    headers: {
                        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
                    }
                });
                console.log("response.data", response.data.data);
                if (response.data.data.length === 0) {
                    setProjectData([]);
                } else {
                    setProjectData(response.data.data); // 데이터를 상태로 설정합니다.
                    console.log("response.data: ", response.data.data);
                }

            } catch (error) {
                console.error(error);
            }

            //   응답한 설문 가져오는 요청
            try {
                // 페이지가 마운트된 후에 서버로 GET 요청 보내기
                const response2 = await axios.get('/api/otherProject', { //   생성한 설문 가져오는 요청
                    headers: {
                        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
                    }
                });
                console.log("response2.data", response2.data.data);
                if (response2.data.data.length === 0) {
                    setGroupProjectData([]);
                } else {
                    setGroupProjectData(response2.data.data); // 데이터를 상태로 설정합니다.
                    console.log("응답한 설문 response.data: ", response2.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);


    return (
        <ManageProject projectData={projectData} groupProjectData={groupProjectData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    )
};



const ManageProject = ({ projectData, groupProjectData, currentPage, setCurrentPage }) => {
    const [selectedProject, setSelectedProject] = useState('');

    const currentdate = new Date();
    console.log("현재시간", currentdate);
    if (!projectData) {
        return <div>Loading...</div>;
    }

    const handleStatisticsClick = (projectData) => {
        setSelectedProject(projectData);
    };

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
                        {projectData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project) => (
                            <div className="col-lg-3" key={project.id}>
                                <Card id={project.id} title={project.name} pmname = {project.pmname} status = {project.status} date={project.updatedAt.slice(0, 10)} startdate={project.createdAt.slice(0, 10)}/>
                            </div>
                        ))}
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="row g-3">
                        {groupProjectData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project) => (
                            <div className="col-lg-3" key={project.id}>
                                <CardResponse id={project.id} title={project.name} pmname = {project.pmname} status = {project.status} date={project.updatedAt.slice(0, 10)}/>
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
