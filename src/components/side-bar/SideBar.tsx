import React, { useState, useEffect } from "react";
import {
  SidebarContainer,
  NavbarIcon,
  ProfileContainer,
  ProfileIcon,
  StyledLink,
  Logo,
  ProfileTitle,
  EditProfileIcon,
  TabContainer,
  SignOutIcon,
  CollapseIcon,
  NavSpan,
  SignUpButtonText,
} from "./styled";
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faBriefcase,
  faEnvelope,
  faFileCirclePlus,
  faFileLines,
  faFolder,
  faPencil,
  faUserCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Button from "../button/Button";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { DefaultTheme } from "styled-components";
import { colours } from "../../_globals/theme";
import logo from "../../_assets/logo.png";
import Spacer from "../spacer/Spacer";

/**
 * SideBar Component
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <SideBar/>
 * ```
 */
const SideBar = (): JSX.Element => {
  const location = useLocation();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    window.screen.availWidth <= 600
  );
  const [isResponsiveCollapse, setIsResponsiveCollapse] = useState<boolean>(
    window.screen.availWidth <= 600
  );

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 600;
      setIsCollapsed(shouldCollapse);
      setIsResponsiveCollapse(shouldCollapse);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarTheme: DefaultTheme = {
    background: colours.sideBarBackground,
    width: isCollapsed ? "60px" : "200px",
  };

  const tabTheme: DefaultTheme = {
    background: colours.tabBackground,
  };

  // highlight open page tab on nav bar
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  // sign out function
  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProfileClick = () => {
    if (isCollapsed) {
      navigate(`/profile/${userData?.uid}`);
    }
  };

  return (
    <SidebarContainer theme={sidebarTheme}>
      <Logo
        src={logo}
        alt="Application Tracker"
        onClick={() => navigate("/applications")}
      />
      <ProfileContainer>
        <ProfileIcon
          icon={faUserCircle}
          size="2x"
          onClick={handleProfileClick}
        />
        {!isCollapsed && (
          <>
            <ProfileTitle>{userData?.name}</ProfileTitle>
            <EditProfileIcon
              icon={faPencil}
              size="1x"
              onClick={() => navigate(`/profile/${userData?.uid}`)}
            />
          </>
        )}
      </ProfileContainer>
      <Spacer direction="vertical" amount="30px" />
      <TabContainer>
        {[
          {
            to: "/applications",
            icon: faFileCirclePlus,
            label: "Applications",
          },
          { to: "/projects", icon: faFolder, label: "Projects" },
          { to: "/experiences", icon: faBriefcase, label: "Experiences" },
          { to: "/resumes", icon: faFileLines, label: "Resumes" },
          { to: "/cover-letters", icon: faEnvelope, label: "Cover Letters" },
        ].map((tab) => (
          <StyledLink
            key={tab.to}
            theme={tabTheme}
            to={tab.to}
            className={isActive(tab.to) ? "active" : ""}
          >
            <NavbarIcon icon={tab.icon} size="lg" />
            {!isCollapsed && <NavSpan>{tab.label}</NavSpan>}
          </StyledLink>
        ))}
      </TabContainer>
      <Button
        text={
          <SignUpButtonText>
            <SignOutIcon icon={faArrowRightFromBracket} />
            <Spacer direction={"horizontal"} />
            {!isCollapsed && <NavSpan>Sign Out</NavSpan>}
          </SignUpButtonText>
        }
        theme="normal"
        callback={handleSignOut}
      />
      {!isResponsiveCollapse && (
        <CollapseIcon
          icon={isCollapsed ? faBars : faArrowLeft}
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}
    </SidebarContainer>
  );
};

export default SideBar;
