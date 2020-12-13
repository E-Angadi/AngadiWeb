import { createMuiTheme } from "@material-ui/core/styles";
import { configs } from "../../config/configs";

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#215273",
      main: configs.primary,
    },
    secondary: {
      // main: "#E1F5FE",
      main: configs.secondary,
    },
    footer: {
      main: configs.footer,
    },
  },
});

export default theme;
