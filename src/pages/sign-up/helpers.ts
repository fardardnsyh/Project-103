import { FormErrorData } from "../../_types/FormErrorData";
import { FormState } from "../../_types/userData";

const validateForm = (formAttribute: FormState): FormErrorData[] => {
  const errors = [];

  if (formAttribute.email === "") {
    errors.push({
      message: "Please enter email address",
      elementId: "email",
    });
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formAttribute.email)
  ) {
    errors.push({
      message: "Please enter proper email address",
      elementId: "email",
    });
  }

  if (formAttribute.name === "") {
    errors.push({
      message: "Please enter name",
      elementId: "name",
    });
  }

  if (formAttribute.password === "") {
    errors.push({
      message: "Please enter password",
      elementId: "password",
    });
  } else if (formAttribute.password.length < 8) {
    errors.push({
      message: "Please enter 8 character long password",
      elementId: "password",
    });
  }

  return errors;
};

export { validateForm };
