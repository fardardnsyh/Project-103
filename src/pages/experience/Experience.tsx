import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import InputContainer from "../../components/input-container/InputContainer";
import { displayNotification } from "../../_utilities/notification-context";
import { validateExperience } from "./helpers";
import { ExperiencePageParams } from "./types";
import {
  ButtonContainer,
  ButtonTextConatiner,
  ContentContainer,
  ExperienceContainer,
  InnerExperienceContainer,
} from "./styled";
import { getExperience } from "../../functions/experience/getExperience";
import { createExperience } from "../../functions/experience/createExperience";
import { updateExperience } from "../../functions/experience/updateExperience";
import { DropdownData } from "../../components/dropdown-input/types";
import DropdownInput from "../../components/dropdown-input/DropdownInput";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { FormErrorData } from "../../_types/FormErrorData";
import { ExperienceData } from "../../_types/experienceData";
import { defaultExperienceData } from "../../_defaults/experienceData";
import Spacer from "../../components/spacer/Spacer";
import TextElement from "../../components/TextElement/TextElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

/**
 * Experience Page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Experience/>
 * ```
 */
const Experience = (): JSX.Element => {
  const { id } = useParams<ExperiencePageParams>();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [errors, setErrors] = useState<FormErrorData[]>([]);
  const [experience, setExperience] = useState<ExperienceData>(
    defaultExperienceData
  );

  const jobTypeOptions: DropdownData[] = [
    {
      displayValue: "Part Time",
      id: "part-time",
    },
    { displayValue: "Full Time", id: "full-time" },
  ];

  const handlePageReady = useCallback(async () => {
    if (id && id !== "new") {
      await getExperience(id)
        .then((result) => {
          if (result.status === 200 && result.data) {
            setExperience(result.data);
          } else {
            console.error("Failed to load experience:", result.message);
          }
        })
        .catch((error) => {
          console.error("Error while fetching experience", error);
        });
    } else {
      console.warn("No ID provided or operation not required for 'new'");
    }
  }, [id]);

  const handleExperienceSave = useCallback(async () => {
    const validationErrors = validateExperience(experience);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const experienceData = {
      ...experience,
      uid: userData?.uid ?? "",
    };

    if (id && id === "new") {
      const saveSuccess = await createExperience(experienceData);
      if (saveSuccess) {
        displayNotification({
          title: "Successfully created experience",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    } else {
      const updatedResult = await updateExperience(
        experienceData.id,
        experienceData
      );
      if (updatedResult) {
        displayNotification({
          title: "Successfully updated experience",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      } else {
        displayNotification({
          title: "Failed to update experience",
          type: "error",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    }
  }, [experience, id, navigate, userData?.uid]);

  const handleDataChange = useCallback((attribute: string, newValue: any) => {
    setExperience((prev) => ({ ...prev, [attribute]: newValue }));
  }, []);

  return (
    <PageContainer
      title={id === "new" ? "Add Experience" : experience.positionName}
      customActions={
        <>
          <Button text="Cancel" theme="normal" callback={() => navigate(-1)} />
          <Button
            text={id === "new" ? "Create" : "Save"}
            theme="normal"
            callback={() => handleExperienceSave()}
          />
        </>
      }
      onPageReady={handlePageReady}
    >
      <ExperienceContainer>
        <ContentContainer>
          <InnerExperienceContainer>
            <InputContainer
              title="Position Name"
              initialValue={experience.positionName}
              value={experience?.positionName}
              placeHolder="Full Stack Developer"
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("positionName", newValue)
              }
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "positionName")
                  ?.message
              }
            />
            <Spacer direction={"vertical"} amount="10px" />
            <InputContainer
              title="Company Name"
              initialValue={experience.companyName}
              value={experience.companyName}
              placeHolder="Northern Devs"
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("companyName", newValue)
              }
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "companyName")
                  ?.message
              }
            />
            <Spacer direction={"vertical"} amount="10px" />
            <DropdownInput
              onChange={(newValue) => handleDataChange("jobType", newValue)}
              data={jobTypeOptions}
              initialValue={experience.jobType}
              title="Job Type"
            />
          </InnerExperienceContainer>
          <InnerExperienceContainer>
            <InputContainer
              title="Start Time"
              initialValue={experience.startTime}
              value={experience.startTime}
              placeHolder="12/2023"
              type="month"
              onTextChange={(newValue) =>
                handleDataChange("startTime", newValue)
              }
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "startTime")?.message
              }
            />
            <Spacer direction={"vertical"} amount="10px" />
            <InputContainer
              title="End Time"
              initialValue={experience.endTime}
              value={experience.endTime}
              placeHolder="01/2024"
              type="month"
              onTextChange={(newValue) => handleDataChange("endTime", newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "endTime")?.message
              }
            />
          </InnerExperienceContainer>
        </ContentContainer>
        <Spacer direction={"vertical"} amount="10px" />
        <InputContainer
          title="Description"
          value={experience.description}
          initialValue={experience.description}
          placeHolder="Applied"
          type="text"
          numberOfLines={5}
          onTextChange={(newValue) => handleDataChange("description", newValue)}
          isRequired={true}
          error={
            errors.find((error) => error.elementId === "description")?.message
          }
        />
      </ExperienceContainer>
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
          callback={() => handleExperienceSave()}
        />
      </ButtonContainer>
    </PageContainer>
  );
};

export default Experience;
