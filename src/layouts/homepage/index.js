import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MKBox from "./components/MKBox";
import MKTypography from "./components/MKTypography";
import MKSocialButton from "./components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "./examples/Navbars/DefaultNavbar";
import DefaultFooter from "./examples/Footers/DefaultFooter";
import FilledInfoCard from "./examples/Cards/InfoCards/FilledInfoCard";
import PageLayout from '../../examples/LayoutContainers/PageLayout';

// Presentation page sections
import Counters from "./pages/Presentation/sections/Counters";
import Information from "./pages/Presentation/sections/Information";
import DesignBlocks from "./pages/Presentation/sections/DesignBlocks";
import Pages from "./pages/Presentation/sections/Pages";
import Testimonials from "./pages/Presentation/sections/Testimonials";
import Download from "./pages/Presentation/sections/Download";

// Presentation page components
import BuiltByDevelopers from "./pages/Presentation/components/BuiltByDevelopers";

// Routes
import routes from "./home.routes";
import footerRoutes from "./footer.routes";

import bgImage from "assets/images/home-bg.png";


function Home() {
    return (
        <PageLayout>
            <DefaultNavbar
                routes={routes}
                // action={{
                //     type: "external",
                //     route: "https://www.creative-tim.com/product/material-kit-react",
                //     label: "free download",
                //     color: "info",
                // }}
                sticky
            />
            <MKBox
                minHeight="75vh"
                width="100%"
                sx={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Container>
                    <Grid container item xs={12} lg={7} justifyContent="center" mx="auto" >
                        <MKTypography
                            variant="h1"
                            color="ora"
                            mt={-6}
                            mb={2}
                            sx={({ breakpoints, typography: { size } }) => ({
                                [breakpoints.down("md")]: {
                                    fontSize: size["3xl"],
                                },
                            })}
                        >
                            Releasy
                        </MKTypography>
                        <MKTypography
                            variant="body1"
                            color="ora"
                            textAlign="center"
                            px={{ xs: 6, lg: 12 }}
                            mt={2}
                        >
                            전문가를 위한 쉽고 빠른 릴리즈 노트 제작 툴
                            <br/>
                            전 세계 160만 명의 전문가들과 함께 협업해 보세요
                        </MKTypography>
                    </Grid>
                </Container>
            </MKBox>
            <Card
                sx={{
                    p: 2,
                    mx: { xs: 2, lg: 3 },
                    mt: -8,
                    mb: 4,
                    backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
            >
                <Counters />
                <Information />
                <Pages />
      
                <MKBox pt={18} pb={6}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                                <MKTypography variant="h4" fontWeight="bold" mb={0.5}>
                                    최고의 가치를 전달하겠습니다.
                                </MKTypography>
                                <MKTypography variant="body1" color="text">
                                    지금 바로 경험해보세요.
                                </MKTypography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={5}
                                my={{ xs: 5, lg: "auto" }}
                                mr={{ xs: 0, lg: "auto" }}
                                sx={{ textAlign: { xs: "center", lg: "right" } }}
                            >
                                <MKSocialButton
                                    component="a"
                                    href="https://twitter.com/"
                                    target="_blank"
                                    color="twitter"
                                    sx={{ mr: 1 }}
                                >
                                    <i className="fab fa-twitter" />
                                    &nbsp;Tweet
                                </MKSocialButton>
                                <MKSocialButton
                                    component="a"
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    color="facebook"
                                    sx={{ mr: 1 }}
                                >
                                    <i className="fab fa-facebook" />
                                    &nbsp;Facebook
                                </MKSocialButton>
                                <MKSocialButton
                                    component="a"
                                    href="https://github.com/KEA-ReleaseNoteSystem"
                                    target="_blank"
                                    color="github"
                                >
                                    <i className="fab fa-github" />
                                    &nbsp;Github
                                </MKSocialButton>
                            </Grid>
                        </Grid>
                    </Container>
                </MKBox>
            </Card>
            {/* <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox> */}
        </PageLayout>
    );
}

export default Home;
