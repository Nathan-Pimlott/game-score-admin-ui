import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img
            id="header-logo"
            src="/src/assets/images/logo.png"
            style={{ height: 50, width: 50 }}
          />
          <Typography
            id="header-title"
            variant="h6"
            component="div"
            style={{ fontFamily: '"Jersey 15", serif', fontSize: 40 }}
          >
            GameScore
          </Typography>
          <div style={{ display: "flex", margin: "20px 0 0 5px" }}>
            <Typography
              id="header-subtitle"
              variant="caption"
              style={{ margin: "auto 0 0 0" }}
            >
              By {import.meta.env.VITE_USERNAME}
            </Typography>
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{ marginRight: 20, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Typography>Home</Typography>
          </div>
          <div
            style={{ marginRight: 20, cursor: "pointer" }}
            onClick={() => navigate("/genres")}
          >
            <Typography>Genres</Typography>
          </div>
          <div
            style={{ marginRight: 20, cursor: "pointer" }}
            onClick={() => navigate("/platforms")}
          >
            <Typography>Platforms</Typography>
          </div>
          <div
            style={{ marginRight: 40, cursor: "pointer" }}
            onClick={() => navigate("/a-to-z")}
          >
            <Typography>A-Z</Typography>
          </div>
          <div>
            <Paper
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search/${encodeURI(searchValue.toLowerCase())}`);
              }}
              style={{
                padding: "0px 10px",
                display: "flex",
                alignItems: "center",
                width: "auto",
                maxWidth: 250,
                borderRadius: 10,
              }}
            >
              <InputBase
                style={{ flex: 1 }}
                placeholder="Search for a game"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
