import moment from "moment";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

import { IScore } from "../../types";
import { useNavigate } from "react-router";
import { Delete, Edit } from "@mui/icons-material";
import { theme } from "../../utils/theme";
import React from "react";

interface HeadCell {
  id: keyof IScore | "edit" | "delete";
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "score",
    label: "Score (/10)",
  },
  {
    id: "timeToComplete",
    label: "Time to complete (hours)",
  },
  {
    id: "finishDate",
    label: "Finish date",
  },
  {
    id: "edit",
    label: "",
  },
  {
    id: "delete",
    label: "",
  },
];

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface IProps {
  scores: IScore[];
  scoresPerPage: number;
  setScoresPerPage: Function;
  pageNumber: number;
  setPageNumber: Function;
  scoreCount: number;
  showDelete: string | undefined;
  setShowDelete: Function;
  handleDeleteScore: Function;
}

export function ScoreTable({
  scores,
  scoresPerPage,
  setScoresPerPage,
  pageNumber,
  setPageNumber,
  scoreCount,
  showDelete,
  setShowDelete,
  handleDeleteScore,
}: IProps) {
  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    pageNumber > 0 ? Math.max(0, scoresPerPage - scores.length) : 0;

  console.log({ emptyRows });

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table>
              <TableHeader />
              <TableBody>
                {scores.map((score) => (
                  <TableRow hover key={score.id}>
                    <TableCell>{score.name}</TableCell>
                    <TableCell>{score.score}</TableCell>
                    <TableCell>{score.timeToComplete}</TableCell>
                    <TableCell>
                      {moment(score.finishDate).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <Edit
                          style={{
                            color: theme().primary.main,
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/score/${score.id}`)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <Delete
                          style={{ color: theme().primary.main }}
                          onClick={() => setShowDelete(score.id)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 62 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 100]}
            component="div"
            count={scoreCount}
            rowsPerPage={scoresPerPage}
            onRowsPerPageChange={(e) => setScoresPerPage(e.target.value)}
            page={pageNumber}
            onPageChange={(_e, v) => setPageNumber(v)}
          />
        </Paper>
      </Box>
      <Dialog open={!!showDelete} onClose={() => setShowDelete(false)}>
        <DialogTitle>Delete score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this score? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleDeleteScore()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
