import { useState } from "react"
import { EditType, mapState as initialMapState } from "../utils/constants"
import { useMapSearchParams } from "./useMapSearchParams";
import { createSensors } from "../api";


export const useMapHandlers = () => {
  const [mapState, setMapState] = useState<ymaps.IMapState>(initialMapState)

  const { setMarkers, markers, editType } = useMapSearchParams();

  const handleOnClick = async (e: ymaps.MapEvent) => {
    const coordinates = e.get('coords');
    console.log(coordinates);
    if(editType[EditType.ADD_MARKER]) {
      const response = await createSensors({ id: String(markers.length + 1), x: coordinates[0], y: coordinates[1] })
      console.log(response);
      setMarkers([...markers, { id: response.id, x: coordinates[0], y: coordinates[1] }]);
    }
  }

  return {
    mapState,
    setMapState,
    handleOnClick,
  }
}