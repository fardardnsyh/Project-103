import { FormErrorData } from "../../_types/FormErrorData";
import { ExperienceData } from "../../_types/experienceData";

/**
 * Validate the experience page
 *
 * @param {ExperienceData} experience - Application  to validate
 * @returns {FormErrorData[]}
 */
const validateExperience = (experience: ExperienceData): FormErrorData[] => {
  const errors = [];

  if (experience.positionName === "") {
    errors.push({
      message: "Please enter position name",
      elementId: "positionName",
    });
  }

  if (experience.companyName === "") {
    errors.push({
      message: "Please enter company name",
      elementId: "companyName",
    });
  }

  if (experience.startTime === "") {
    errors.push({
      message: "Please enter start time",
      elementId: "startTime",
    });
  }

  if (experience.endTime === "") {
    errors.push({
      message: "Please enter end time",
      elementId: "endTime",
    });
  }

  if (experience.description === "") {
    errors.push({
      message: "Please enter description",
      elementId: "description",
    });
  }

  return errors;
};

export { validateExperience };
