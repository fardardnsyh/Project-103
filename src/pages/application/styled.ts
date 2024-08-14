import styled from "styled-components";

const ApplicationContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 400px) {
    width: 280px;
  }
  @media screen and (max-width: 380px) {
    width: 260px;
  }
  @media screen and (max-width: 360px) {
    width: 240px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 880px) {
    flex-wrap: wrap;
  }
`;

const InnerApplicationContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ButtonTextConatiner = styled.div`
  display: flex;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;

export {
  ApplicationContainer,
  InnerApplicationContainer,
  ContentContainer,
  ButtonContainer,
  ButtonTextConatiner,
};
