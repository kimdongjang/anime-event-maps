import { IMarker } from "@/constants/common";
import { IEvent } from "@/services/event/@types";
import { atom } from "recoil";



export interface IMarkerStore {
    markerList: IMarker[];
}

export const markerStore = atom<IMarkerStore>({
    key: `markerStore`,
    default: {
        markerList: []
    }
})