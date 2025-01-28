import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Container, Tooltip, Typography } from "@mui/material";

import { getScore } from "../../services/score";
import { ScoreSkeleton } from "../core/scoreSkeleton";
import { useParams } from "react-router";
import moment from "moment";

export default () => {
  const { scoreId } = useParams();

  const {
    isPending,
    error,
    data: score,
  } = useQuery({
    queryKey: [`score-${scoreId}`],
    queryFn: async () => await getScore(scoreId!),
  });

  if (isPending) return <ScoreSkeleton />;

  if (error || !score?.id) return "An error has occurred: " + error?.message;

  return (
    <div>
      <img
        src="/src/assets/images/screenshot.jpg"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: 250,
          objectFit: "cover",
        }}
      />
      <Container style={{ padding: 20 }}>
        <div style={{ display: "flex" }}>
          <Typography variant="h3" style={{ flex: 1 }}>
            {score.name}
          </Typography>
          <div
            style={{
              backgroundColor:
                score.score >= 8
                  ? "green"
                  : score.score >= 5
                    ? "#ccd914"
                    : "#f25555",
              color: "white",
              borderRadius: 100,
              width: 60,
              height: 60,
              display: "flex",
            }}
          >
            <Typography variant="h4" style={{ margin: "auto" }}>
              {score.score}
            </Typography>
          </div>
        </div>
        <div style={{ paddingTop: 10 }}>
          <Typography variant="body1" style={{ marginTop: 10 }}>
            Played on {moment(score.finishDate).format("Do MMM 'YY")}
          </Typography>
          <Typography style={{ marginTop: 10 }}>
            Completion time: {score.timeToComplete} hours
          </Typography>
          <div style={{ marginTop: 20 }}>
            {score.playedPlatforms?.map((platform, idx) => (
              <Tooltip title={platform.name}>
                <img
                  src={`/src/assets/images/${platform.id}.png`}
                  style={{
                    height: 40,
                    width: 40,
                    paddingLeft: idx > 0 ? 20 : 0,
                  }}
                  key={idx}
                />
              </Tooltip>
            ))}
          </div>
        </div>
        {score.thoughts?.map((thought) => (
          <div style={{ marginTop: 10 }} key={thought.id}>
            <Typography variant="h6">{thought.title}</Typography>
            {thought.body?.split("\n").map((line, idx) => (
              <Typography key={idx} style={{ marginTop: 10 }}>
                {line}
              </Typography>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
};
