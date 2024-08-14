import styled from "styled-components";
import ServiceBG from "../../_assets/Service_BG.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colours, fontSize } from "../../_globals/theme";

const LandingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(#d5baff, #a166ff);
`;

const Navbar = styled.nav`
  width: 100%;
  padding: 10px 20px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Logo = styled.img`
  padding: 10px;
  width: 50px;
  height: 50px;
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 50px 30px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LeftHeroContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const HeroImage = styled.img`
  width: 400px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  padding: 50px 30px;
  background-image: url(${ServiceBG});

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 840px) {
    flex-wrap: wrap;
  }
`;

const NavBarButtonContainer = styled.div`
  padding: 10px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;

const CardIcon = styled(FontAwesomeIcon)`
  font-size: 2em;
  color: ${colours.tabBackground};
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 50px 30px;
  width: 100%;
  background-color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const GIF = styled.img`
  width: 300px;
  bottom: 90px;
  right: 400px;
  position: absolute;

  @media (max-width: 768px) {
    bottom: 0;
    right: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 30px;
  color: #fff;
  width: 80%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ServiceList = styled.ul`
  font-size: ${fontSize.bodyText};
  font-weight: bold;
  color: #fff;
  padding: 0;
  list-style: none;
`;

const ServiceItem = styled.li`
  margin-bottom: 10px;
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterLogo = styled.img`
  width: 90px;
  height: 90px;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const SocialIcon = styled.img`
  width: 20px;
  cursor: pointer;
  color: #fff;
`;

export {
  LandingContainer,
  Navbar,
  Logo,
  FeatureContainer,
  FeatureCard,
  NavBarButtonContainer,
  CardContainer,
  CardIcon,
  HeroContainer,
  LeftHeroContainer,
  HeroImage,
  ProfileContainer,
  GIF,
  Footer,
  FooterSection,
  FooterServiceContainer,
  ServiceList,
  ServiceItem,
  FooterContact,
  FooterLogo,
  SocialMediaContainer,
  SocialIcon,
};
