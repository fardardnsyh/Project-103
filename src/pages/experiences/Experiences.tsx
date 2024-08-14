import React, { useCallback, useState } from "react";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getExperiences } from "../../functions/experience/getExperiences";
import { ButtonContainer } from "./styled";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { ExperienceData } from "../../_types/experienceData";
import { displayNotification } from "../../_utilities/notification-context";
import TextElement from "../../components/TextElement/TextElement";

/**
 * Experiences Page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Experiences/>
 * ```
 */
const Experiences = (): JSX.Element => {
  const navigate = useNavigate();
  const { userData, isLoading } = useAuth();
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  // function when page loads up with created experiences
  const handlePageReady = useCallback(() => {
    if (!isLoading && userData?.uid) {
      getExperiences()
        .then((result) => {
          if (result.status === 200 && result.data) {
            const filteredExperiences = result.data.filter(
              (experience) => experience.uid === userData?.uid
            );
            setExperiences(filteredExperiences);
          }
        })
        .catch((error) => {
          displayNotification({
            title: "Failed to fetch applications",
            type: "error",
            dismissAfter: 3500,
          });
          console.error(error);
        });
    }
  }, [isLoading, userData?.uid]);

  // function to navigate particular experience to update or create
  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/experiences/${id}`);
    },
    [navigate]
  );

  return (
    <PageContainer
      title="Experiences"
      onPageReady={handlePageReady}
      customActions={
        <ButtonContainer>
          <Button
            text={
              <ButtonContainer>
                <TextElement theme="paragraph-bold" text="Add new" />
                <FontAwesomeIcon icon={faChevronRight} size="1x" />
              </ButtonContainer>
            }
            theme="normal"
            callback={() => handleEdit("new")}
          />
        </ButtonContainer>
      }
    >
      {experiences.length === 0 ? (
        <TextElement
          theme="paragraph"
          text="No experiences added yet"
          alignment="center"
          colour="black"
        />
      ) : (
        <Table
          key="Experiences"
          headers={[
            { key: "positionName", label: "Position Name" },
            { key: "companyName", label: "Company Name" },
            { key: "startTime", label: "Start Time" },
            { key: "endTime", label: "End Time" },
            { key: "jobType", label: "Job Type" },
            { key: "edit", label: "Edit" },
          ]}
          data={experiences.map((experience) => ({
            ...experience,
            edit: (
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={{ cursor: "pointer" }}
              />
            ),
          }))}
          onEdit={handleEdit}
        />
      )}
    </PageContainer>
  );
};

export default Experiences;
