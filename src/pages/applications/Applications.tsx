import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { ApplicationData } from "../../_types/applicationData";
import { getApplications } from "../../functions/application/getApplications";
import { displayNotification } from "../../_utilities/notification-context";
import PageContainer from "../../components/page-container/PageContainer";
import TextElement from "../../components/TextElement/TextElement";
import Table from "../../components/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/Button";
import { ButtonContainer } from "./styled";

/**
 * Applications page
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Applications/>
 * ```
 */
const Applications = () => {
  const navigate = useNavigate();
  const { userData, isLoading } = useAuth();
  const [applications, setApplications] = useState<ApplicationData[]>([]);

  // function when page loads up with created applications
  const handlePageReady = useCallback(() => {
    if (userData?.uid) {
      getApplications()
        .then((result) => {
          if (result.status === 200 && result.data) {
            const filteredApplications = result.data.filter(
              (application) => application.uid === userData?.uid
            );
            setApplications(filteredApplications);
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
  }, [userData?.uid]);

  // function to navigate particular application to update or create
  const handleEditApplication = useCallback(
    (id: string) => {
      navigate(`/applications/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (!isLoading) {
      handlePageReady();
    }
  }, [isLoading, handlePageReady]);

  return (
    <PageContainer
      title="Applications"
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
          callback={() => handleEditApplication("new")}
        />
      }
    >
      {applications.length === 0 ? (
        <TextElement
          theme="paragraph"
          text="No applications added yet"
          alignment="center"
          colour="black"
        />
      ) : (
        <Table
          key="Applications"
          headers={[
            { key: "positionName", label: "Position Name" },
            { key: "companyName", label: "Company Name" },
            { key: "location", label: "Location" },
            { key: "status", label: "Status" },
            { key: "edit", label: "Edit" },
          ]}
          data={applications.map((application) => ({
            ...application,
            status: (
              <TextElement
                theme="paragraph"
                text={application.status}
                colour={application.status === "not-selected" ? "red" : "black"}
              />
            ),
            edit: (
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={{ cursor: "pointer" }}
              />
            ),
          }))}
          onEdit={handleEditApplication}
        />
      )}
    </PageContainer>
  );
};

export default Applications;
