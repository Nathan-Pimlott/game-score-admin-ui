import { Typography } from "@mui/material";
import { theme } from "../../utils/theme";

export default () => {
  return (
    <div style={{ width: "100%", height: "auto" }}>
      <div style={{ backgroundColor: theme().primary.light, padding: 20 }}>
        <Typography style={{ textAlign: "center", color: "black" }}>
          Game Score by {import.meta.env.VITE_USERNAME}
        </Typography>
        <Typography style={{ textAlign: "center", color: "black" }}>
          All the scores and thoughts on this site are my opinion.
        </Typography>
      </div>
    </div>
  );
};
