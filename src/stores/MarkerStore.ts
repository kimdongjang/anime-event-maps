import { IMarker } from "@/constants/common";
import { IEvent } from "@/services/event/@types";
import { atom } from "recoil";



export const markerStore = atom<IMarker[]>({
    key: `markerStore`,
    default: [],
})