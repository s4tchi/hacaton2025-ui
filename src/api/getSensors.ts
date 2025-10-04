import axios from 'axios';
import { API_URL } from '../utils/api_constants';


export const getSensors = async () => {
  const response = await axios.get(`${API_URL}/anchors`);
  const formattedData = response.data.map((sensor: {id: string, x_coord: number, y_coord: number, name: string}) => ({
    id: sensor.id,
    x: sensor.x_coord,
    y: sensor.y_coord,
    name: sensor.name,
  }));
  return formattedData;
}