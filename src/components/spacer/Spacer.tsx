import React, { useMemo } from "react";
import { DefaultTheme } from "styled-components";

import { TheSpacer } from "./styled";
import { SpacerProps } from "./types";

/**
 * A div-based spacer, no margins or padding
 *
 * @param {SpacerProps} props
 * @returns {JSX.Element}
 *
 * ```tsx
 * <Spacer direction="vertical" amount="20px" display="block" />
 * ```
 */
const Spacer = ({ direction, amount }: SpacerProps): JSX.Element => {
  const spacerTheme = useMemo<DefaultTheme>(() => {
    const sanitizedAmount = amount || "20px";

    const theme: DefaultTheme = {
      height: direction === "horizontal" ? "1px" : sanitizedAmount,
      width: direction === "horizontal" ? sanitizedAmount : "1px",
    };

    return theme;
  }, [direction, amount]);

  return <TheSpacer theme={spacerTheme} />;
};

export default Spacer;
