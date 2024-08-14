import styled from "styled-components";
import { fontSize } from "../../_globals/theme";

const Dropdown = styled.select`
  padding: 10px 10px;
  border-radius: 5px;
`;

const DropdownOption = styled.option``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 400px) {
    width: 270px;
  }
  @media screen and (max-width: 380px) {
    width: 250px;
  }
  @media screen and (max-width: 360px) {
    width: 230px;
  }
`;

const InputTitle = styled.h3`
  margin: 0;
  margin-right: 4px;
`;

const IsRequired = styled.span`
  font-size: 20px;
  color: red;
  line-height: normal;
  @media screen and (max-width: 400px) {
    font-size: {
      ${fontSize.bodyText}
    }
  }
`;

const InputHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export {
  Dropdown,
  DropdownOption,
  Container,
  InputTitle,
  IsRequired,
  InputHeaderContainer,
};
