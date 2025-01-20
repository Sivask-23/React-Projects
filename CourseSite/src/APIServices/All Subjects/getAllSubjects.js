import { apiInstance } from "../ServiceObject";

export const getallSubjects=async()=>{
    try {
        const response = await apiInstance.get('/subjects'); 
    
        if (response && response.data) {
          console.log("Response from all course API:", response.data);
          return response.data;
        }
      } catch (error) {
        console.error("Error during Login:", error.response ? error.response.data : error.message);
        return error.response.data
      }
}