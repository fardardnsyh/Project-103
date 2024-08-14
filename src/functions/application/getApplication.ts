import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ApplicationData } from "../../_types/applicationData";

/**
 * Fetch an application
 *
 * @param {string} id - ID of application to fetch
 * @returns {Promise<ApiResponse>}
 */
const getApplication = async (
  id: string
): Promise<ApiResponse<ApplicationData>> => {
  const db = getFirestore();
  try {
    const query = doc(db, "applications", id);
    const querySnapshot = await getDoc(query);

    if (querySnapshot.exists()) {
      const fetchedData: ApplicationData =
        querySnapshot.data() as ApplicationData;

      return {
        status: 200,
        data: fetchedData,
        message: "Successfully fetched application",
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
      message: "Failed to get applications",
    };
  }
};

export { getApplication };
