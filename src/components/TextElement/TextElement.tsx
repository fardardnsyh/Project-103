import React, { useCallback, useMemo } from "react";
import { DefaultTheme } from "styled-components";
import {
  TextH1,
  TextH2,
  TextH3,
  TextLink,
  TextParagraph,
  Container,
  TextParagraphBold,
} from "./styled";
import { TextElementProps } from "./types";
import { fontSize } from "../../_globals/theme";

/**
 * A standardized text element component
 *
 * @param {TextElementProps} props
 * @returns {JSX.Element}
 *
 * ```tsx
 * <TextElement
 *  text={`A ${type} provided by ${companyName}`}
 *  theme="link"
 *  alignment="left"
 *  colour="white"
 *  onClick={() => handleCompanyClick()}
 * />
 * ```
 */
const TextElement = ({
  text,
  theme,
  colour,
  onClick,
  display,
  width,
  alignment,
  padding,
}: TextElementProps): JSX.Element => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const containerTheme = useMemo(() => {
    const newTheme: DefaultTheme = {
      display: display || "inline-block",
      width: width || "initial",
    };

    return newTheme;
  }, [display, width]);

  const textTheme = useMemo(() => {
    const newTheme: DefaultTheme = {
      justify: alignment || "left",
      colour: colour || "white",
      cursor: onClick ? "pointer" : "default",
      fontSize: fontSize.bodyText,
      width: "100%",
      padding: padding,
    };

    switch (theme) {
      case "h1":
        newTheme.fontSize = fontSize.primaryHeading;
        break;
      case "h2":
        newTheme.fontSize = fontSize.secondaryHeading;
        break;
      case "h3":
        newTheme.fontSize = fontSize.subHeading;
        break;
      case "paragraph":
        newTheme.fontSize = fontSize.bodyText;
        break;
      case "paragraph-bold":
        newTheme.fontSize = fontSize.bodyText;
        break;
      case "link":
        newTheme.fontSize = fontSize.bodyText;
        break;
      default:
        newTheme.fontSize = fontSize.bodyText;
        break;
    }

    return newTheme;
  }, [alignment, colour, onClick, padding, theme]);

  const sanitizedElement = useMemo(() => {
    let newElement = <TextParagraph theme={textTheme}>{text}</TextParagraph>;

    switch (theme) {
      case "h1":
        newElement = (
          <TextH1 theme={textTheme} onClick={() => handleClick()}>
            {text}
          </TextH1>
        );
        break;
      case "h2":
        newElement = (
          <TextH2 theme={textTheme} onClick={() => handleClick()}>
            {text}
          </TextH2>
        );
        break;
      case "h3":
        newElement = (
          <TextH3 theme={textTheme} onClick={() => handleClick()}>
            {text}
          </TextH3>
        );
        break;
      case "paragraph":
        newElement = (
          <TextParagraph theme={textTheme} onClick={() => handleClick()}>
            {text}
          </TextParagraph>
        );
        break;
      case "paragraph-bold":
        newElement = (
          <TextParagraphBold theme={textTheme} onClick={() => handleClick()}>
            {text}
          </TextParagraphBold>
        );
        break;
      case "link":
        newElement = (
          <TextLink theme={textTheme} onClick={() => handleClick()}>
            {text}
          </TextLink>
        );
        break;
      default:
        newElement = (
          <TextParagraph theme={textTheme} onClick={() => handleClick()}>
            {text}
          </TextParagraph>
        );
        break;
    }

    return newElement;
  }, [theme, text, textTheme, handleClick]);

  return <Container theme={containerTheme}>{sanitizedElement}</Container>;
};

export default TextElement;
