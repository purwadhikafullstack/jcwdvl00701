import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from "./Components/buttonStyles";

  const breakpoints = {
      ss: '20em',
      sm: '30em',
      sl: '36em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      '2xl': '96em',
  }

export const myNewTheme = extendTheme({
  colors: {
    primary: "rgba(251, 233, 70, 1)",
    secondary: "rgba(255, 255, 255, 1)",
  },
  components: {
    Button,
  },
  breakpoints : {...breakpoints}
});
