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

import { IGenre } from "../../types";
import { useNavigate } from "react-router";
import { Delete, Edit } from "@mui/icons-material";
import { theme } from "../../utils/theme";
import React from "react";

interface HeadCell {
  id: keyof IGenre | "edit" | "delete";
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "scoreCount",
    label: "Linked scores",
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
  genres: IGenre[];
  genresPerPage: number;
  setGenresPerPage: Function;
  pageNumber: number;
  setPageNumber: Function;
  genreCount: number;
  showDelete: string | undefined;
  setShowDelete: Function;
  handleDeleteGenre: Function;
}

export function GenreTable({
  genres,
  genresPerPage,
  setGenresPerPage,
  pageNumber,
  setPageNumber,
  genreCount,
  showDelete,
  setShowDelete,
  handleDeleteGenre,
}: IProps) {
  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    pageNumber > 0 ? Math.max(0, genresPerPage - genres.length) : 0;

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }} style={{ marginTop: 20 }}>
          <TableContainer>
            <Table>
              <TableHeader />
              <TableBody>
                {genres.map((genre) => (
                  <TableRow hover key={genre.id}>
                    <TableCell>{genre.name}</TableCell>
                    <TableCell>{genre.scoreCount}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <Edit
                          style={{
                            color: theme().primary.main,
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/genre/${genre.id}`)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <Delete
                          style={{ color: theme().primary.main }}
                          onClick={() => setShowDelete(genre.id)}
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
            count={genreCount}
            rowsPerPage={genresPerPage}
            onRowsPerPageChange={(e) => setGenresPerPage(e.target.value)}
            page={pageNumber}
            onPageChange={(_e, v) => setPageNumber(v)}
          />
        </Paper>
      </Box>
      <Dialog open={!!showDelete} onClose={() => setShowDelete(false)}>
        <DialogTitle>Delete genre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this genre? Any links to scores will
            be deleted but the score will not be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleDeleteGenre()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
