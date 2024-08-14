import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ExperienceData } from "../../_types/experienceData";

/**
 * Fetch an experience
 *
 * @param {string} id - ID of an experience to fetch
 * @returns {Promise<ApiResponse>}
 */
const getExperience = async (
  id: string
): Promise<ApiResponse<ExperienceData>> => {
  const db = getFirestore();
  try {
    const query = doc(db, "experiences", id);
    const querySnapshot = await getDoc(query);

    if (querySnapshot.exists()) {
      const fetchedData: ExperienceData =
        querySnapshot.data() as ExperienceData;

      return {
        status: 200,
        data: fetchedData,
        message: "Successfully fetched experience",
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
      message: "Failed to get experiences",
    };
  }
};

export { getExperience };
