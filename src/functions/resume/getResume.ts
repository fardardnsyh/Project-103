import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ResumeData } from "../../_types/resumeData";

/**
 * Fetch a resume
 *
 * @param {string} id - ID of a resume to fetch
 * @returns {Promise<ApiResponse>}
 */
const getResume = async (id: string): Promise<ApiResponse<ResumeData>> => {
  const db = getFirestore();
  try {
    const query = doc(db, "resumes", id);
    const querySnapshot = await getDoc(query);

    if (querySnapshot.exists()) {
      const fetchedData: ResumeData = querySnapshot.data() as ResumeData;

      return {
        status: 200,
        data: fetchedData,
        message: "Successfully fetched resume",
      };
    } else {
      return {
        status: 404,
        data: null,
        message: "No such document exsits",
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: "Failed to get resume",
    };
  }
};

export { getResume };
