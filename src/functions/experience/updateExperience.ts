import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { ExperienceData } from "../../_types/experienceData";

/**
 * Update an experience
 *
 * @param {string} id - ID of an experience to update
 * @param {Experience} experience - Experience to update
 * @returns {null}
 */
const updateExperience = async (id: string, experience: ExperienceData) => {
  const db = getFirestore();
  try {
    const docRef = doc(db, "experiences", id);
    await updateDoc(docRef, experience as { [key: string]: any });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

export { updateExperience };
