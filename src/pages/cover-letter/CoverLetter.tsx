import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoverLetterPageParams } from "./types";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import {
  ButtonContainer,
  ButtonTextConatiner,
  ContentContainer,
  CoverLetterContainer,
  InnerCoverLetterContainer,
} from "./styled";
import InputContainer from "../../components/input-container/InputContainer";
import FileContainer from "../../components/file-container/FileContainer";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { FileData } from "../../_types/fileData";
import { displayNotification } from "../../_utilities/notification-context";
import { validateCoverLetter } from "./helpers";
import { getCoverLetter } from "../../functions/coverLetter/getCoverLetter";
import { createCoverLetter } from "../../functions/coverLetter/createCoverLetter";
import { updateCoverLetter } from "../../functions/coverLetter/updateCoverLetter";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { FormErrorData } from "../../_types/FormErrorData";
import { CoverLetterData } from "../../_types/coverLetterData";
import { defaultCoverLetterData } from "../../_defaults/coverLetterData";
import Spacer from "../../components/spacer/Spacer";
import TextElement from "../../components/TextElement/TextElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

/**
 * Cover Letter page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <CoverLetter/>
 * ```
 */
const CoverLetter = (): JSX.Element => {
  const { id } = useParams<CoverLetterPageParams>();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrorData[]>([]);
  const [coverLetter, setCoverLetter] = useState<CoverLetterData>(
    defaultCoverLetterData
  );

  const handlePageReady = useCallback(async () => {
    if (id && id !== "new") {
      await getCoverLetter(id)
        .then((result) => {
          if (result.status === 200 && result.data) {
            setCoverLetter(result.data);
          } else {
            console.error("Failed to load cover letter:", result.message);
          }
        })
        .catch((error) => {
          console.error("Error while fetching cover letter", error);
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
        `${userData?.uid}/coverLetter-page/coverLetter/${file.name}`
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
      setCoverLetter((prev) => ({ ...prev, coverLetterFile: fileData }));
    },
    [userData?.uid]
  );

  const handleCoverLetter = useCallback(async () => {
    const validationErrors = validateCoverLetter(coverLetter);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const coverLetterData = {
      ...coverLetter,
      uid: userData?.uid ?? "",
    };

    if (id && id === "new") {
      const saveSuccess = await createCoverLetter(coverLetterData);
      if (saveSuccess) {
        displayNotification({
          title: "Successfully created cover letter",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    } else {
      const updatedResult = await updateCoverLetter(
        coverLetterData.id,
        coverLetterData
      );
      if (updatedResult) {
        displayNotification({
          title: "Successfully updated cover letter",
          type: "success",
          dismissAfter: 3500,
        });
        navigate(-1);
      } else {
        displayNotification({
          title: "Failed to update cover letter",
          type: "error",
          dismissAfter: 3500,
        });
        navigate(-1);
      }
    }
  }, [coverLetter, id, navigate, userData?.uid]);

  const handleDataChange = useCallback((attribute: string, newValue: any) => {
    setCoverLetter((prev) => ({ ...prev, [attribute]: newValue }));
  }, []);

  return (
    <PageContainer
      title={id === "new" ? "Add Cover Letter" : coverLetter.name}
      onPageReady={handlePageReady}
    >
      <CoverLetterContainer>
        <ContentContainer>
          <InnerCoverLetterContainer>
            <InputContainer
              title="Cover Letter Title"
              initialValue={coverLetter.name}
              value={coverLetter?.name}
              placeHolder={`${userData?.name} - Cover Letter`}
              type="text"
              onTextChange={(newValue) => handleDataChange("name", newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "name")?.message
              }
            />
          </InnerCoverLetterContainer>
          <InnerCoverLetterContainer>
            <FileContainer
              title="Cover Letter"
              initialValue={coverLetter.coverLetterFile}
              value={coverLetter.coverLetterFile}
              onChange={(newValue) => handleFileUpload(newValue)}
              isRequired={true}
              error={
                errors.find((error) => error.elementId === "coverLetterFile")
                  ?.message
              }
            />
          </InnerCoverLetterContainer>
        </ContentContainer>
      </CoverLetterContainer>
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
          callback={() => handleCoverLetter()}
        />
      </ButtonContainer>
    </PageContainer>
  );
};

export default CoverLetter;
