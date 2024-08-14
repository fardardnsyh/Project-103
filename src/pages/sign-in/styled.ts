import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { fontSize } from "../../_globals/theme";

const SignInContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-image: linear-gradient(#4f32a6, #ae97d5);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 10px;

  @media screen and (max-width: 350px) {
    width: 80px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border: 1px solid black;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 250px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #aaa;

  @media screen and (max-width: 390px) {
    width: auto;
  }
`;

const BackButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #fff;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px;
  color: white;
  background-color: #4f32a6;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: {
    ${fontSize.subHeading}
  }
  font-weight: bold;

  &:hover {
    background-color: #675991;
  }
`;

const BottomParagraph = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export {
  SignInContainer,
  Logo,
  Form,
  Input,
  FormContainer,
  BackButton,
  SubmitButton,
  BottomParagraph,
};
