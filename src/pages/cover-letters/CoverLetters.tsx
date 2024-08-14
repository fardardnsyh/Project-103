import React, { useCallback, useState } from "react";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getCoverLetters } from "../../functions/coverLetter/getCoverLetters";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { CoverLetterData } from "../../_types/coverLetterData";
import { displayNotification } from "../../_utilities/notification-context";
import TextElement from "../../components/TextElement/TextElement";
import { ButtonContainer } from "./styled";
import { colours } from "../../_globals/theme";

/**
 * CoverLetters page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <CoverLetters/>
 * ```
 */
const CoverLetters = (): JSX.Element => {
  const navigate = useNavigate();
  const { userData, isLoading } = useAuth();
  const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>([]);

  // function when page loads up with created cover letters
  const handlePageReady = useCallback(() => {
    if (!isLoading && userData?.uid) {
      getCoverLetters()
        .then((result) => {
          if (result.status === 200 && result.data) {
            const filteredCoverLetters = result.data.filter(
              (coverLetter) => coverLetter.uid === userData?.uid
            );
            setCoverLetters(filteredCoverLetters);
          }
        })
        .catch((error) => {
          displayNotification({
            title: "Failed to fetch cover letters",
            type: "error",
            dismissAfter: 3500,
          });
          console.error(error);
        });
    }
  }, [isLoading, userData?.uid]);

  // function to navigate particular cover-letter to update or create
  const handleEditCoverLetter = useCallback(
    (id: string) => {
      navigate(`/cover-letters/${id}`);
    },
    [navigate]
  );

  return (
    <PageContainer
      title="CoverLetters"
      onPageReady={handlePageReady}
      customActions={
        <Button
          text={
            <ButtonContainer>
              <TextElement theme="paragraph-bold" text="Add new" />
              <FontAwesomeIcon icon={faChevronRight} size="1x" />
            </ButtonContainer>
          }
          theme="normal"
          callback={() => handleEditCoverLetter("new")}
        />
      }
    >
      {coverLetters.length === 0 ? (
        <TextElement
          theme="paragraph"
          text="No cover letters added yet"
          alignment="center"
          colour="black"
        />
      ) : (
        <Table
          key="Cover Letters"
          headers={[
            { key: "name", label: "Cover Letter Title" },
            { key: "coverLetterFile", label: "Cover Letter" },
            { key: "edit", label: "Edit" },
          ]}
          data={coverLetters.map((coverLetter) => ({
            ...coverLetter,
            coverLetterFile: coverLetter.coverLetterFile?.name ? (
              <TextElement
                theme="link"
                colour={colours.tabBackground}
                text={coverLetter.coverLetterFile.name}
                onClick={() =>
                  window.open(coverLetter?.coverLetterFile?.url, "_blank")
                }
              />
            ) : (
              "No Cover Letter"
            ),
            edit: (
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={{ cursor: "pointer" }}
              />
            ),
          }))}
          onEdit={handleEditCoverLetter}
        />
      )}
    </PageContainer>
  );
};

export default CoverLetters;
