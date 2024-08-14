import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: ${(props) => props.theme.background};
  width: ${(props) => props.theme.width};
  position: relative;
  max-width: 200px;
  transition: width 0.3s ease-in-out;
`;

const Logo = styled.img`
  width: 70px;
  cursor: pointer;
  align-self: center;
  margin-bottom: 10px;

  @media screen and (max-width: 350px) {
    width: 50px;
  }
`;

const TabContainer = styled.div`
  padding: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin: 5px;
  padding: 8px;
  align-items: center;
  align-self: center;
  background-color: #411980;
  border-radius: 58px;
`;

const ProfileIcon = styled(FontAwesomeIcon)`
  color: #9772d3;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  border-radius: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: 1px solid linear-gradient(#4f32a6, #ae97d5);
`;

const ProfileTitle = styled.p`
  padding: 5px 20px;
  margin: 0px;
  font-weight: bold;
  font-size: 16px;
`;

const EditProfileIcon = styled(FontAwesomeIcon)`
  color: #fff;
  cursor: pointer;
`;

const NavbarIcon = styled(FontAwesomeIcon)`
  color: inherit;
`;

const NavSpan = styled.span`
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  color: inherit;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease-in-out;

  &.active {
    background-image: linear-gradient(#4f32a6, #ae97d5);
    color: white;
  }
`;

const SignOutIcon = styled(FontAwesomeIcon)`
  color: #fff;
`;

const CollapseIcon = styled(FontAwesomeIcon)`
  color: #fff;
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
`;

const SignUpButtonText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export {
  SidebarContainer,
  NavSpan,
  StyledLink,
  ProfileContainer,
  EditProfileIcon,
  TabContainer,
  ProfileIcon,
  NavbarIcon,
  Logo,
  ProfileTitle,
  SignOutIcon,
  CollapseIcon,
  ProfileImg,
  SignUpButtonText,
};
