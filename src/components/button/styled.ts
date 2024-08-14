import styled from "styled-components";
import { fontSize } from "../../_globals/theme";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 8px 16px;
  border: none;
  border-radius: 60px;
  text-decoration: none;
  font-size: {
    ${fontSize.subHeading}
  }
  font-weight: bold;
  margin: 5px;

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background: ${(props) => props.theme.hoverBackground};
    color: ${(props) => props.theme.hoverColor};
  }

  @media screen and (max-width: 400px) {
    font-size: {
      ${fontSize.subResponsiveHeading}
    }
  }
`;

export { StyledButton };
