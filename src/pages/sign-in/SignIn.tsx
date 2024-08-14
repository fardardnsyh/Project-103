import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { displayNotification } from "../../_utilities/notification-context";
import {
  BackButton,
  BottomParagraph,
  Form,
  FormContainer,
  Input,
  Logo,
  SignInContainer,
  SubmitButton,
} from "./styled";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import logo from "../../_assets/logo.png";
import TextElement from "../../components/TextElement/TextElement";
import Spacer from "../../components/spacer/Spacer";

/**
 * Sign In Page
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <SignIn/>
 * ```
 */
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function to handle sign in

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/applications");
    } catch (error) {
      displayNotification({
        title: "Invaild email or password",
        type: "error",
        dismissAfter: 3500,
      });
      console.error(error);
    }
  };
  return (
    <SignInContainer>
      <BackButton icon={faLeftLong} onClick={() => navigate(-1)} />
      <FormContainer>
        <Logo src={logo} alt="Application Tracker" />
        <TextElement
          theme="h1"
          text="Sign In to Application Tracker"
          alignment="center"
          padding="15px"
        />
        <Form onSubmit={handleSignIn}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <SubmitButton type="submit">Sign In</SubmitButton>
        </Form>
        <BottomParagraph>
          <TextElement theme="paragraph" text="Haven't try?" />
          <Spacer direction="horizontal" amount="2px" />
          <TextElement
            theme="link"
            text="Sign Up"
            colour="#241751"
            onClick={() => navigate("/sign-up")}
          />
        </BottomParagraph>
      </FormContainer>
    </SignInContainer>
  );
};

export default SignIn;
