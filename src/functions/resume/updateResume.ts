import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { ResumeData } from "../../_types/resumeData";

/**
 * Update a resume
 *
 * @param {string} id - ID of a resume to update
 * @param {Resume} resume - Resume to update
 * @returns {null}
 */
const updateResume = async (id: string, resume: ResumeData) => {
  const db = getFirestore();
  try {
    const docRef = doc(db, "resumes", id);
    await updateDoc(docRef, resume as { [key: string]: any });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

export { updateResume };
