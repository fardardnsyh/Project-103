import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormErrorData } from "../../_types/FormErrorData";
import { defaultFormStateData } from "../../_defaults/userData";
import { validateForm } from "./helpers";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
  BackButton,
  BottomParagraph,
  ErrorContainer,
  Form,
  FormContainer,
  FormInputContainer,
  Input,
  Logo,
  SignUpContainer,
  SubmitButton,
} from "./styled";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import logo from "../../_assets/logo.png";
import TextElement from "../../components/TextElement/TextElement";
import Spacer from "../../components/spacer/Spacer";

/**
 * Signup
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Signup />
 * ```
 */
const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrorData[]>([]);
  const [formState, setFormState] = useState(defaultFormStateData);

  // Function for data change value
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setErrors(errors.filter((error) => error.elementId !== e.target.name));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateErrors = validateForm(formState);

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const { email, password, name } = formState;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user && name) {
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: name,
          createdAt: new Date(),
          linkedInLink: "",
          githubLink: "",
          portfolioLink: "",
          education: [],
          professionalPhotos: [],
          profilePhoto: null,
        });
        navigate("/applications");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignUpContainer>
      <BackButton icon={faLeftLong} onClick={() => navigate(-1)} />
      <FormContainer>
        <Logo src={logo} alt="Application Tracker" />
        <TextElement
          theme="h1"
          text="Sign Up to Application Tracker"
          alignment="center"
          padding="15px"
        />
        <Form onSubmit={handleSignUp}>
          <FormInputContainer>
            <Input
              type="text"
              name="name"
              value={formState.name || ""}
              onChange={handleDataChange}
              placeholder="Full Name"
            />
            {errors
              .filter((error) => error.elementId === "name")
              .map((error, index) => (
                <ErrorContainer key={index}>{error.message}</ErrorContainer>
              ))}
          </FormInputContainer>
          <FormInputContainer>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleDataChange}
              placeholder="Email"
            />
            {errors
              .filter((error) => error.elementId === "email")
              .map((error, index) => (
                <ErrorContainer key={index}>{error.message}</ErrorContainer>
              ))}
          </FormInputContainer>
          <FormInputContainer>
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleDataChange}
              placeholder="Password"
            />
            {errors
              .filter((error) => error.elementId === "password")
              .map((error, index) => (
                <ErrorContainer key={index}>{error.message}</ErrorContainer>
              ))}
          </FormInputContainer>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Form>
        <BottomParagraph>
          <TextElement theme="paragraph" text="Already have a user!!" />
          <Spacer direction="horizontal" amount="5px" />
          <TextElement
            theme="link"
            text="Sign In"
            colour="#241751"
            onClick={() => navigate("/sign-in")}
          />
        </BottomParagraph>
      </FormContainer>
    </SignUpContainer>
  );
};

export default SignUp;
