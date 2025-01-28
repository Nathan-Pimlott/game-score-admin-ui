import {} from "react";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router";

export default () => {
  const navigate = useNavigate();
  return (
    <Container>
      <p>The page you were looking for could not be found.</p>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </Container>
  );
};
