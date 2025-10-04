import axios from "axios";
import { API_URL } from "../utils/api_constants";
import { ISensor } from "../interface";

export const createSensors = async (sensor: ISensor) => {

  const formattedBody = {
    name: sensor.id,
    x_coord: sensor.x,
    y_coord: sensor.y,
  }
  const response = await axios.post(`${API_URL}/anchors`, formattedBody);
  const formattedResponse = {
    ...response.data,
    id: response.data.id,
  }
  return formattedResponse;
}