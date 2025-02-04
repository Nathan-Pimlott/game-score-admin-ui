import { useState } from "react";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Grid2, Typography } from "@mui/material";

import {
  deletePlatform,
  getPlatformCount,
  getPlatforms,
} from "../../services/platform";
import { PlatformTable } from "./table";
import { Loading } from "../core/loading";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default () => {
  const navigate = useNavigate();

  const { data: platformCount } = useQuery({
    queryKey: ["platforms-count"],
    queryFn: async () => {
      return await getPlatformCount();
    },
    refetchOnWindowFocus: false,
  });

  const [page, setPage] = useState(0);
  const [platformsPerPage, setPlatformsPerPage] = useState(5);
  const [platformToDelete, setPlatformToDelete] = useState();

  const {
    isPending,
    error,
    data: platforms,
    refetch,
  } = useQuery({
    // This allows it to auto refetch when state changes.
    queryKey: [`platforms-${page}-${platformsPerPage}`],
    queryFn: async () => {
      return await getPlatforms(page, platformsPerPage);
    },
    refetchOnWindowFocus: false,
  });

  async function handleDeletePlatform() {
    await deletePlatform(platformToDelete!);
    setPlatformToDelete(undefined);
    refetch();
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Container style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h2" style={{ flex: 1 }}>
          All Platforms
        </Typography>
        <Typography variant="h2">
          <Button
            variant="contained"
            style={{ borderRadius: 20, padding: "10px 20px" }}
            onClick={() => {
              navigate("/platform/add");
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
        {isPending || !platforms || !platformCount ? (
          <Loading />
        ) : (
          <PlatformTable
            platforms={platforms}
            pageNumber={page}
            setPageNumber={setPage}
            platformsPerPage={platformsPerPage}
            setPlatformsPerPage={setPlatformsPerPage}
            platformCount={platformCount}
            showDelete={platformToDelete}
            setShowDelete={setPlatformToDelete}
            handleDeletePlatform={handleDeletePlatform}
          />
        )}
      </Grid2>
    </Container>
  );
};
