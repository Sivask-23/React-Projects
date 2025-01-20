import { apiInstance } from "../ServiceObject";

export const userLogin=async(user_data)=>{
    try {
        const response = await apiInstance.post('/userlogin',user_data); 
    
        if (response && response.data) {
          console.log("Response from Login API:", response.data);
          return response.data;
        }
      } catch (error) {
        console.error("Error during Login:", error.response ? error.response.data : error.message);
        return error.response.data
      }
}