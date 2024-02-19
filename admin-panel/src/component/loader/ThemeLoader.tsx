import { LoadingOverlay } from "@mantine/core";
import React from "react";

interface IThemeLoader{
loading: boolean
}
const ThemeLoader :React.FC< IThemeLoader> = ({loading}) => {
  return (
    <LoadingOverlay
      visible={loading}
      overlayBlur={3}
      variant="oval"
      loaderProps={{ size: "lg", color: "pink", variant: "oval" }}
      color="pink"
    />
  );
};

export default ThemeLoader;
