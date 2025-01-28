import { Container, Grid2 as Grid, Skeleton } from "@mui/material";

export function FeaturedScoreSkeleton() {
  return (
    <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }} style={{ paddingTop: 20 }}>
      <Container
        style={{
          borderRadius: 10,
          overflow: "hidden",
          padding: 0,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton
          id="skeleton-score.image"
          style={{
            width: "100%",
            height: 300,
          }}
          variant="rectangular"
        />
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1, margin: "auto" }}>
              <Skeleton
                id="skeleton-score.name"
                style={{ maxWidth: "350px", width: "auto" }}
                sx={{ fontSize: 40 }}
              />
            </div>

            <Skeleton
              id="skeleton-score.score"
              style={{
                width: 60,
                height: 60,
              }}
              variant="circular"
            />
          </div>

          <div style={{ paddingTop: 10 }}>
            <Skeleton id="skeleton-score.finishDate" width={200} />
          </div>

          <div style={{ paddingTop: 10 }}>
            <Skeleton
              id="skeleton-score.platform"
              style={{ height: 40, width: 40 }}
              variant="circular"
            />
          </div>
        </div>
      </Container>
    </Grid>
  );
}
