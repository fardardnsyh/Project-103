import { FormErrorData } from "../../_types/FormErrorData";
import { ProjectData } from "../../_types/projectData";

/**
 * Validate the project page
 *
 * @param {Project} ProjectData - Project to validate
 * @returns {FormError[]}
 */
const validateProject = (project: ProjectData): FormErrorData[] => {
  const errors = [];

  if (project.name === "") {
    errors.push({
      message: "Please enter project name",
      elementId: "name",
    });
  }

  if (project.projectLink === "") {
    errors.push({
      message: "Please enter project link",
      elementId: "projectLink",
    });
  }

  if (project.startTime === "") {
    errors.push({
      message: "Please enter project starting time",
      elementId: "startTime",
    });
  }

  if (project.endTime === "") {
    errors.push({
      message: "Please enter project ending time",
      elementId: "endTime",
    });
  }

  if (project.description === "") {
    errors.push({
      message: "Please enter project description",
      elementId: "description",
    });
  }

  return errors;
};

export { validateProject };
