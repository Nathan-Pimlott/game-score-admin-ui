import { useState } from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Grid2, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import {
  deleteScore,
  getScoresBySearch,
  getSearchScoreCount,
} from "../../services/score";
import { ScoreTable } from "./table";
import { Loading } from "../core/loading";

export default () => {
  const navigate = useNavigate();
  const { searchText } = useParams();

  const { data: scoreCount } = useQuery({
    queryKey: [`scores-${searchText}-count`],
    queryFn: async () => {
      return await getSearchScoreCount(searchText!);
    },
    refetchOnWindowFocus: false,
  });

  const [page, setPage] = useState(0);
  const [scoresPerPage, setScoresPerPage] = useState(5);
  const [scoreToDelete, setScoreToDelete] = useState();

  const {
    isPending,
    error,
    data: scores,
  } = useQuery({
    // This allows it to auto refetch when state changes.
    queryKey: [`scores-${searchText}-${page}-${scoresPerPage}`],
    queryFn: async () => {
      return await getScoresBySearch(searchText!, page, scoresPerPage);
    },
    // refetchOnWindowFocus: false,
  });

  async function handleDeleteScore() {
    await deleteScore(scoreToDelete!);
  }

  if (error) {
    return <div>Error!</div>;
  }

  console.log({ scoreCount, scores });

  return (
    <Container style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h2" style={{ flex: 1 }}>
          Search Results
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            style={{ borderRadius: 20, padding: "10px 20px", margin: "auto" }}
            onClick={() => {
              navigate("/score/add");
            }}
          >
            Add new
            <Add style={{ marginLeft: 5 }} />
          </Button>
        </div>
      </div>
      <Grid2
        container
        direction="column"
        style={{ marginTop: 10 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isPending || !scores || !scoreCount ? (
          <Loading />
        ) : (
          <ScoreTable
            scores={scores}
            pageNumber={page}
            setPageNumber={setPage}
            scoresPerPage={scoresPerPage}
            setScoresPerPage={setScoresPerPage}
            scoreCount={scoreCount}
            showDelete={scoreToDelete}
            setShowDelete={setScoreToDelete}
            handleDeleteScore={handleDeleteScore}
          />
        )}
      </Grid2>
    </Container>
  );
};
