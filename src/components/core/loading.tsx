import { CircularProgress, Container, Typography } from "@mui/material";

export function Loading() {
  return (
    <Container style={{ display: "flex", padding: "100px 0" }}>
      <div style={{ margin: "auto", display: "flex", flexDirection: "column" }}>
        <CircularProgress style={{ margin: "auto", height: 40, width: 40 }} />
        <Typography variant="h5" style={{ marginTop: 10 }}>
          Loading
        </Typography>
      </div>
    </Container>
  );
}
