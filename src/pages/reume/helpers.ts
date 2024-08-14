import { FormErrorData } from "../../_types/FormErrorData";
import { ResumeData } from "../../_types/resumeData";

const validateResume = (resume: ResumeData): FormErrorData[] => {
  const errors = [];

  if (resume.name === "") {
    errors.push({
      message: "Please enter resume title",
      elementId: "name",
    });
  }

  if (resume.resumeFile === null) {
    errors.push({
      message: "Please upload file",
      elementId: "resumeFile",
    });
  }

  return errors;
};

export { validateResume };
