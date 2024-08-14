import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ApiResponse } from "../../_types/apiResponse";
import { UserData } from "../../_types/userData";

/**
 * Fetch user
 *
 * @param {string} id - ID of user to fetch
 * @returns {Promise<ApiResponse>}
 */
const getUser = async (id: string): Promise<ApiResponse<UserData>> => {
  const db = getFirestore();
  try {
    const query = doc(db, "users", id);
    const querySnapshot = await getDoc(query);

    if (querySnapshot.exists()) {
      const fetchedData: UserData = querySnapshot.data() as UserData;

      return {
        status: 200,
        data: fetchedData,
        message: "Successfully fetched user",
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
      message: "Failed to get users",
    };
  }
};

export { getUser };
