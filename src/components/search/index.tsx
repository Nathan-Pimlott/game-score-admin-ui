import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography } from "@mui/material";

import { Loading } from "../core/loading";
import { getScoresBySearch } from "../../services/score";
import { CompactScore } from "../core/compactScore";
import { useParams } from "react-router";

export default () => {
  const { searchText = "" } = useParams();

  const {
    isPending,
    error,
    data: scoresBySearch,
  } = useQuery({
    queryKey: [`scores-by-search-${searchText}`],
    queryFn: async () => await getScoresBySearch(searchText),
  });

  return (
    <Container style={{ padding: "20px", minHeight: "100%" }}>
      <Typography variant="h2">Search</Typography>
      <Typography variant="h6">View the search results below.</Typography>
      {isPending ? (
        <Loading />
      ) : scoresBySearch && scoresBySearch.length > 0 ? (
        scoresBySearch.map((score, idx) => (
          <CompactScore score={score} key={idx} />
        ))
      ) : (
        <div style={{ height: "100%" }}>
          <Typography
            variant="h5"
            style={{ textAlign: "center", margin: "auto", marginTop: 40 }}
          >
            {error
              ? "An error occurred. Please try again later"
              : "Sorry, no matching games could be found."}
          </Typography>
        </div>
      )}
    </Container>
  );
};
