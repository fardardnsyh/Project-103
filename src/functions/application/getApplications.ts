import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ApplicationData } from "../../_types/applicationData";

/**
 * Fetch all applications
 *
 * @returns {Promise<ApiResponse>}
 */
const getApplications = async (): Promise<ApiResponse<ApplicationData[]>> => {
  const db = getFirestore();
  try {
    const querySnapshot = await getDocs(collection(db, "applications"));
    const fetchedData: ApplicationData[] = querySnapshot.docs.map(
      (doc) => doc.data() as ApplicationData
    );

    return {
      status: 200,
      data: fetchedData,
      message: "Successfully fetched applications",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Failed to get applications",
    };
  }
};

export { getApplications };
