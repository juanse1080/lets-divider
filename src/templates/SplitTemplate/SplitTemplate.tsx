import PerfectScrollbar from "react-perfect-scrollbar";

import { Grid } from "components/atoms";
import { CatchPhrase, RenderList } from "components/organism";
import { Navbar } from "components/molecules";

import { Container, GridScroll } from "./SplitTemplate.styles";

export type SplitTemplateProps = {};

const SplitTemplate = (props: SplitTemplateProps) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" {...props}>
        <PerfectScrollbar>
          <Grid
            container
            alignItems="stretch"
            justify="space-between"
            spacing={5}
          >
            <Grid item md={6} xs={12}>
              <CatchPhrase />
            </Grid>

            <GridScroll item md={6} xs={12}>
              <RenderList />
            </GridScroll>
          </Grid>
        </PerfectScrollbar>
      </Container>
    </>
  );
};

export default SplitTemplate;
