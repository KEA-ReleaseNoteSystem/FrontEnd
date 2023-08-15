// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "../../../examples/Cards/RotatingCard";
import RotatingCardFront from "../../../examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "../../../examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "../../../examples/Cards/InfoCards/DefaultInfoCard";

// Images
// import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/logos/front-logo3.png";
import bgFront from "assets/images/logos/back-logo3.png";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    현존하는 최고의
                    <br />
                    릴리즈노트 플랫폼
                  </>
                }
                // description="All the MUI components that you need in a development have been re-design with the new look."
              />
              <RotatingCardBack
                image={bgBack}
                title="그것이 바로 Releasy"
                description="with KEA"
                action={{
                  type: "internal",
                  route: "/authentication/sign-in",
                  label: "바로 시작하기",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="성취도의 시각화"
                  description="자신의 업무 수행량을 시각적으로 확인할 수 있어서 끊임없이 동기부여 받을 수 있습니다."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="Chat GPT 추천"
                  description="업무의 중요도를 Chat GPT로부터 추천받아 자동 설정할 수 있습니다."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="실시간 동시 작업"
                  description="업무 진행 및 변동 사항을 실시간으로 확인할 수 있습니다."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="체계적인 이슈 관리"
                  description="수많은 이슈를 체계적으로 할당하고 관리할 수 있습니다."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
