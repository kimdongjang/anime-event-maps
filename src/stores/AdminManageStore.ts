import { ICategory } from "@/services/event/@types";
import { IEventHallTemplate, IEventTemplate } from "@/services/template/@types";
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

interface ITemplateStore {
    eventTemplateList: IEventTemplate[];
    eventTemplateHallList: IEventHallTemplate[];
}
export const templateStore = atom<ITemplateStore>({
    key: `templateStore`,
    default:{
        eventTemplateList:[],
        eventTemplateHallList:[]
    }
})
