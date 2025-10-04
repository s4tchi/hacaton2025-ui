import { create } from "zustand";
import { EDIT_TYPE_STATE, EditType } from "../utils/constants";
import { ISensor } from "../interface";
import { deleteSensors } from "../api";

interface UseMapSearchParams {
  editType: Record<EditType, boolean>;
  setEditType: (editType: EditType) => void;
  markers: ISensor[];
  setMarkers: (markers: ISensor[]) => void;
  removeMarker: (id: string) => Promise<void>;
}

export const useMapSearchParams = create<UseMapSearchParams>(
  (set) => ({
  editType: EDIT_TYPE_STATE,
  setEditType: (editType: EditType) => set((state) => ({ 
    editType: { ...state.editType, [editType]: !state.editType[editType] }
  })),
  markers: [],
  setMarkers: (markers: ISensor[]) => set({ markers }),
  removeMarker: async (id: string) => {
    await deleteSensors(id)
    set((state) => ({ markers: state.markers.filter((marker) => marker.id !== id) }))
  },
}))