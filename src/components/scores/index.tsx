import { useState } from "react";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Typography } from "@mui/material";

import { deleteScore, getScoreCount, getScores } from "../../services/score";
import { ScoreTable } from "./table";
import { Loading } from "../core/loading";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default () => {
  const navigate = useNavigate();

  const { data: scoreCount } = useQuery({
    queryKey: ["scores-count"],
    queryFn: async () => {
      return await getScoreCount();
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
    queryKey: [`scores-${page}-${scoresPerPage}`],
    queryFn: async () => {
      return await getScores(page, scoresPerPage);
    },
    refetchOnWindowFocus: false,
  });

  async function handleDeleteScore() {
    await deleteScore(scoreToDelete!);
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Container style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h2" style={{ flex: 1 }}>
          All Scores
        </Typography>
        <Typography variant="h2">
          <Button
            variant="contained"
            style={{ borderRadius: 20, padding: "10px 20px" }}
            onClick={() => {
              navigate("/score/add");
            }}
          >
            Add new
            <Add style={{ marginLeft: 5 }} />
          </Button>
        </Typography>
      </div>
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
    </Container>
  );
};
