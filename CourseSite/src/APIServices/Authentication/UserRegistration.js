import { apiInstance } from "../ServiceObject";

export const userRegistration = async (user_data) => {
  try {
    const response = await apiInstance.post('/register', user_data); 

    if (response && response.data) {
      console.log("Response from registration API:", response);
      return {status:response.status,data:response.data};
    }
  } catch (error) {
    console.error("Error during registration:", error.response ? error.response.data : error.message);
    return error.response.data
  }
};
