import { GET_EVENT_LIST, GET_EVENT_LIST_BYID } from "@/constants/endpoint";
import { IEvent } from "@/services/event/@types";
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

// API 응답 데이터 타입 정의
type ApiResponse = {
    data: IEvent[]
  };
  
export const useGetEventListById = (params: Record<string, any>) => {
    const fetcher = async () => await axios.get(GET_EVENT_LIST_BYID, {params});
    const { data, error, isValidating, mutate } = useSWR<AxiosResponse>([, params], fetcher);

    return {
      response:{
        content:data?.data
      },
      error,
      isLoading: !data && !error, // 선택사항: 로딩 상태를 표시하려면
      isValidating,
      mutate,
    };


}
export const useGetEventList = () => {
    const fetcher = async () => await axios.get(GET_EVENT_LIST);    
    // SWR 키는 일반적으로 가져오려는 URL과 파라미터입니다.
    const { data, error, isValidating, mutate } = useSWR<AxiosResponse>([, ], fetcher);
  
    // response: data,status,headers 등등
    return {
      response:{
        content:data?.data
      },
      error,
      isLoading: !data && !error, // 선택사항: 로딩 상태를 표시하려면
      isValidating,
      mutate,
    };


}