import * as React from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Grid2 as Grid,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";

import { Loading } from "../core/loading";
import { getScore } from "../../services/score";
import { getThoughts } from "../../services/thought";
import { AddThoughtForm } from "./form";
import { Add, Edit } from "@mui/icons-material";
import { theme } from "../../utils/theme";
import { ThoughtCard } from "./thoughtCard";

export default () => {
  const { scoreId } = useParams();
  const navigate = useNavigate();

  const {
    isPending: scoreIsPending,
    error: scoreError,
    data: score,
  } = useQuery({
    queryKey: [`score-${scoreId}`],
    queryFn: async () => await getScore(scoreId as string),
  });

  const {
    isPending: thoughtsIsPending,
    error: thoughtsError,
    data: thoughts,
    refetch: refetchThoughts,
  } = useQuery({
    queryKey: ["score-thoughts"],
    queryFn: async () => await getThoughts(scoreId as string),
  });

  const [showAddThought, setShowAddThought] = React.useState(false);
  const [selectedThought, setSelectedThought] = React.useState<any>();

  if (scoreError || thoughtsError) return "An error has occurred";

  return (
    <React.Fragment>
      <Container style={{ padding: "20px" }}>
        {scoreIsPending || thoughtsIsPending || !score ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div style={{ display: "flex" }}>
              <Typography variant="h4" style={{ flex: 1 }}>
                Thoughts for{" "}
                <div
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/score/${score.id}`);
                  }}
                >
                  {score.name}
                </div>
              </Typography>
              <Button
                variant="contained"
                onClick={() => setShowAddThought(true)}
              >
                Add new <Add style={{ marginLeft: 5 }} />
              </Button>
            </div>
            {thoughts
              .sort((a, b) => a.priority - b.priority)
              ?.map((thought) => (
                <ThoughtCard
                  thought={thought}
                  setSelectedThought={setSelectedThought}
                  setShowAddThought={setShowAddThought}
                />
              ))}
          </React.Fragment>
        )}
      </Container>
      {score && (
        <AddThoughtForm
          open={showAddThought}
          setOpen={setShowAddThought}
          score={score}
          selectedThought={selectedThought}
          refetchThoughts={refetchThoughts}
        />
      )}
    </React.Fragment>
  );
};
