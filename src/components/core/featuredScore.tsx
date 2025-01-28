import moment from "moment";
import { useNavigate } from "react-router";
import { Card, Grid2 as Grid, Tooltip, Typography } from "@mui/material";

import { IScore } from "../../types";

interface IProps {
  score: IScore;
}

export function FeaturedScore({ score }: IProps) {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, sm: 10, md: 8, xl: 6 }} style={{ paddingTop: 20 }}>
      <Card
        style={{
          borderRadius: 10,
          cursor: "pointer",
        }}
        raised={false}
        onClick={() => {
          navigate(`/score/${score.id}`);
        }}
      >
        <img
          src="/src/assets/images/screenshot.jpg"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: 250,
            objectFit: "cover",
          }}
        />
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h4" style={{ flex: 1, margin: "auto" }}>
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
            <Typography variant="body1">
              Played {moment(score.finishDate).format("Do MMMM YYYY")}
            </Typography>
          </div>

          <div style={{ paddingTop: 10 }}>
            {score.playedPlatforms?.map((platform, idx) => (
              <Tooltip title={platform.name}>
                <img
                  src={`/src/assets/images/${platform.id}.png`}
                  style={{
                    height: 40,
                    width: 40,
                    paddingLeft: idx > 0 ? 10 : 0,
                  }}
                  key={idx}
                />
              </Tooltip>
            ))}
          </div>
        </div>
      </Card>
    </Grid>
  );
}
