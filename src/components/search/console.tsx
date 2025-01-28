import { Card, colors, Grid2 as Grid, Typography } from "@mui/material";
import { IGenre } from "../../types";
import { useNavigate } from "react-router";

interface IProps {
  genre: IGenre;
}

export const Genre = ({ genre }: IProps) => {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 6, md: 4 }} style={{ margin: "20px 0 10px 0" }}>
      <Card
        variant="outlined"
        style={{ height: "100%", borderRadius: 8, border: "none" }}
      >
        <Typography
          variant="h4"
          style={{
            backgroundColor: colors.purple["200"],
            padding: 10,
            color: "white",
          }}
        >
          {genre.name}
        </Typography>
        <div style={{ padding: 10 }}>
          {genre.featuredScores?.map((featuredScore) => (
            <Typography
              onClick={() => navigate(`/score/${featuredScore.id}`)}
              style={{ cursor: "pointer", marginTop: 5 }}
            >
              {featuredScore.name}
            </Typography>
          ))}
        </div>
      </Card>
    </Grid>
  );
};
