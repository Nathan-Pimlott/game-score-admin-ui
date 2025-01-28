import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid2 as Grid, Typography } from "@mui/material";

import { getGenres } from "../../services/genre";
import { Loading } from "../core/loading";
import { Genre } from "./genre";

export default () => {
  const {
    isPending,
    error,
    data: genres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      return await getGenres();
    },
  });

  if (error) return "An error has occurred: " + error?.message;

  return (
    <Container
      style={{ padding: "20px", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h2">Genres</Typography>
      <Typography variant="h6">
        See the latest scores from each genre below.
      </Typography>
      {isPending ? (
        <Loading />
      ) : (
        <div style={{ marginTop: 10 }}>
          <Grid container spacing={2}>
            {genres.map((genre, idx) => {
              return <Genre genre={genre} key={idx} />;
            })}
          </Grid>
        </div>
      )}
    </Container>
  );
};
