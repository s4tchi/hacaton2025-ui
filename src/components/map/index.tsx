import { YMaps, Map as MY, Placemark, Polyline } from '@pbe/react-yandex-maps';
import { useMapHandlers } from '../../hook/useMapHandlers';
import { initializeYMapsParams } from '../../utils/constants';
import { useMapSearchParams } from '../../hook/useMapSearchParams';
import { useGeometryPoints } from '../../hook';
import { useEffect, useMemo } from 'react';
import { getSensors } from '../../api';

export const Map = () => {

    const { handleOnClick, mapState } = useMapHandlers();

    const { markers, removeMarker, setMarkers } = useMapSearchParams();
    const { currentPosition, positionHistory } = useGeometryPoints();

    const polyline = useMemo(() => positionHistory.map((point) => [point.x, point.y]),[positionHistory])
    
    const handleGetSensors = async () => {
        const response = await getSensors();
        setMarkers(response);
    }

    useEffect(() => {
        handleGetSensors();

    }, [])

    return (
        <YMaps
            query={initializeYMapsParams}
        >
            <MY
            state={mapState}             
            onClick={handleOnClick}
            width="100vw"
            height="100vh"
            >   
                {/* Линия маршрута */}
                {polyline.length > 1 && (
                    <Polyline
                        geometry={polyline}
                        options={{
                            strokeColor: '#FF0000',
                            strokeWidth: 3,
                            strokeOpacity: 0.8
                        }}
                    />
                )}
                
                {/* Текущая позиция */}
                {renderCurrentPosition()}
                
                {/* Маркеры */}
                {renderMarkers()}
            </MY>
        </YMaps>
    )

    function renderCurrentPosition() {
        return (
                    <Placemark
                        geometry={[currentPosition.x, currentPosition.y]}
                        properties={{
                            hintContent: 'Текущая позиция',
                        }}
                        options={{
                            preset: 'islands#blueDotIcon',
                            draggable: false,
                        }}
                    />
                )
    }
    function renderMarkers() {
        return markers.map((marker) => (
            <Placemark
                key={marker.id}
                geometry={[marker.x, marker.y]}
                properties={{
                    hintContent: `Маркер номер ${marker.id}`,
                    }}
                    options={{
                        preset: 'islands#redDotIcon',
                        draggable: true,
                        cursor: 'pointer',
                        }}
                    onClick={() => {
                        console.log(`Клик по маркеру ${marker.id}`);
                        removeMarker(marker.id);
                    }}
                    />
                ))
    }
}