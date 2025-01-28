import { Card, Grid2 as Grid, Typography } from "@mui/material";
import { IPlatform } from "../../types";
import { useNavigate } from "react-router";
import { theme } from "../../utils/theme";

interface IProps {
  platform: IPlatform;
}

export const Platform = ({ platform }: IProps) => {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 6, md: 4 }} style={{ margin: "20px 0 10px 0" }}>
      <Card
        variant="outlined"
        style={{
          height: "100%",
          borderRadius: 8,
          border: "none",
          minHeight: 250,
        }}
      >
        <Typography
          variant="h4"
          style={{
            backgroundColor: theme().primary.main,
            padding: 10,
            color: "white",
          }}
        >
          {platform.name}
        </Typography>
        <div style={{ padding: 10 }}>
          {platform.featuredScores?.map((score, idx) => (
            <Typography
              onClick={() => navigate(`/score/${score.id}`)}
              key={idx}
              style={{ cursor: "pointer", marginTop: 5 }}
            >
              {score.name}
            </Typography>
          ))}
        </div>
      </Card>
    </Grid>
  );
};
