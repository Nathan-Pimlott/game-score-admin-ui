import { useState } from "react";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Grid2, Typography } from "@mui/material";

import { deleteGenre, getGenreCount, getGenres } from "../../services/genre";
import { GenreTable } from "./table";
import { Loading } from "../core/loading";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default () => {
  const navigate = useNavigate();

  const { data: genreCount } = useQuery({
    queryKey: ["genres-count"],
    queryFn: async () => {
      return await getGenreCount();
    },
    refetchOnWindowFocus: false,
  });

  const [page, setPage] = useState(0);
  const [genresPerPage, setGenresPerPage] = useState(5);
  const [genreToDelete, setGenreToDelete] = useState();

  const {
    isPending,
    error,
    data: genres,
  } = useQuery({
    // This allows it to auto refetch when state changes.
    queryKey: [`genres-${page}-${genresPerPage}`],
    queryFn: async () => {
      return await getGenres(page, genresPerPage);
    },
    refetchOnWindowFocus: false,
  });

  async function handleDeleteGenre() {
    await deleteGenre(genreToDelete!);
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Container style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h2" style={{ flex: 1 }}>
          All Genres
        </Typography>
        <Typography variant="h2">
          <Button
            variant="contained"
            style={{ borderRadius: 20, padding: "10px 20px" }}
            onClick={() => {
              navigate("/genre/add");
            }}
          >
            Add new
            <Add style={{ marginLeft: 5 }} />
          </Button>
        </Typography>
      </div>
      <Grid2
        container
        direction="column"
        style={{ marginTop: 10 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isPending || !genres || !genreCount ? (
          <Loading />
        ) : (
          <GenreTable
            genres={genres}
            pageNumber={page}
            setPageNumber={setPage}
            genresPerPage={genresPerPage}
            setGenresPerPage={setGenresPerPage}
            genreCount={genreCount}
            showDelete={genreToDelete}
            setShowDelete={setGenreToDelete}
            handleDeleteGenre={handleDeleteGenre}
          />
        )}
      </Grid2>
    </Container>
  );
};
