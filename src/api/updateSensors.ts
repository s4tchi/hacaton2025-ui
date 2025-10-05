import axios from "axios";
import { API_URL } from "../utils/api_constants"
import { ISensor } from "../interface";

export const updateSensors = async (id: number, body: ISensor) => {
  const response = await axios.patch(`${API_URL}/anchors/${id}`, {
    name: body.name,
    x_coord: body.x,
    y_coord: body.y,
  });
  return response.data;
}