import styled from "styled-components";

const TheSpacer = styled.div`
  display: ${(props) => props.theme.display};
  width: ${(props) => props.theme.width};
  height: ${(props) => props.theme.height};
`;
TheSpacer.defaultProps = {
  theme: {
    width: "1px",
    height: "1px",
    display: "inline-block",
  },
};

export { TheSpacer };
