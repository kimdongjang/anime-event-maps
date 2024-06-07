import { adminManageStore } from "@/stores/AdminManageStore";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EventCategory = () => {
    const [adminManage, setAdminManage] = useRecoilState(adminManageStore);

    const { data, error } = useSWR<any[]>('/api/category/getCategory', fetcher, {
        refreshInterval: 10000, // 10초마다 새로운 데이터를 가져옴
    });

    useEffect(() => {
        if (data) {
            setAdminManage({
                categoryList: !data ? [] : data.map(obj => {
                    return {
                        id: obj.id,
                        name: obj.name,
                    };
                })
            });
        }
    }, [data, setAdminManage]);

    return null;
}

export default EventCategory;