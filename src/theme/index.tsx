import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        colorScheme: "dark",
        bg: "bg.950",
        color: "white",
      },
      pre: {
        bg: "red",
      },
    },
  },
});

export default theme;
