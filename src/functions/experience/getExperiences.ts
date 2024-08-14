import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ExperienceData } from "../../_types/experienceData";

/**
 * Fetch all experience
 *
 * @returns {Promise<ApiResponse>}
 */
const getExperiences = async (): Promise<ApiResponse<ExperienceData[]>> => {
  const db = getFirestore();
  try {
    const querySnapshot = await getDocs(collection(db, "experiences"));
    const fetchedData: ExperienceData[] = querySnapshot.docs.map(
      (doc) => doc.data() as ExperienceData
    );

    return {
      status: 200,
      data: fetchedData,
      message: "Successfully fetched experiences",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Failed to get experiences",
    };
  }
};

export { getExperiences };
