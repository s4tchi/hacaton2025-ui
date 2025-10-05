import { create } from "zustand";
import { ISensor } from "../interface";

interface UseSensorDialog {
  currentSensor: ISensor | null;
  setCurrentSensor: (sensor: ISensor | null) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}

export const useSensorDialog = create<UseSensorDialog>((set) => ({
  currentSensor: null,
  setCurrentSensor: (sensor: ISensor | null) => set({ currentSensor: sensor }),
  isDialogOpen: false,
  setIsDialogOpen: (isDialogOpen: boolean) => set({ isDialogOpen })
}))