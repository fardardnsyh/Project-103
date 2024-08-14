import React, { useCallback, useState } from "react";
import PageContainer from "../../components/page-container/PageContainer";
import { ButtonContainer } from "./styled";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getResumes } from "../../functions/resume/getResumes";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { ResumeData } from "../../_types/resumeData";
import { displayNotification } from "../../_utilities/notification-context";
import TextElement from "../../components/TextElement/TextElement";
import { colours } from "../../_globals/theme";

/**
 * Resumes page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Resumes/>
 * ```
 */
const Resumes = (): JSX.Element => {
  const navigate = useNavigate();
  const { userData, isLoading } = useAuth();
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  // function when page loads up with created resumes
  const handlePageReady = useCallback(() => {
    if (!isLoading && userData?.uid) {
      getResumes()
        .then((result) => {
          if (result.status === 200 && result.data) {
            const filteredResumes = result.data.filter(
              (resume) => resume.uid === userData?.uid
            );
            setResumes(filteredResumes);
          }
        })
        .catch((error) => {
          displayNotification({
            title: "Failed to fetch resumes",
            type: "error",
            dismissAfter: 3500,
          });
          console.error(error);
        });
    }
  }, [isLoading, userData?.uid]);

  // function to navigate particular resume to update or create
  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/resumes/${id}`);
    },
    [navigate]
  );

  return (
    <PageContainer
      title="Resumes"
      onPageReady={handlePageReady}
      customActions={
        <Button
          theme="normal"
          text={
            <ButtonContainer>
              <TextElement theme="paragraph-bold" text="Add new" />
              <FontAwesomeIcon icon={faChevronRight} size="1x" />
            </ButtonContainer>
          }
          callback={() => handleEdit("new")}
        />
      }
    >
      {resumes.length === 0 ? (
        <TextElement
          theme="paragraph"
          text="No resumes added yet"
          alignment="center"
          colour="black"
        />
      ) : (
        <Table
          headers={[
            { key: "name", label: "Resume Title" },
            { key: "resumeFile", label: "Resume File" },
            { key: "edit", label: "Edit" },
          ]}
          data={resumes.map((resume) => ({
            ...resume,
            resumeFile: resume.resumeFile?.name ? (
              <TextElement
                theme="link"
                colour={colours.tabBackground}
                text={resume.resumeFile?.name}
                onClick={() => window.open(resume.resumeFile?.name, "_blank")}
              />
            ) : (
              "No resume"
            ),
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

export default Resumes;
