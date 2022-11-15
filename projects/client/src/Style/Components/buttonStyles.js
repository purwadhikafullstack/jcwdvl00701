export const buttonStyles = {
  variants: {
    primary: (props) => ({
      bg: "primary",
      color: "black",
      borderRadius: "0px",
      width: "320px",
      height: "44px",
      fontSize: "16px",
      fontWeight: "600",
      _hover: {
        bg: "rgba(23, 24, 24, 1)",
        color: "white",
      },
    }),
    secondary: (props) => ({
      bg: "secondary",
      color: "black",
      borderRadius: "0px",
      width: "320px",
      height: "44px",
      fontSize: "16px",
      fontWeight: "600",
      border: "1px",
      borderColor: "#ccd0d5",
      _hover: {
        bg: "primary",
        color: "black",
        border: "0px",
      },
    }),
  },
};
