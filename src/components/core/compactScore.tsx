import moment from "moment";
import { useNavigate } from "react-router";
import { Paper, Tooltip, Typography } from "@mui/material";

import { IScoreCompact } from "../../types";

interface IProps {
  score: IScoreCompact;
}

export function CompactScore({ score }: IProps) {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 20 }}>
      <Paper
        elevation={0}
        style={{
          borderRadius: 10,
          overflow: "hidden",
          padding: 0,
          cursor: "pointer",
          display: "flex",
        }}
        onClick={() => {
          navigate(`/score/${score.id}`);
        }}
      >
        <img
          src="/src/assets/images/screenshot.jpg"
          style={{
            maxHeight: 300,
            width: 200,
          }}
        />
        <div style={{ padding: 20, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h4" style={{ flex: 1 }}>
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

          <div style={{ display: "flex" }}>
            <div style={{ margin: "auto 0 0 0", flex: 1 }}>
              <Typography variant="body1">
                Played {moment(score.finishDate).format("Do MMMM YYYY")}
              </Typography>
            </div>

            <div
              style={{ margin: "auto 0 0 0", paddingTop: 10, display: "flex" }}
            >
              {score.playedPlatforms?.map((platform, idx) => (
                <Tooltip title={platform.name}>
                  <img
                    src={`/src/assets/images/${platform.id}.png`}
                    style={{
                      height: 40,
                      width: 40,
                      paddingLeft: idx > 0 ? 10 : 0,
                      marginTop: "auto",
                    }}
                    key={idx}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
