import { FormState, UserData } from "../_types/userData";

const defaultUserData: UserData = {
  uid: "",
  email: "",
  name: "",
  linkedInLink: "",
  githubLink: "",
  portfolioLink: "",
  education: [],
  professionalPhotos: [],
  profilePhoto: null,
};

const defaultFormStateData: FormState = {
  email: "",
  password: "",
  name: "",
};

export { defaultFormStateData, defaultUserData };
