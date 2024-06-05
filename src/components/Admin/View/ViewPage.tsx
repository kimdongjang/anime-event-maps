import { useEffect, useState } from "react";
import AdminTable from "../Table"
import { IEvent } from "@/services/event/@types";
import { QueryResultRow } from "@vercel/postgres";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { formatYmd } from "@/utils/date";

const ViewPage = () => {
    const [eventList, setEventList] = useState<IEvent[]>([]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    
    // 세션을 통해 로그인 여부를 확인
    useEffect(() => {
        const fetchData = async () => {
            // 이벤트 리스트 가져오기
            const list: QueryResultRow[] = await getEventList();
            const convertList: IEvent[] = list.map(data => {
                // 각 row를 event 타입으로 변환하여 반환
                return {
                    id: data.id,
                    address: data.address,
                    category: data.category,
                    doroAddress: data.doro_address,
                    eventName: data.event_name,
                    eventHall: data.event_hall,
                    images: {
                        path: '',
                        alt: '',
                    },
                    isFavorite: data.isFavorite,
                    jibunAddress: data.jibun_address,
                    lat: data.lat,
                    lng: data.lng,
                    startDate: formatYmd(data.start_date),
                    endDate: formatYmd(data.end_date),
                    title: data.title,
                    priceList: [
                    ],
                    site: data.site,
                    // 이하 필드들 추가
                };
            });

            setEventList(convertList);
        }
        fetchData();
    }, []);

    return <div
        style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
        }}
    >
        <AdminTable list={eventList} />
    </div>
}

export default ViewPage;