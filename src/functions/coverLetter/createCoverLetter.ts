import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { CoverLetterData } from "../../_types/coverLetterData";

/**
 * Creating a cover letter
 *
 * @param {CoverLetter} coverLetter - Cover letter to save
 * @returns {null}
 */
const createCoverLetter = async (coverLetter: CoverLetterData) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "coverLetters"), coverLetter);

    await updateDoc(doc(db, "coverLetters", docRef.id), {
      id: docRef.id,
    });

    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};

export { createCoverLetter };
