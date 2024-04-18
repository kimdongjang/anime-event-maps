import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchListStore, eventListStore } from '@/stores/MapDataStore';
import { checkEndEvent } from '@/utils/date';
import { FilterType } from '@/constants/enums';

export const Calendar = () => {
  const [eventList, setEventList] = useRecoilState(eventListStore);
  const [searchEventList, setSearchEventList] = useRecoilState(searchListStore);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // const renderCallback = useCallback(() => {
  //   const renderList = filterList();
  //   return renderList.map((event, i) => {
  //     // 종료된 이벤트가 체크되어 있다면
  //     if (filter.isEnd) {
  //       return {
  //         title: event.title,
  //         start: new Date(event.startDate),
  //         end: new Date(event.endDate),
  //       };
  //     } else {
  //       // 종료 날짜를 비교해서 예정된 이벤트만 출력
  //       if (checkEndEvent(new Date(event.endDate))) {
  //         return {
  //           title: event.title,
  //           start: new Date(event.startDate),
  //           end: new Date(event.endDate),
  //         };
  //       }
  //     }
  //   });
  // }, []);

  // const filterList = () => {
    
  //   if (filter.addedEventList.length === 0) {
  //     return eventList;
  //   } else {
  //     switch (filter.type) {
  //       case FilterType.EVENT:
  //         return eventList.filter((event) => {
  //           // 필터에 추가된 이름들과 일치한다면
  //           if (!!filter.addedEventList.find((f) => f === event.event)) {
  //             return event;
  //           }
  //         });
  //       case FilterType.ADDRESS:
  //         return eventList.filter((event) => {
  //           // 필터에 추가된 이름들과 일치한다면
  //           if (!!filter.addedEventList.find((f) => event.doroAddress.includes(f))) {
  //             return event;
  //           }
  //         });

  //       case FilterType.LOCATION:
  //         return eventList.filter((event) => {
  //           // 필터에 추가된 이름들과 일치한다면
  //           if (!!filter.addedEventList.find((f) => f === event.eventHall)) {
  //             return event;
  //           }
  //         });
  //       default:
  //         return eventList;
  //     }
  //   }
  // };
  const renderList = searchEventList.searchedList.length !== 0 ? searchEventList.searchedList : eventList;
  if (!mounted) return <></>;
  else
    return (
      <div className="m-2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={'dayGridMonth'}
          locale="ko"
          headerToolbar={{
            start: 'today',
            center: 'title',
            end: 'prev,next',
          }}
          height={'80vh'}
          displayEventTime={false}
          eventClassNames={'text-xs'}
          events={renderList.map((event, i) => {
            if (!!event) {
              return {
                title: event.title,
                start: new Date(event.startDate),
                end: new Date(event.endDate),
              };
            } else {
              return {};
            }
          })}
        />
      </div>
    );
};
