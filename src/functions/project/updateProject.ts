import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { ProjectData } from "../../_types/projectData";

/**
 * Update a project
 *
 * @param {string} id - ID of a project to update
 * @param {Project} project - Project to update
 * @returns {null}
 */
const updateProject = async (id: string, project: ProjectData) => {
  const db = getFirestore();
  try {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, project as { [key: string]: any });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

export { updateProject };
