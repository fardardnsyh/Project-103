import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ResumeData } from "../../_types/resumeData";

/**
 * Fetch all resumes based on user Id
 *
 * @param {string} id - The user ID to filter resumes by
 * @returns {Promise<ApiResponse<ResumeData[]>>}
 */
const getUserResumes = async (
  id: string
): Promise<ApiResponse<ResumeData[]>> => {
  const db = getFirestore();
  try {
    const q = query(collection(db, "resumes"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    const fetchedData: ResumeData[] = querySnapshot.docs.map(
      (doc) => doc.data() as ResumeData
    );

    return {
      status: 200,
      data: fetchedData,
      message: "Successfully fetched resumes",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Failed to get resumes",
    };
  }
};

export { getUserResumes };
