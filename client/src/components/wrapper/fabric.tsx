import React from "react";
import { Fabric as OfficeFabric } from "office-ui-fabric-react/lib/Fabric";
import { createTheme } from "office-ui-fabric-react";
import { ThemeProvider } from "@uifabric/foundation";
import { addVariants } from "@uifabric/variants";

const theme = createTheme({
  palette: {
    themePrimary: "#f01aaf"
  }
});

addVariants(theme);

export const Fabric: React.FunctionComponent = props => {
  return (
    <OfficeFabric>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </OfficeFabric>
  );
};
