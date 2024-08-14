import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { AuthProvider } from "./_utilities/auth-context/AuthContext";
import { ToastContainer } from "react-toastify";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AppContainer, MainContent } from "./globalStyled";
import SideBar from "./components/side-bar/SideBar";
import LandingPage from "./pages/landing-page/LandingPage";
import Applications from "./pages/applications/Applications";
import Application from "./pages/application/Application";
import Projects from "./pages/projects/Projects";
import Project from "./pages/project/Project";
import Experiences from "./pages/experiences/Experiences";
import Experience from "./pages/experience/Experience";
import Resumes from "./pages/resumes/Resumes";
import Resume from "./pages/reume/Resume";
import CoverLetter from "./pages/cover-letter/CoverLetter";
import CoverLetters from "./pages/cover-letters/CoverLetters";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <AppContainer>
          {isAuthenticated && <SideBar />}
          <MainContent>
            <Routes>
              <Route
                path="/"
                element={
                  !isAuthenticated ? (
                    <LandingPage />
                  ) : (
                    <Navigate to="/applications" />
                  )
                }
              />
              <Route
                path="/applications"
                element={
                  isAuthenticated ? <Applications /> : <Navigate to="/" />
                }
              />
              <Route path="/applications/:id" element={<Application />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/experiences/:id" element={<Experience />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/resumes/:id" element={<Resume />} />
              <Route path="/cover-letters/:id" element={<CoverLetter />} />
              <Route path="/cover-letters" element={<CoverLetters />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile/:id" element={<Profile />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
};

export default App;
