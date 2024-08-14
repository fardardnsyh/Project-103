import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ResumeData } from "../../_types/resumeData";

/**
 * Creating a resume
 *
 * @param {Resume} resume - Resume to save
 * @returns {null}
 */
const createResume = async (resume: ResumeData) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "resumes"), resume);

    await updateDoc(doc(db, "resumes", docRef.id), {
      id: docRef.id,
    });

    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};

export { createResume };
