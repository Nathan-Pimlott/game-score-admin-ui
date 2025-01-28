import _ from "lodash";
import { Container, Skeleton } from "@mui/material";

export function ScoreSkeleton() {
  return (
    <Container
      style={{
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton
        id="skeleton-score.image"
        style={{
          width: "100%",
          height: 250,
        }}
        variant="rectangular"
      />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1, margin: "auto" }}>
            <Skeleton
              id="skeleton-score.name"
              style={{ maxWidth: "350px", width: "auto" }}
              sx={{ fontSize: 60 }}
            />
          </div>

          <Skeleton
            id="skeleton-score.score"
            style={{
              width: 60,
              height: 60,
              margin: "auto",
            }}
            variant="circular"
          />
        </div>

        <Skeleton
          id="skeleton-score.finishDate"
          width={200}
          style={{ marginTop: 10 }}
        />

        <Skeleton
          id="skeleton-score.completionTime"
          width={200}
          style={{ marginTop: 10 }}
        />

        <Skeleton
          id="skeleton-score.platform"
          style={{ height: 40, width: 40, marginTop: 20 }}
          variant="circular"
        />

        <Skeleton
          id="skeleton-score.overviewTitle"
          width={200}
          style={{ marginTop: 20 }}
        />
        {_.times(5, (idx) => (
          <Skeleton
            id="skeleton-score.overviewContent"
            width={"100%"}
            style={{ marginTop: idx === 0 ? 20 : 5 }}
            key={idx}
          />
        ))}
      </div>
    </Container>
  );
}
