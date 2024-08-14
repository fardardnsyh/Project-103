import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ApplicationData } from "../../_types/applicationData";

/**
 * Creating a new application
 *
 * @param {ApplicationData} - applicationdata - Application to save
 * @returns {null}
 */
const createApplication = async (applicationData: ApplicationData) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(
      collection(db, "applications"),
      applicationData
    );

    await updateDoc(doc(db, "applications", docRef.id), {
      id: docRef.id,
    });

    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};

export { createApplication };
