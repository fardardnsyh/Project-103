import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import InputContainer from "../../components/input-container/InputContainer";
import { displayNotification } from "../../_utilities/notification-context";
import { getProject } from "../../functions/project/getProject";
import { validateProject } from "./helpers";
import { createProject } from "../../functions/project/createProject";
import { updateProject } from "../../functions/project/updateProject";
import { ProjectPageParams } from "./types";
import {
  ButtonContainer,
  ButtonTextConatiner,
  ContentContainer,
  InnerProjectContainer,
  ProjectContainer,
} from "./styled";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { FormErrorData } from "../../_types/FormErrorData";
import { ProjectData } from "../../_types/projectData";
import { defaultProjectData } from "../../_defaults/projectData";
import Spacer from "../../components/spacer/Spacer";
import TextElement from "../../components/TextElement/TextElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Project = (): JSX.Element => {
  const { id } = useParams<ProjectPageParams>();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [errors, setErrors] = useState<FormErrorData[]>([]);
  const [project, setProject] = useState<ProjectData>(defaultProjectData);

  const handlePageReady = useCallback(async () => {
    if (id && id !== "new") {
      await getProject(id)
        .then((result) => {
          if (result.status === 200 && result.data) {
            setProject(result.data);
          } else {
            console.error("Failed to load project:", result.message);
          }
        })
        .catch((error) => {
          console.error("Error while fetching project", error);
        });
    } else {
      console.warn("No ID provided or operation not required for 'new'");
    }
  }, [id]);

  const handleProjectSave = useCallback(async () => {
    const validationErrors = validateProject(project);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const projectData = {
      ...project,
      uid: userData?.uid ?? "",
    };

    if (id && id === "new") {
      const saveSuccess = await createProject(projectData);
      if (saveSuccess) {
        displayNotification({
          title: "Successfully created project",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    } else {
      const updatedResult = await updateProject(projectData.id, projectData);
      if (updatedResult) {
        displayNotification({
          title: "Successfully updated project",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    }
  }, [id, navigate, project, userData?.uid]);

  const handleDataChange = useCallback((attribute: string, newValue: any) => {
    setProject((prev) => ({ ...prev, [attribute]: newValue }));
  }, []);

  return (
    <PageContainer
      title={id === "new" ? "Add Project" : project.name}
      onPageReady={handlePageReady}
    >
      <ProjectContainer>
        <ContentContainer>
          <InnerProjectContainer>
            <InputContainer
              title="Project Name"
              initialValue={project.name}
              value={project?.name}
              placeHolder="Application Tracker"
              type="text"
              onTextChange={(newValue) => handleDataChange("name", newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "name")?.message
              }
            />
            <Spacer direction={"vertical"} amount="10px" />
            <InputContainer
              title="Project Link"
              initialValue={project.projectLink}
              value={project.projectLink}
              placeHolder="https://github.com/applicationTracker"
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("projectLink", newValue)
              }
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "projectLink")
                  ?.message
              }
            />
          </InnerProjectContainer>
          <InnerProjectContainer>
            <InputContainer
              title="Start Time"
              initialValue={project.startTime}
              value={project.startTime}
              placeHolder="12/2023"
              type="month"
              onTextChange={(newValue) =>
                handleDataChange("startTime", newValue)
              }
              isRequired={true}
            />
            <Spacer direction={"vertical"} amount="10px" />
            <InputContainer
              title="End Time"
              initialValue={project.endTime}
              value={project.endTime}
              placeHolder="01/2024"
              type="month"
              onTextChange={(newValue) => handleDataChange("endTime", newValue)}
              isRequired={true}
            />
          </InnerProjectContainer>
        </ContentContainer>
        <Spacer direction={"vertical"} amount="10px" />
        <InputContainer
          title="Project Description"
          value={project.description}
          initialValue={project.description}
          placeHolder="Applied"
          type="text"
          numberOfLines={5}
          onTextChange={(newValue) => handleDataChange("description", newValue)}
          isRequired={true}
        />
      </ProjectContainer>
      <Spacer direction="vertical" />
      <ButtonContainer>
        <Button
          text={
            <ButtonTextConatiner>
              <TextElement theme="paragraph-bold" text="Cancel" />
              <FontAwesomeIcon icon={faCircleXmark} size="lg" />
            </ButtonTextConatiner>
          }
          theme="normal"
          callback={() => navigate(-1)}
        />
        <Button
          text={
            <ButtonTextConatiner>
              <TextElement
                theme="paragraph-bold"
                text={id === "new" ? "Create" : "Update"}
              />
              <FontAwesomeIcon icon={faCirclePlus} size="lg" />
            </ButtonTextConatiner>
          }
          theme="normal"
          callback={() => handleProjectSave()}
        />
      </ButtonContainer>
    </PageContainer>
  );
};

export default Project;
