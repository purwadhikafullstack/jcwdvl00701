import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from "./Components/buttonStyles";

export const myNewTheme = extendTheme({
  colors: {
    primary: "rgba(251, 233, 70, 1)",
    secondary: "rgba(255, 255, 255, 1)",
  },
  components: {
    Button,
  },
});
