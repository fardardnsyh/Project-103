import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { CoverLetterData } from "../../_types/coverLetterData";

/**
 * Fetch all resumes based on user Id
 *
 * @param {string} id - The user ID to filter resumes by
 * @returns {Promise<ApiResponse<CoverLetterData[]>>}
 */
const getUserCoverLetters = async (
  id: string
): Promise<ApiResponse<CoverLetterData[]>> => {
  const db = getFirestore();
  try {
    const q = query(collection(db, "coverLetters"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    const fetchedData: CoverLetterData[] = querySnapshot.docs.map(
      (doc) => doc.data() as CoverLetterData
    );

    return {
      status: 200,
      data: fetchedData,
      message: "Successfully fetched cover letters",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Failed to get cover letters",
    };
  }
};

export { getUserCoverLetters };
