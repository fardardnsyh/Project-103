import { useCallback, useMemo } from "react";
import { ButtonProps } from "./types";
import { DefaultTheme } from "styled-components";
import { StyledButton } from "./styled";
import { colours } from "../../_globals/theme";

/**
 * Button Component
 *
 * @param {ButtonProps} props
 *
 * @returns {JSX.Element}
 *
 * ```tsx
 * <Button
 * text="Add New Application"
 * callback={() => handleSignout()}
 * isDisabled={false}
 * theme="normal"
 */
const Button = ({
  text,
  callback,
  isDisabled,
  theme,
}: ButtonProps): JSX.Element => {
  // custom theme for button
  const buttonTheme = useMemo(() => {
    const newTheme: DefaultTheme = {
      background: "#ffffff",
      color: "#000000",
      hoverBackground: "#e6e6e6",
      hoverColor: "#333333",
    };

    switch (theme) {
      case "normal":
        newTheme.background = colours.buttonBackground;
        newTheme.color = "#ffffff";
        newTheme.hoverBackground = colours.sideBarBackground;
        newTheme.hoverColor = "#ffffff";
        break;
      case "dark":
        newTheme.background = "#000000";
        newTheme.color = "#ffffff";
        newTheme.hoverBackground = "#111111";
        newTheme.hoverColor = "#ffffff";
        break;
      default:
        break;
    }
    return newTheme;
  }, [theme]);

  // onclick function
  const handleClick = useCallback(() => {
    if (callback) {
      // eslint-disable-next-line callback-return
      callback();
    }
  }, [callback]);

  return (
    <StyledButton
      theme={buttonTheme}
      type="button"
      disabled={isDisabled}
      onClick={() => handleClick()}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
