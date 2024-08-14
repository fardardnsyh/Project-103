import { FormErrorData } from "../../_types/FormErrorData";
import { ApplicationData } from "../../_types/applicationData";

/**
 * Validate the application page
 *
 * @param {ApplicationData} application - Application  to validate
 * @returns {FormError[]}
 */
const validateApplication = (application: ApplicationData): FormErrorData[] => {
  const errors = [];

  if (application.positionName === "") {
    errors.push({
      message: "Please enter position name",
      elementId: "positionName",
    });
  }

  if (application.source === "") {
    errors.push({
      message: "Please enter source",
      elementId: "source",
    });
  }

  if (application.resume === "") {
    errors.push({
      message: "Please upload a resume file",
      elementId: "resume",
    });
  }

  if (application.companyName === "") {
    errors.push({
      message: "Please enter company name",
      elementId: "companyName",
    });
  }

  if (application.applyDate === "") {
    errors.push({
      message: "Please enter application date",
      elementId: "applyDate",
    });
  }

  if (application.jobDescription === "") {
    errors.push({
      message: "Please enter job description",
      elementId: "jobDescription",
    });
  }

  return errors;
};

export { validateApplication };
