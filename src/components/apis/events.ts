import axios from 'axios';

export const handleAddEvent = async (eventData: any) => {
  try {
    console.log("START")

    console.log(eventData)
    const response = await axios.post('http://127.0.0.1:8000/api/events/create/', eventData);

    if (response.status === 200) {
      // Event created successfully
      // You can perform further actions or show a success message
      return true;
    } else {
      // Handle error response
      return false;
    }
  } catch (error) {
    // Handle network error or server error
    return false;
  }
};
