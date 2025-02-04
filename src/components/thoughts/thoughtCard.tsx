import { Edit } from "@mui/icons-material";
import { Paper, Tooltip, Typography } from "@mui/material";

import { theme } from "../../utils/theme";
import { IThought } from "../../types";

interface IProps {
  thought: IThought;
  setSelectedThought: Function;
  setShowAddThought: Function;
}
export function ThoughtCard({
  thought,
  setSelectedThought,
  setShowAddThought,
}: IProps) {
  return (
    <Paper style={{ padding: 10, marginTop: 20 }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h6" style={{ flex: 1 }}>
          {thought.title}
        </Typography>
        <Tooltip title="Edit">
          <Edit
            style={{
              color: theme().primary.main,
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedThought(thought);
              setShowAddThought(true);
            }}
          />
        </Tooltip>
      </div>
      {thought.body.split("\n").map((line: string) => (
        <Typography variant="body2">{line}</Typography>
      ))}
      <Typography variant="body1">Priority: {thought.priority}</Typography>
    </Paper>
  );
}
