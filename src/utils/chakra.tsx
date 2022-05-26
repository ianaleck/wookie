import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  components: {
    Alert: {
      defaultProps: {
        variant: "subtle",
      },
    },
  },
  styles: {
    global: () => ({
      "html, body, #__next": {
        fontSize: "16px",
        height: "100%",
        fontFamily: "Helvetica",
        scrollBehavior: "smooth",
        color: "white",
        backgroundColor: "black",
      },
      "h1, h2, h3, h4, h5, h6": {
        fontSize: "revert",
        color: "revert",
      },
      "button, input": {
        boxShadow: "none !important",
      },
      "input:focus, select:focus": {
        outline: "none !important",
        boxShadow: "none !important",
      },
      ".splide__slide.is-active .location-card": {
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        filter: "grayscale(0) !important",
        transform: "scale(1.1)",
      },
      ".splide__track": {
        paddingTop: "10px",
        overflow: "inherit",
        overflowY: "clip",
      },
      ".splide__arrow": {
        borderRadius: "50%",
        background: "aliceblue",
        opacity: "0.3",
      },
      ".splide__arrow svg": {
        width: "1rem",
      },
    }),
  },
  colors: {
    gray: {
      10: "#4a556869",
    },
  },
});

export default theme;
