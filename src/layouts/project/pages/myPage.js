
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "../../../examples/Tables/DataTable";
import Pagination from 'react-bootstrap/Pagination';
// import Divider from "assets/theme/components/divider";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import React from 'react';
import PageLayout from "../../../examples/LayoutContainers/PageLayout";
import NavigationBar from "../components/NavigationBar";
// Data
import Header from "layouts/profile/components/Header";
import teamTable from "../data/teamTable";
const { columns, rows } = teamTable();

function MyPage() {

    return (
        <div>
            <PageLayout>
                <NavigationBar />
                {/* <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s"> */}
                <div className="container py-5 grid-margin wow fadeInUp">
                    <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: 5000 }}>
                        <Pagination className='pagination'>
                            <Header>
                                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                                <ProfileInfoCard
                                    title="profile information"
                                    description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                                    info={{
                                        fullName: "서강덕",
                                        team: "kakao99%",
                                        mobile: "010-8731-2312",
                                        email: "rkdejr2321naver.com",
                                        position: "Backend-Developer",
                                    }}
                                    action={{ route: "", tooltip: "Edit Profile" }}
                                    shadow={false}
                                />
                            </Header>
                        </Pagination>

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
                                    그룹 멤버
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
}

export default MyPage;
