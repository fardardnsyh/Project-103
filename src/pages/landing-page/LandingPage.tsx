import {
  faBriefcase,
  faEnvelope,
  faFileCirclePlus,
  faFileLines,
  faMap,
  faPhone,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  CardContainer,
  CardIcon,
  FeatureCard,
  FeatureContainer,
  Footer,
  FooterContact,
  FooterLogo,
  FooterServiceContainer,
  GIF,
  HeroContainer,
  HeroImage,
  LandingContainer,
  LeftHeroContainer,
  Logo,
  NavBarButtonContainer,
  Navbar,
  ProfileContainer,
  ServiceItem,
  ServiceList,
  SocialIcon,
  SocialMediaContainer,
} from "./styled";
import logo from "../../_assets/logo.png";
import Button from "../../components/button/Button";
import TextElement from "../../components/TextElement/TextElement";
import Hero from "../../_assets/Hero Image.png";
import Dhruvi from "../../_assets/dhruvi.png";
import Spacer from "../../components/spacer/Spacer";
import ImageGIF from "../../_assets/IMG_0016.GIF";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import linkedIn from "../../_assets/linkedin.svg";
import github from "../../_assets/github.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleProfile = useCallback(() => {
    window.open("https://github.com/dhruvi1930");
  }, []);

  return (
    <LandingContainer>
      <Navbar>
        <Logo src={logo} alt="Application Tracker" />
        <NavBarButtonContainer>
          <Button
            text="Sign In"
            callback={() => navigate("/sign-in")}
            theme="dark"
          />
          <Button
            text="Sign Up"
            callback={() => navigate("/sign-up")}
            theme="dark"
          />
        </NavBarButtonContainer>
      </Navbar>
      <HeroContainer>
        <GIF src={ImageGIF} />
        <LeftHeroContainer>
          <TextElement
            theme="h1"
            text="Welcome to Application Tracker"
            alignment="center"
            padding="20px"
          />
          <TextElement
            theme="paragraph"
            text="Keep track of all your job applications, resumes, cover-letters, and interviews in one place. Never lose sight of your application status again with our easy-to-use dashboard"
          />
        </LeftHeroContainer>
        <HeroImage src={Hero} />
      </HeroContainer>
      <FeatureContainer>
        <TextElement
          theme="h1"
          text="Everything you need to streamline your job search"
          alignment="center"
          colour="black"
          padding="20px"
        />
        <FeatureCard>
          <CardContainer>
            <CardIcon icon={faFileCirclePlus} />
            <TextElement
              theme="h3"
              text="Track Applications"
              alignment="center"
              colour="black"
            />
            <TextElement
              theme="paragraph"
              text="Keep track of all your job applications and their statuses."
              alignment="center"
              colour="black"
            />
          </CardContainer>
          <CardContainer>
            <CardIcon icon={faFileLines} />
            <TextElement
              theme="h3"
              text="Manage Resumes"
              alignment="center"
              colour="black"
            />
            <TextElement
              theme="paragraph"
              text="Easily manage and access different versions of your resumes."
              alignment="center"
              colour="black"
            />
          </CardContainer>
          <CardContainer>
            <CardIcon icon={faBriefcase} />
            <TextElement
              theme="h3"
              text="Save Experiences"
              alignment="center"
              colour="black"
            />
            <TextElement
              theme="paragraph"
              text="Store details about your work experience and projects."
              alignment="center"
              colour="black"
            />
          </CardContainer>
          <CardContainer>
            <CardIcon icon={faUserCircle} />
            <TextElement
              theme="h3"
              text="Profile Customization"
              alignment="center"
              colour="black"
            />
            <TextElement
              theme="paragraph"
              text="Customize your profile to better reflect your professional persona."
              alignment="center"
              colour="black"
            />
          </CardContainer>
        </FeatureCard>
        <Spacer direction="vertical" amount="40px" />
      </FeatureContainer>
      <ProfileContainer>
        <HeroImage src={Dhruvi} />
        <LeftHeroContainer>
          <TextElement
            theme="h1"
            text="Dhruvi Lad"
            alignment="center"
            padding="20px"
            colour="black"
          />
          <TextElement
            theme="paragraph"
            colour="black"
            alignment="center"
            text="Experienced Full-Stack Developer with a demonstrated history in building responsive web applications. A good foundation in front-end and back-end development and UX/UI designs."
          />
          <Spacer direction="vertical" amount="20px" />
          <Button
            text="GitHub"
            theme="normal"
            callback={() => handleProfile()}
          />
        </LeftHeroContainer>
      </ProfileContainer>
      <Footer>
        <FooterLogo src={logo} alt="Application Tracker" />
        <FooterServiceContainer>
          <TextElement text="Services" theme="h2" />
          <ServiceList>
            <ServiceItem>Track Applications</ServiceItem>
            <ServiceItem>Manage Resumes & Cover Letters</ServiceItem>
            <ServiceItem>Save Experiences & Projects</ServiceItem>
            <ServiceItem>Profile Customization</ServiceItem>
            <ServiceItem>Resume & Cover-letter Templates</ServiceItem>
          </ServiceList>
        </FooterServiceContainer>
        <FooterContact>
          <TextElement text="Contact Details" theme="h2" />
          <TextElement
            theme="paragraph"
            text={
              <>
                <FontAwesomeIcon icon={faMap} size="1x" />
                <TextElement theme="paragraph-bold" text="Kitchener, ON" />
              </>
            }
          />
          <TextElement
            theme="paragraph"
            text={
              <>
                <FontAwesomeIcon icon={faPhone} size="1x" />
                <TextElement theme="paragraph-bold" text="+1 905-966-1930" />
              </>
            }
          />
          <TextElement
            theme="paragraph"
            text={
              <>
                <FontAwesomeIcon icon={faEnvelope} size="1x" />
                <TextElement
                  theme="paragraph-bold"
                  text="dhruvihl369@gmail.com"
                />
              </>
            }
          />
          <SocialMediaContainer>
            <SocialIcon
              src={linkedIn}
              onClick={() =>
                window.open("https://www.linkedin.com/in/dhruvi-lad-b645771a2/")
              }
            />
            <SocialIcon src={github} onClick={() => handleProfile()} />
          </SocialMediaContainer>
        </FooterContact>
      </Footer>
      <TextElement text="@ 2024 Application Tracker" theme="paragraph" />
      <TextElement text="Proudly developed by Dhruvi Lad" theme="paragraph" />
    </LandingContainer>
  );
};

export default LandingPage;
