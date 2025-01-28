import { useTheme } from "@mui/material";

export const theme = () => ({
  primary: {
    main: useTheme().palette.primary.main,
    light: useTheme().palette.primary.light,
  },
});
