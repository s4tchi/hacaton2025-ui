import { YMaps, Map as MY, Placemark, Polyline } from '@pbe/react-yandex-maps';
import { useMapHandlers } from '../../hook/useMapHandlers';
import { initializeYMapsParams } from '../../utils/constants';
import { useMapSearchParams } from '../../hook/useMapSearchParams';
import { useGeometryPoints } from '../../hook';
import { useEffect, useMemo } from 'react';
import { getSensors } from '../../api';
import { SensorDialog } from '../SensorDialog';
import { useSensorDialog } from '../../hook/useSensorDialog';

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

    const { currentSensor, setCurrentSensor, isDialogOpen, setIsDialogOpen } = useSensorDialog();

    return (
        <>
        <YMaps
            query={initializeYMapsParams}
        >
            <MY
            state={mapState}             
            onClick={handleOnClick}
            width="100%"
            height="100%"
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
            {renderModal()}
        </YMaps>
        </>
    )

    function renderModal() {
        if(!currentSensor) return null;

        return (
         <SensorDialog
          visible={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setCurrentSensor(null);
          }}
          senser={currentSensor}
        />
        )
    }

    function renderCurrentPosition() {
        return (
            <Placemark
                    // geometry={[currentPosition.x, 38.93639597930583]}
                        geometry={[currentPosition.x, currentPosition.y]}
                        properties={{
                            hintContent: 'Текущая позиция',
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: '/new-moon.png',
                            iconImageSize: [24, 24],
                            iconImageOffset: [-12, -12],
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
                        iconLayout: 'default#image',
                        iconImageHref: '/anchor.png',
                        iconImageSize: [32, 32],
                        iconImageOffset: [-16, -16],
                        draggable: false,
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