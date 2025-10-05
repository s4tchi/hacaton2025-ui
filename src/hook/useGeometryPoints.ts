import { create } from 'zustand';
import { IPoint, ISensor } from '../interface';

interface IGeometryPoints {
    currentPosition: IPoint;
    positionHistory: Array<IPoint>;
    beacons: Array<ISensor>;

    setCurrentPosition: (point: IPoint) => void;
    removeHistory: () => void;
}

export const useGeometryPoints = create<IGeometryPoints>((set) => ({
    currentPosition: { x: 0, y: 0, date: 0 },
    positionHistory: [],
    beacons: [],

    setCurrentPosition: (point: IPoint) => set((state: IGeometryPoints) => ({ currentPosition: {...point, date: Date.now()}, positionHistory: [...state.positionHistory, point] })),
    removeHistory: () => set(() => ({ positionHistory: [] })),
})); 