import { useState } from "react"
import { EditType, mapState as initialMapState } from "../utils/constants"
import { useMapSearchParams } from "./useMapSearchParams";
import { createSensors } from "../api";


export const useMapHandlers = () => {
  const [mapState, setMapState] = useState<ymaps.IMapState>(initialMapState)

  const { setMarkers, markers, editType, setSelectedCoordinates } = useMapSearchParams();

  const handleOnClick = async (e: ymaps.MapEvent) => {
    const coordinates = e.get('coords');
    console.log(coordinates);
    if(editType[EditType.ADD_MARKER]) {
      // Устанавливаем выбранные координаты вместо создания сенсора
      setSelectedCoordinates({ x: coordinates[0], y: coordinates[1] });
    }
  }

  return {
    mapState,
    setMapState,
    handleOnClick,
  }
}