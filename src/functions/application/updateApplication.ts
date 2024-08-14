import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { ApplicationData } from "../../_types/applicationData";

/**
 * Update an application
 *
 * @param {string} id - ID of application to update
 * @param {ApplicationData} applicationData - Application to update
 * @returns {null}
 */
const updateApplication = async (
  id: string,
  applicationData: ApplicationData
) => {
  const db = getFirestore();
  try {
    const docRef = doc(db, "applications", id);
    await updateDoc(docRef, applicationData as { [key: string]: any });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

export { updateApplication };
