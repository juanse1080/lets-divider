import { Alert, Grid, Skeleton } from "components/atoms";
import { useSplitContext } from "context";

import { ListContainer, ListItem } from "./RenderList.styles";

export type RenderListProps = {};

const RenderList = (props: RenderListProps) => {
  const { loading, items = [] } = useSplitContext();

  return (
    <>
      <Grid
        container
        alignItems="flex-end"
        justify="flex-end"
        spacing={3}
        {...props}
      >
        {loading ? (
          Array(5)
            .fill("")
            .map((_, key) => (
              <Grid item xs={12} key={`skeleton-${key}`}>
                <Skeleton />
              </Grid>
            ))
        ) : (
          <Grid item xs={12}>
            {items.length ? (
              <>
                <ListContainer>
                  {items.map((item) => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ListContainer>
              </>
            ) : (
              <Alert>
                Enter the phrase and the division length the phrase and the
                division length
              </Alert>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default RenderList;
