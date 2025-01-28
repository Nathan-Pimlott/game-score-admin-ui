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

import { IPlatform } from "../../types";
import { useNavigate } from "react-router";
import { Delete, Edit } from "@mui/icons-material";
import { theme } from "../../utils/theme";
import React from "react";

interface HeadCell {
  id: keyof IPlatform | "edit" | "delete";
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
  platforms: IPlatform[];
  platformsPerPage: number;
  setPlatformsPerPage: Function;
  pageNumber: number;
  setPageNumber: Function;
  platformCount: number;
  showDelete: string | undefined;
  setShowDelete: Function;
  handleDeletePlatform: Function;
}

export function PlatformTable({
  platforms,
  platformsPerPage,
  setPlatformsPerPage,
  pageNumber,
  setPageNumber,
  platformCount,
  showDelete,
  setShowDelete,
  handleDeletePlatform,
}: IProps) {
  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    pageNumber > 0 ? Math.max(0, platformsPerPage - platforms.length) : 0;

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table>
              <TableHeader />
              <TableBody>
                {platforms.map((platform) => (
                  <TableRow hover key={platform.id}>
                    <TableCell>{platform.name}</TableCell>
                    <TableCell>{platform.scoreCount}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <Edit
                          style={{
                            color: theme().primary.main,
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/platform/${platform.id}`)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <Delete
                          style={{ color: theme().primary.main }}
                          onClick={() => setShowDelete(platform.id)}
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
            count={platformCount}
            rowsPerPage={platformsPerPage}
            onRowsPerPageChange={(e) => setPlatformsPerPage(e.target.value)}
            page={pageNumber}
            onPageChange={(_e, v) => setPageNumber(v)}
          />
        </Paper>
      </Box>
      <Dialog open={!!showDelete} onClose={() => setShowDelete(false)}>
        <DialogTitle>Delete platform</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this platform? This cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleDeletePlatform()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
