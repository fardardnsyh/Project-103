import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { CoverLetterData } from "../../_types/coverLetterData";

/**
 * Update a cover letter
 *
 * @param {string} id - ID of a cover letter to update
 * @param {CoverLetter} coverLetter - Cover letter to update
 * @returns {null}
 */
const updateCoverLetter = async (id: string, coverLetter: CoverLetterData) => {
  const db = getFirestore();
  try {
    const docRef = doc(db, "coverLetters", id);
    await updateDoc(docRef, coverLetter as { [key: string]: any });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

export { updateCoverLetter };
