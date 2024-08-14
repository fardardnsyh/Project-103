import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ProjectData } from "../../_types/projectData";

/**
 * Creating a project
 *
 * @param {Project} project - Project to save
 * @returns {null}
 */
const createProject = async (project: ProjectData) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "projects"), project);

    await updateDoc(doc(db, "projects", docRef.id), {
      id: docRef.id,
    });

    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};

export { createProject };
