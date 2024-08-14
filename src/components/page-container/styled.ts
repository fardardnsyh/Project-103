import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 10px;
  background-color: #ede8f5;
  border: 1px solid black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Logo = styled.img`
  width: 40px;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  @media (max-width: 450px) {
    flex-direction: column;
    padding: 10px;
    align-items: flex-start;
  }
`;

const BackButton = styled.button`
  margin-right: auto;
  cursor: pointer;
`;

const HeaderTitle = styled.h2``;

const CustomElementContainer = styled.div``;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export {
  Container,
  ContentContainer,
  HeaderContainer,
  HeaderTitle,
  BackButton,
  CustomElementContainer,
  Logo,
};
