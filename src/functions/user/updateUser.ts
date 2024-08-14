import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { UserData } from "../../_types/userData";

/**
 * Update user
 *
 * @param {string} id - ID of user to update
 * @param {UserData} userData - User to update
 * @returns {null}
 */
const updateUser = async (id: string, user: UserData) => {
  const db = getFirestore();
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, user as { [key: string]: any });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

export { updateUser };
