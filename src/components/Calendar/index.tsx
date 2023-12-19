import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchListStore } from '@/stores/MapDataStore';

export const Calendar = () => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
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
          events={searchList.map((event, i) => {
            return {
              title: event.title,
              start: new Date(event.startDate),
              end: new Date(event.endDate),
            };
          })}
        />
      </div>
    );
};
