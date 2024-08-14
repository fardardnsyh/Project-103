import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { ProjectData } from "../../_types/projectData";

/**
 * Fetch a project
 *
 * @param {string} id - ID of a project to fetch
 * @returns {Promise<ApiResponse>}
 */
const getProject = async (id: string): Promise<ApiResponse<ProjectData>> => {
  const db = getFirestore();
  try {
    const query = doc(db, "projects", id);
    const querySnapshot = await getDoc(query);

    if (querySnapshot.exists()) {
      const fetchedData: ProjectData = querySnapshot.data() as ProjectData;

      return {
        status: 200,
        data: fetchedData,
        message: "Successfully fetched project",
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
      message: "Failed to get project",
    };
  }
};

export { getProject };
