import proj4 from "proj4";

proj4.defs('WGS84', '+proj=longlat +datum=WGS84 +no_defs');

export function calculateDistance(lon1: number, lat1: number, lon2: number, lat2: number) {
    // Преобразуем координаты в метры с помощью UTM проекции
    const utmZone = Math.floor((lon1 + 180) / 6) + 1;
    const utmProj = `+proj=utm +zone=${utmZone} +datum=WGS84 +units=m +no_defs`;
    
    // Конвертируем координаты в UTM
    const point1 = proj4(utmProj, [lon1, lat1]);
    const point2 = proj4(utmProj, [lon2, lat2]);
    
    // Вычисляем расстояние по теореме Пифагора
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance;
}