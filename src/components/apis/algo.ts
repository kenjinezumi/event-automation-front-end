import axios from "axios";

export async function sendApiAlgoCall(algoData: any) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/algo/', algoData);
    
      console.log("SUCCESS");
      console.log(response);
      return response.data; // Return the response data

  } catch (error) {
    // Handle the error
    console.error("Error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
