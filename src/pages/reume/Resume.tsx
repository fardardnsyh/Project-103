import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResumePageParams } from "./types";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { FormErrorData } from "../../_types/FormErrorData";
import { ResumeData } from "../../_types/resumeData";
import { defaultResumeData } from "../../_defaults/resumeData";
import { getResume } from "../../functions/resume/getResume";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { FileData } from "../../_types/fileData";
import { validateResume } from "./helpers";
import { createResume } from "../../functions/resume/createResume";
import { displayNotification } from "../../_utilities/notification-context";
import { updateResume } from "../../functions/resume/updateResume";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import {
  ButtonContainer,
  ButtonTextConatiner,
  ContentContainer,
  InnerResumeContainer,
  ResumeContainer,
} from "./styled";
import InputContainer from "../../components/input-container/InputContainer";
import FileContainer from "../../components/file-container/FileContainer";
import Spacer from "../../components/spacer/Spacer";
import TextElement from "../../components/TextElement/TextElement";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Resume page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Resume/>
 * ```
 */
const Resume = () => {
  const { id } = useParams<ResumePageParams>();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrorData[]>([]);
  const [resume, setResume] = useState<ResumeData>(defaultResumeData);

  const handlePageReady = useCallback(async () => {
    if (id && id !== "new") {
      await getResume(id)
        .then((result) => {
          if (result.status === 200 && result.data) {
            setResume(result.data);
          } else {
            console.error("Failed to load resume:", result.message);
          }
        })
        .catch((error) => {
          console.error("Error while fetching resume", error);
        });
    } else {
      console.warn("No ID provided or operation not required for 'new'");
    }
  }, [id]);

  const handleFileUpload = useCallback(
    async (file: File) => {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `${userData?.uid}/resume-page/resume/${file.name}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const fileData: FileData = {
        name: file.name,
        url: url,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      };
      displayNotification({
        title: "File is uploading",
        type: "info",
        dismissAfter: 3500,
      });
      setResume((prev) => ({ ...prev, resumeFile: fileData }));
    },
    [userData?.uid]
  );

  const handleResumeSave = useCallback(async () => {
    const validationErrors = validateResume(resume);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const resumeData = {
      ...resume,
      uid: userData?.uid ?? "",
    };

    if (id && id === "new") {
      const saveSuccess = await createResume(resumeData);
      if (saveSuccess) {
        displayNotification({
          title: "Successfully created resume",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    } else {
      const updatedResult = await updateResume(resumeData.id, resumeData);
      if (updatedResult) {
        displayNotification({
          title: "Successfully updated resume",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      } else {
        displayNotification({
          title: "Failed to update resume",
          type: "error",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    }
  }, [id, navigate, resume, userData?.uid]);

  const handleDataChange = useCallback((attribute: string, newValue: any) => {
    setResume((prev) => ({ ...prev, [attribute]: newValue }));
  }, []);

  return (
    <PageContainer
      title={id === "new" ? "Add Resume" : resume.name}
      onPageReady={handlePageReady}
    >
      <ResumeContainer>
        <ContentContainer>
          <InnerResumeContainer>
            <InputContainer
              title="Resume Title"
              initialValue={resume.name}
              value={resume?.name}
              placeHolder={`${userData?.name} - WD`}
              type="text"
              onTextChange={(newValue) => handleDataChange("name", newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "name")?.message
              }
            />
          </InnerResumeContainer>
          <InnerResumeContainer>
            <FileContainer
              title="Resume File"
              initialValue={resume.resumeFile}
              value={resume.resumeFile}
              onChange={(newValue) => handleFileUpload(newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "resumeFile")
                  ?.message
              }
            />
          </InnerResumeContainer>
        </ContentContainer>
      </ResumeContainer>
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
          callback={() => handleResumeSave()}
        />
      </ButtonContainer>
    </PageContainer>
  );
};

export default Resume;
