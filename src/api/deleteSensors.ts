import axios from "axios";
import { API_URL } from "../utils/api_constants";

export const deleteSensors = async (idSensor: string) => {
  const response = await axios.delete(`${API_URL}/anchors/${idSensor}`);
  return response.data
}