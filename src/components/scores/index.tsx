import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid2, Typography } from "@mui/material";

import { getFeaturedScores } from "../../services/score";
import { FeaturedScore } from "../core/featuredScore";
import { FeaturedScoreSkeleton } from "../core/featuredScoreSkeleton";

export default () => {
  const {
    isPending,
    error,
    data: featuredScores,
  } = useQuery({
    queryKey: ["featuredScores"],
    queryFn: async () => {
      return await getFeaturedScores();
    },
  });

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Container style={{ padding: "20px" }}>
      <Typography variant="h2">Featured Scores</Typography>
      <Typography variant="h6">
        Check out some of the games I've been playing recently.
      </Typography>
      <Grid2
        container
        direction="column"
        style={{ marginTop: 10 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isPending || !featuredScores
          ? _.times(3, () => <FeaturedScoreSkeleton />)
          : featuredScores.map((featuredScore, idx) => (
              <FeaturedScore score={featuredScore} key={idx} />
            ))}
      </Grid2>
    </Container>
  );
};
