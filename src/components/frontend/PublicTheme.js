import { createMuiTheme } from "@material-ui/core/styles";
import { configs } from "../../config/configs";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: configs.primary,
    },
    secondary: {
      main: configs.secondary,
    },
    footer: {
      main: configs.footer,
    },
  },
});

export default theme;
