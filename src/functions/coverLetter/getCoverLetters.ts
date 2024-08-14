import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { CoverLetterData } from "../../_types/coverLetterData";

/**
 * Fetch all cover letters
 *
 * @returns {Promise<ApiResponse>}
 */
const getCoverLetters = async (): Promise<ApiResponse<CoverLetterData[]>> => {
  const db = getFirestore();
  try {
    const querySnapshot = await getDocs(collection(db, "coverLetters"));
    const fetchedData: CoverLetterData[] = querySnapshot.docs.map(
      (doc) => doc.data() as CoverLetterData
    );

    return {
      status: 200,
      data: fetchedData,
      message: "Successfully fetched coverLetters",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Failed to get coverLetters",
    };
  }
};

export { getCoverLetters };
