import { FormErrorData } from "../../_types/FormErrorData";
import { CoverLetterData } from "../../_types/coverLetterData";

/**
 * Validate the Cover letter page
 *
 * @param {CoverLetter} coverLetter - Cover letter to validate
 * @returns {FormError[]}
 */
const validateCoverLetter = (coverLetter: CoverLetterData): FormErrorData[] => {
  const errors = [];

  if (coverLetter.name === "") {
    errors.push({
      message: "Please enter resume title",
      elementId: "name",
    });
  }

  if (coverLetter.coverLetterFile === null) {
    errors.push({
      message: "Please upload file",
      elementId: "coverLetterFile",
    });
  }

  return errors;
};

export { validateCoverLetter };
