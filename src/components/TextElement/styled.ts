import styled from "styled-components";
import { fontSize } from "../../_globals/theme";

const Container = styled.div`
  position: relative;
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  vertical-align: middle;
`;
Container.defaultProps = {
  theme: {
    display: "inline-block",
    width: "initial",
  },
};

const TextH1 = styled.h1`
  text-align: ${(props) => props.theme.justify};
  color: ${(props) => props.theme.colour};
  font-size: ${(props) => props.theme.fontSize};
  cursor: ${(props) => props.theme.cursor};
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  padding: ${(props) => props.theme.padding};
  margin: 5px;

  @media screen and (max-width: 400px) {
    font-size: ${fontSize.primaryResponsiveHeading};
  }
`;
TextH1.defaultProps = {
  theme: {
    justify: "left",
    colour: "black",
    cursor: "default",
    display: "inline-block",
    width: "initial",
    fontSize: "32px",
    padding: "10px",
  },
};

const TextH2 = styled.h2`
  text-align: ${(props) => props.theme.justify};
  color: ${(props) => props.theme.colour};
  font-size: ${(props) => props.theme.fontSize};
  cursor: ${(props) => props.theme.cursor};
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  padding: ${(props) => props.theme.padding};
  margin: 5px;
  @media screen and (max-width: 400px) {
    font-size: ${fontSize.secondaryResponsiveHeading};
  }
`;
TextH2.defaultProps = {
  theme: {
    justify: "left",
    colour: "black",
    cursor: "default",
    display: "inline-block",
    width: "initial",
    fontSize: "17px",
    padding: "10px",
  },
};

const TextH3 = styled.h3`
  text-align: ${(props) => props.theme.justify};
  color: ${(props) => props.theme.colour};
  font-size: ${(props) => props.theme.fontSize};
  cursor: ${(props) => props.theme.cursor};
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  padding: ${(props) => props.theme.padding};
  margin: 5px;
  @media screen and (max-width: 400px) {
    font-size: ${fontSize.subResponsiveHeading};
  }
`;
TextH3.defaultProps = {
  theme: {
    justify: "left",
    colour: "black",
    cursor: "default",
    display: "inline-block",
    width: "initial",
    fontSize: "16px",
    padding: "10px",
  },
};

const TextParagraph = styled.p`
  text-align: ${(props) => props.theme.justify};
  color: ${(props) => props.theme.colour};
  font-size: ${(props) => props.theme.fontSize};
  cursor: ${(props) => props.theme.cursor};
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  padding: ${(props) => props.theme.padding};
  margin: 5px;
  @media screen and (max-width: 400px) {
    font-size: ${fontSize.bodyResponsiveText};
  }
`;
TextParagraph.defaultProps = {
  theme: {
    justify: "left",
    colour: "black",
    cursor: "default",
    display: "inline-block",
    width: "initial",
    fontSize: "16px",
    padding: "10px",
  },
};

const TextParagraphBold = styled.p`
  text-align: ${(props) => props.theme.justify};
  color: ${(props) => props.theme.colour};
  font-size: ${(props) => props.theme.fontSize};
  cursor: ${(props) => props.theme.cursor};
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  font-weight: bold;
  padding: ${(props) => props.theme.padding};
  margin: 5px;
  @media screen and (max-width: 400px) {
    font-size: ${fontSize.bodyResponsiveText};
  }
`;
TextParagraphBold.defaultProps = {
  theme: {
    justify: "left",
    colour: "black",
    cursor: "default",
    display: "inline-block",
    width: "initial",
    fontSize: "16px",
    padding: "10px",
  },
};

const TextLink = styled.a`
  text-align: ${(props) => props.theme.justify};
  color: ${(props) => props.theme.colour};
  font-size: ${(props) => props.theme.fontSize};
  text-decoration: underline;
  cursor: ${(props) => props.theme.cursor};
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  font-weight: bold;
  padding: ${(props) => props.theme.padding};
  margin: 5px;
  @media screen and (max-width: 400px) {
    font-size: ${fontSize.bodyResponsiveText};
  }
`;
TextLink.defaultProps = {
  theme: {
    justify: "left",
    colour: "black",
    cursor: "default",
    display: "inline-block",
    width: "initial",
    padding: "10px",
  },
};

export {
  Container,
  TextH1,
  TextH2,
  TextH3,
  TextLink,
  TextParagraph,
  TextParagraphBold,
};
