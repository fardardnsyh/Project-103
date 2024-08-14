import React, { useCallback, useState } from "react";
import PageContainer from "../../components/page-container/PageContainer";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getProjects } from "../../functions/project/getProjects";
import { ButtonContainer } from "./styled";
import { useAuth } from "../../_utilities/auth-context/AuthContext";
import { ProjectData } from "../../_types/projectData";
import { displayNotification } from "../../_utilities/notification-context";
import TextElement from "../../components/TextElement/TextElement";
import { colours } from "../../_globals/theme";

const Projects = (): JSX.Element => {
  const navigate = useNavigate();
  const { userData, isLoading } = useAuth();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  // function when page loads up with created projects
  const handlePageReady = useCallback(() => {
    if (!isLoading && userData?.uid) {
      getProjects()
        .then((result) => {
          if (result.status === 200 && result.data) {
            const filteredProjects = result.data.filter(
              (project) => project.uid === userData?.uid
            );
            setProjects(filteredProjects);
          }
        })
        .catch((error) => {
          displayNotification({
            title: "Failed to fetch projects",
            type: "error",
            dismissAfter: 3500,
          });
          console.error(error);
        });
    }
  }, [isLoading, userData?.uid]);

  // function to navigate particular project to update or create
  const handleEditProject = useCallback(
    (id: string) => {
      navigate(`/projects/${id}`);
    },
    [navigate]
  );

  return (
    <PageContainer
      title="Projects"
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
            callback={() => handleEditProject("new")}
          />
        </ButtonContainer>
      }
    >
      {projects.length === 0 ? (
        <TextElement
          theme="paragraph"
          text="No projects added yet"
          alignment="center"
          colour="black"
        />
      ) : (
        <Table
          headers={[
            { key: "name", label: "Project Name" },
            { key: "startTime", label: "Start Time" },
            { key: "endTime", label: "End Time" },
            { key: "projectLink", label: "Project Link" },
            { key: "edit", label: "Edit" },
          ]}
          data={projects.map((project) => ({
            ...project,
            projectLink: project.projectLink ? (
              <TextElement
                theme="link"
                colour={colours.tabBackground}
                text="Link"
                onClick={() => window.open(project.projectLink, "_blank")}
              />
            ) : (
              "No Link"
            ),
            edit: (
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={{ cursor: "pointer" }}
              />
            ),
          }))}
          onEdit={handleEditProject}
        />
      )}
    </PageContainer>
  );
};

export default Projects;
