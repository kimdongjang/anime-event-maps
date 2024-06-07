import axios from "axios";
import useSWR from "swr";

export const useGetImageById = (id: number) => {
    const { data, error } = useSWR<any>(['/api/image/getImageById', id], ([url, id]) => {
        return axios.get(`${url}?id=${id}`).then(response => response.data)
    });

    return data;

}