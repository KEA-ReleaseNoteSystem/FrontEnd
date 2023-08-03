// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "../components/MKBox";

// Material Kit 2 React examples
import DefaultCounterCard from "../../../examples/Cards/CounterCards/DefaultCounterCard";
// import DefaultCounterCard from "../../../examplesDefaultCounterCard";

function Counters() {
  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={70}
              suffix="K"
              title="프로젝트 수"
              description="Releasy를 통해 프로젝트가 활발히 진행되고 있습니다."
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 0 }} />
            <DefaultCounterCard
              count={15}
              suffix="+"
              title="국가 수"
              description="Releasy는 글로벌에서 사용되고 있습니다."
            />
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 0 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={5}
              suffix="/5"
              title="만족도"
              description="Releasy는 높은 만족도를 제공하고 있습니다"
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Counters;
