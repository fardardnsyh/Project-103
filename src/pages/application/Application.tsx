import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApplicationPageParams } from "./types";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import {
  ApplicationContainer,
  ButtonContainer,
  ButtonTextConatiner,
  ContentContainer,
  InnerApplicationContainer,
} from "./styled";
import { createApplication } from "../../functions/application/createApplication";
import { displayNotification } from "../../_utilities/notification-context";
import { getApplication } from "../../functions/application/getApplication";
import { updateApplication } from "../../functions/application/updateApplication";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { FormErrorData } from "../../_types/FormErrorData";
import { ApplicationData } from "../../_types/applicationData";
import { defaultApplicationData } from "../../_defaults/applicationData";
import { DropdownData } from "../../components/dropdown-input/types";
import { validateApplication } from "./helpers";
import InputContainer from "../../components/input-container/InputContainer";
import Spacer from "../../components/spacer/Spacer";
import DropdownInput from "../../components/dropdown-input/DropdownInput";
import TextElement from "../../components/TextElement/TextElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getUserResumes } from "../../functions/resume/getUserResumes";
import { getUserCoverLetters } from "../../functions/coverLetter/getUserCoverLetters";

/**
 * Application page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Application/>
 * ```
 */
const Application = (): JSX.Element => {
  const { id } = useParams<ApplicationPageParams>();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrorData[]>([]);
  const [application, setApplication] = useState<ApplicationData>(
    defaultApplicationData
  );
  const [resumes, setResumes] = useState<DropdownData[]>([]);
  const [coverLetters, setCoverLetters] = useState<DropdownData[]>([]);

  const statusOptions: DropdownData[] = [
    {
      displayValue: "Applied",
      id: "applied",
    },
    { displayValue: "Not Selected", id: "not-selected" },
    { displayValue: "In Process", id: "in-process" },
    { displayValue: "Follow-Up", id: "follow-up" },
  ];

  const handlePageReady = useCallback(async () => {
    if (id && id !== "new") {
      await getApplication(id)
        .then(async (result) => {
          if (result.status === 200 && result.data) {
            setApplication(result.data);
          } else {
            console.error("Failed to load application:", result.message);
          }
        })
        .catch((error) => {
          console.error("Error while fetching application", error);
        });
    } else {
      console.warn("No ID provided or operation not required for 'new'");
    }
    const resumeResult = await getUserResumes(userData?.uid as string);
    if (resumeResult.status === 200 && resumeResult.data) {
      setResumes(
        resumeResult.data.map((resumeD) => ({
          displayValue: resumeD.name,
          id: resumeD.id,
        }))
      );
    }

    const coverLetterResult = await getUserCoverLetters(
      userData?.uid as string
    );
    if (coverLetterResult.status === 200 && coverLetterResult.data) {
      setCoverLetters(
        coverLetterResult.data.map((coverL) => ({
          displayValue: coverL.name,
          id: coverL.id,
        }))
      );
    }
  }, [id, userData?.uid]);

  const handleApplicationSave = useCallback(async () => {
    const validationErrors = validateApplication(application);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const applicationData = {
      ...application,
      uid: userData?.uid ?? "",
    };

    if (id && id === "new") {
      const saveSuccess = await createApplication(applicationData);
      if (saveSuccess) {
        displayNotification({
          title: "Successfully created application",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    } else {
      const updatedResult = await updateApplication(
        applicationData.id,
        applicationData
      );
      if (updatedResult) {
        displayNotification({
          title: "Successfully updated application",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      } else {
        displayNotification({
          title: "Failed to update application",
          type: "error",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    }
  }, [application, id, navigate, userData?.uid]);

  const handleDataChange = useCallback((attribute: string, newValue: any) => {
    setApplication((prev) => ({ ...prev, [attribute]: newValue }));
  }, []);

  return (
    <PageContainer
      title={id === "new" ? "Add Application" : application.positionName}
      onPageReady={handlePageReady}
    >
      <ApplicationContainer>
        <ContentContainer>
          <InnerApplicationContainer>
            <InputContainer
              title="Position Name"
              initialValue={application.positionName}
              value={application?.positionName}
              placeHolder="Web Developer"
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
              title="Source"
              initialValue={application.source}
              value={application.source}
              placeHolder="Indeed"
              type="text"
              onTextChange={(newValue) => handleDataChange("source", newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "source")?.message
              }
            />
            <Spacer direction={"vertical"} amount="10px" />
            <InputContainer
              title="Location"
              initialValue={application.location}
              placeHolder="Kitchener"
              value={application.location}
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("location", newValue)
              }
            />
            <Spacer direction={"vertical"} amount="10px" />
            <DropdownInput
              title="Resume"
              data={resumes}
              onChange={(newValue) => handleDataChange("resume", newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "resume")?.message
              }
            />
            <Spacer direction={"vertical"} amount="10px" />
            <InputContainer
              title="Company Email"
              initialValue={application.companyEmail}
              placeHolder="hr@gmail.com"
              value={application.companyEmail}
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("companyEmail", newValue)
              }
            />
          </InnerApplicationContainer>
          <InnerApplicationContainer>
            <InputContainer
              title="Company Name"
              initialValue={application.companyName}
              value={application.companyName}
              placeHolder="Google"
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("companyName", newValue)
              }
              isRequired={true}
            />
            <Spacer direction={"vertical"} amount="10px" />
            <InputContainer
              title="Application Date"
              initialValue={application.applyDate}
              value={application.applyDate}
              placeHolder="12/01/2024"
              type="date"
              onTextChange={(newValue) =>
                handleDataChange("applyDate", newValue)
              }
              isRequired={true}
            />
            <Spacer direction={"vertical"} amount="10px" />
            <DropdownInput
              onChange={(newValue) => handleDataChange("status", newValue)}
              data={statusOptions}
              initialValue={application.status}
              title="Status"
            />
            <Spacer direction={"vertical"} amount="10px" />
            <DropdownInput
              title="Cover Letter"
              data={coverLetters}
              onChange={(newValue) => handleDataChange("coverLetter", newValue)}
            />
          </InnerApplicationContainer>
        </ContentContainer>
        <InputContainer
          title="Position Description"
          value={application.jobDescription}
          initialValue={application.jobDescription}
          placeHolder="Applied"
          type="text"
          numberOfLines={5}
          onTextChange={(newValue) =>
            handleDataChange("jobDescription", newValue)
          }
          isRequired={true}
        />
      </ApplicationContainer>
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
          callback={() => handleApplicationSave()}
        />
      </ButtonContainer>
    </PageContainer>
  );
};

export default Application;
