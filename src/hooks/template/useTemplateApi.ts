import { GET_TEMPLATE_EVENT, GET_TEMPLATE_EVENTHALL } from "@/constants/endpoint";
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

export const useGetEventList = () => {
    // fetcher 함수 정의: API를 호출하여 데이터를 가져옴
    const fetcher = async () => await axios.get(GET_TEMPLATE_EVENT);

    // SWR 훅을 사용하여 데이터를 가져옴
    const { data, error, isValidating, mutate } = useSWR<AxiosResponse>(GET_TEMPLATE_EVENT, fetcher);

    // response 반환: data, error, 로딩 상태 등을 제공
    return {
        response: {
            content: data?.data, // data에서 실제 이벤트 리스트를 추출
        },
        error,
        isLoading: !data && !error, // 로딩 상태: 데이터가 없고 오류도 없을 때 로딩 중
        isValidating,
        mutate, // 데이터 갱신용
    };
};


export const useGetEventHallList = () => {
    const fetcher = async () => await axios.get(GET_TEMPLATE_EVENTHALL);

    const { data, error, isValidating, mutate } = useSWR<AxiosResponse>(GET_TEMPLATE_EVENTHALL, fetcher);

    return {
        response: {
            content: data?.data, // 데이터에서 행사장 정보를 추출
        },
        error,
        isLoading: !data && !error, 
        isValidating,
        mutate,
    };
};