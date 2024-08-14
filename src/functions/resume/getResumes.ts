import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ResumeData } from "../../_types/resumeData";

/**
 * Fetch all resumes
 *
 * @returns {Promise<ApiResponse>}
 */
const getResumes = async (): Promise<ApiResponse<ResumeData[]>> => {
  const db = getFirestore();
  try {
    const querySnapshot = await getDocs(collection(db, "resumes"));
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

export { getResumes };
