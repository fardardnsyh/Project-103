import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfilePageParams } from "./types";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { EducationData, UserData } from "../../_types/userData";
import { defaultUserData } from "../../_defaults/userData";
import { displayNotification } from "../../_utilities/notification-context";
import PageContainer from "../../components/page-container/PageContainer";
import {
  ButtonContainer,
  ButtonTextConatiner,
  ContentContainer,
  InnerProfileContainer,
  ProfileContainer,
  VerticalContainer,
} from "./styled";
import InputContainer from "../../components/input-container/InputContainer";
import Spacer from "../../components/spacer/Spacer";
import { getUser } from "../../functions/user/getUser";
import TextElement from "../../components/TextElement/TextElement";
import Button from "../../components/button/Button";
import { generateId } from "../../_utilities/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../functions/user/updateUser";

const Profile = () => {
  const { id } = useParams<ProfilePageParams>();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData>(defaultUserData);
  const [educations, setEducations] = useState<EducationData[]>([]);

  const handlePageReady = useCallback(async () => {
    if (id && userData?.uid && id === userData?.uid) {
      try {
        const result = await getUser(id);
        if (result.status === 200 && result.data) {
          setUser(result.data);
          console.log("Fetched education data:", result.data.education);
          setEducations(
            Array.isArray(result.data.education) ? result.data.education : []
          );
        } else {
          console.error("Failed to load profile:", result.message);
        }
      } catch (error) {
        console.error("Error while fetching profile", error);
      }
    } else {
      displayNotification({
        title: "Something went wrong",
        type: "error",
        dismissAfter: 3500,
      });
    }
  }, [id, userData?.uid]);

  const handleDataChange = useCallback((attribute: string, newValue: any) => {
    setUser((previous) => ({
      ...previous,
      [attribute]: newValue,
    }));
  }, []);

  // const handleFileUpload = async (files: File[], isSingle: boolean) => {
  //   try {
  //     const storage = getStorage();

  //     // Upload files
  //     const uploadPromises = files?.map(async (file) => {
  //       const storageRef = ref(
  //         storage,
  //         `${userData?.uid}/profile-photos/${file.name}`
  //       );
  //       await uploadBytes(storageRef, file);

  //       // Get the download URL of the uploaded image
  //       const url = await getDownloadURL(storageRef);

  //       return {
  //         name: file.name,
  //         url: url,
  //       };
  //     });

  //     const uploadedFiles = await Promise.all(uploadPromises);

  //     if (isSingle) {
  //       // Update user profile with the single image information
  //       setUser((prev) => ({
  //         ...prev,
  //         profilePhoto: uploadedFiles[0],
  //       }));
  //     } else {
  //       // Update user profile with multiple image information
  //       setUser((prev) => ({
  //         ...prev,
  //         professionalPhotos: [
  //           ...(prev.professionalPhotos || []),
  //           ...uploadedFiles,
  //         ],
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //   }
  // };

  const addEducation = useCallback(() => {
    setEducations([
      ...educations,
      {
        id: `edu-${generateId(15)}`,
        title: "",
        institutName: "",
        location: "",
        startTime: "",
        endTime: "",
      },
    ]);
  }, [educations]);

  const handleEducationChange = useCallback(
    (index: number, field: keyof EducationData, value: string) => {
      const updatedEducationEntries = educations?.map((entry, idx) => {
        if (idx === index) {
          return { ...entry, [field]: value };
        }
        return entry;
      });
      setEducations(updatedEducationEntries);
    },
    [educations]
  );

  const removeEducationEntry = useCallback(
    (index: number) => {
      setEducations(educations.filter((_, idx) => idx !== index));
    },
    [educations]
  );

  const handleProfileSave = useCallback(async () => {
    const profileData = {
      ...user,
      education: educations,
    };

    const updatedResult = await updateUser(user.uid, profileData);

    if (updatedResult) {
      displayNotification({
        title: "Successfully updated user",
        type: "success",
        dismissAfter: 3500,
      });
      navigate("/applications");
    } else {
      displayNotification({
        title: "Failed to update user",
        type: "error",
        dismissAfter: 3500,
      });
    }
  }, [educations, navigate, user]);

  const renderEducationForms = useMemo(() => {
    return educations?.map((entry, index) => (
      <VerticalContainer key={entry?.id}>
        <ContentContainer>
          <InnerProfileContainer>
            <InputContainer
              title="Degree or Course"
              initialValue={entry?.title}
              onTextChange={(newValue) =>
                handleEducationChange(index, "title", newValue)
              }
              placeHolder="Bachelor's of Technology"
            />
            <Spacer direction="vertical" amount="10px" />
            <InputContainer
              title="Institute Name"
              initialValue={entry?.institutName}
              onTextChange={(newValue) =>
                handleEducationChange(index, "institutName", newValue)
              }
              placeHolder="University of Waterloo"
            />
            <Spacer direction="vertical" amount="10px" />
            <InputContainer
              title="Location"
              initialValue={entry?.location}
              onTextChange={(newValue) =>
                handleEducationChange(index, "location", newValue)
              }
              placeHolder="Waterloo, Canada"
            />
          </InnerProfileContainer>
          <InnerProfileContainer>
            <InputContainer
              title="Start Time"
              type="month"
              initialValue={entry?.startTime}
              onTextChange={(newValue) =>
                handleEducationChange(index, "startTime", newValue)
              }
            />
            <Spacer direction="vertical" amount="10px" />
            <InputContainer
              title="End Time"
              type="month"
              initialValue={entry?.endTime}
              onTextChange={(newValue) =>
                handleEducationChange(index, "endTime", newValue)
              }
            />
          </InnerProfileContainer>
        </ContentContainer>
        <Button
          text="Remove"
          theme="normal"
          callback={() => removeEducationEntry(index)}
        />
      </VerticalContainer>
    ));
  }, [educations, handleEducationChange, removeEducationEntry]);

  return (
    <PageContainer title={user.name} onPageReady={handlePageReady}>
      <ProfileContainer>
        <TextElement
          theme="paragraph-bold"
          text="Profile Setting"
          colour="#9E9E9E"
        />
        <ContentContainer>
          <InnerProfileContainer>
            <InputContainer
              title="Name"
              initialValue={user?.name}
              value={user?.name}
              placeHolder="Perl Lad"
              type="text"
              onTextChange={(newValue) => handleDataChange("name", newValue)}
            />
            <Spacer direction="vertical" amount="10px" />
            <InputContainer
              title="LinkedIn Link"
              initialValue={user?.linkedInLink}
              value={user?.linkedInLink}
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("linkedInLink", newValue)
              }
            />
            <Spacer direction="vertical" amount="10px" />
            <InputContainer
              title="Portfolio Link"
              initialValue={user?.portfolioLink}
              value={user?.portfolioLink}
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("portfolioLink", newValue)
              }
            />
          </InnerProfileContainer>
          <InnerProfileContainer>
            <InputContainer
              title="Email"
              initialValue={user?.email}
              value={user?.email}
              placeHolder="perlplad@gmail.com"
              type="text"
              isDisabled={true}
            />
            <Spacer direction="vertical" amount="10px" />
            <InputContainer
              title="Github Link"
              initialValue={user?.githubLink}
              value={user?.githubLink}
              type="text"
              onTextChange={(newValue) =>
                handleDataChange("githubLink", newValue)
              }
            />
            {/* <Spacer direction="vertical" amount="10px" />
            <ImageUploadContainer
              title="Profile Photo"
              maxImages={1}
              initialData={user.profilePhoto ? [user.profilePhoto] : []}
              onFilesChange={(newValue) =>
                handleFileUpload(
                  newValue?.map((fileObj) => fileObj),
                  true
                )
              }
            /> */}
          </InnerProfileContainer>
        </ContentContainer>
        <TextElement theme="paragraph-bold" text="Education" colour="#9E9E9E" />
        {renderEducationForms}
        <Spacer direction="vertical" amount="10px" />
        <Button
          text="Add Education"
          theme="dark"
          callback={() => addEducation()}
        />
        {/* <Spacer direction="vertical" amount="20px" />
        <ImageUploadContainer
          title="Professional Photos"
          maxImages={10}
          initialData={user.professionalPhotos || []}
          onFilesChange={(newFiles) =>
            handleFileUpload(
              newFiles?.map((fileObj) => fileObj),
              false
            )
          }
        />

        <Spacer direction="vertical" /> */}
      </ProfileContainer>
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
              <TextElement theme="paragraph-bold" text="Update" />
              <FontAwesomeIcon icon={faCirclePlus} size="lg" />
            </ButtonTextConatiner>
          }
          theme="normal"
          callback={() => handleProfileSave()}
        />
      </ButtonContainer>
    </PageContainer>
  );
};

export default Profile;
