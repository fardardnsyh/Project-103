import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ExperienceData } from "../../_types/experienceData";

/**
 * Creating a new experience
 *
 * @param {Experience} experience - Experince to save
 * @returns {null}
 */
const createExperience = async (experience: ExperienceData) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "experiences"), experience);

    await updateDoc(doc(db, "experiences", docRef.id), {
      id: docRef.id,
    });

    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};

export { createExperience };
