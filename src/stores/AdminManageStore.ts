import { ICategory } from "@/services/event/@types";
import { atom } from "recoil";


interface IAdminManageStore {
    categoryList: ICategory[];
}
export const adminManageStore = atom<IAdminManageStore>({
    key: `adminManageStore`,
    default:{
        categoryList:[]
    }
})