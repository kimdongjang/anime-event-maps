import axios from "axios";
import useSWR from "swr";

export const useGetEventListById = (id: number) => {
    const { data, error } = useSWR<any>(['/api/event/getEventListById', id], ([url, id]) => {
        return axios.post(url, { id }).then(response => response.data);
    });

    return data;

}