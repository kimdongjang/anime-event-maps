import { IEvent } from "@/services/event/@types"
import { formatYmd } from "./date";

export const parseEvent = (data:any) => {
    const event:IEvent = {
        id: data.id,
        title: data.title,
        category: data.category,
        eventName: data.event_name,
        startDate: formatYmd(new Date(data.start_date)),
        endDate: formatYmd(new Date(data.end_date)),
        eventHall: data.event_hall,
        address: data.address,
        doroAddress: data.doro_address,
        jibunAddress: data.jibun_address,
        lat: data.lat,
        lng: data.lng,
        site: data.site,
        isFavorite: !!data.isFavorite ? data.isFavorite : false,
        titleImage: data.title_image,
    }
    return event;
}