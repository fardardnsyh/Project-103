import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ProjectData } from "../../_types/projectData";

/**
 * Fetch all projects
 *
 * @returns {Promise<ApiResponse>}
 */
const getProjects = async (): Promise<ApiResponse<ProjectData[]>> => {
  const db = getFirestore();
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const fetchedData: ProjectData[] = querySnapshot.docs.map(
      (doc) => doc.data() as ProjectData
    );

    return {
      status: 200,
      data: fetchedData,
      message: "Successfully fetched projects",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Failed to get projects",
    };
  }
};

export { getProjects };
