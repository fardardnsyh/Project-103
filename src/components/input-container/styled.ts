import styled from "styled-components";
import { fontSize } from "../../_globals/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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

const InputHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const InputTitle = styled.h3`
  margin: 0;
  margin-right: 5px;
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

const InputField = styled.input`
  box-sizing: border-box;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px solid #808080;
  width: 100%;
`;

const InputTextArea = styled.textarea`
  box-sizing: border-box;
  padding: 12px 10px;
  border-radius: 5px;
  border: 1px solid #808080;
  width: 100%;
`;

export {
  Container,
  InputField,
  InputTitle,
  InputTextArea,
  IsRequired,
  InputHeaderContainer,
};
