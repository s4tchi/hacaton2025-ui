import { YMaps, Map as MY, Placemark } from '@pbe/react-yandex-maps';

const mapState = { center: [55.76, 37.64], zoom: 10 };

export function Map() {
    return (
        <YMaps
            query={{
                apikey: '0f413fe4-a78e-4d59-9e85-8f8df1924448',
            }}
        >
            <MY state={mapState}             
            onClick={(e: any) => {
              // Получите координаты точки клика
              const coords = e.get('coords');
              console.log('Координаты клика:', coords);
              // Дальнейшая работа с координатами
            }}
                        width="100vw"
            height="100vh">
                <Placemark
                    geometry={{
                        coordinates: [55.751574, 37.573856]
                    }}
                    properties={{
                    hintContent: 'Собственный значок метки',
                    balloonContent: 'Это красивая метка'
                    }}
                    options={{
                    iconImageSize: [30, 42],
                    iconImageOffset: [-3, -42]
                    }}
                />
            </MY>
        </YMaps>
    )
}