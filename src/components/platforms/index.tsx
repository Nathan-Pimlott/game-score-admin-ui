import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid2 as Grid, Typography } from "@mui/material";

import { getPlatforms } from "../../services/platform";
import { Loading } from "../core/loading";
import { Platform } from "./platform";

export default () => {
  const {
    isPending,
    error,
    data: platforms,
  } = useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      return await getPlatforms();
    },
  });

  if (error) return "An error has occurred: " + error?.message;

  return (
    <Container style={{ padding: "20px" }}>
      <Typography variant="h2">Platforms</Typography>
      <Typography variant="h6">
        Select a platform below to view our top picks.
      </Typography>
      {isPending ? (
        <Loading />
      ) : (
        <div style={{ marginTop: 10 }}>
          <Grid container spacing={2}>
            {platforms.map((platform, idx) => {
              return <Platform platform={platform} key={idx} />;
            })}
          </Grid>
        </div>
      )}
    </Container>
  );
};
