import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { CoverLetterData } from "../../_types/coverLetterData";

/**
 * Fetch a Cover Letter
 *
 * @param {string} id - ID of a cover letter to fetch
 * @returns {Promise<ApiResponse>}
 */
const getCoverLetter = async (
  id: string
): Promise<ApiResponse<CoverLetterData>> => {
  const db = getFirestore();
  try {
    const query = doc(db, "coverLetters", id);
    const querySnapshot = await getDoc(query);

    if (querySnapshot.exists()) {
      const fetchedData: CoverLetterData =
        querySnapshot.data() as CoverLetterData;

      return {
        status: 200,
        data: fetchedData,
        message: "Successfully fetched cover letter",
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
      message: "Failed to get cover letters",
    };
  }
};

export { getCoverLetter };
