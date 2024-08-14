import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { fontSize } from "../../_globals/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
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
  padding: 5px 5px;
`;
const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: #f00;
  padding: 5px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`;

const ImageDeatils = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  border: 1px dashed gray;
`;

const FileDisplayName = styled.a``;

export {
  Container,
  InputField,
  InputHeaderContainer,
  IsRequired,
  ImageUpload,
  Image,
  ButtonContainer,
  ImageDeatils,
  ImageContainer,
  CloseIcon,
  FileDisplayName
};
