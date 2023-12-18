import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';

export const Calender = () => {
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
          headerToolbar={{
            start: 'today',
            center: 'title',
            end: 'prev,next',
          }}
          height={'80vh'}
          events={[
            { title: '판매건수 : 23건', date: '2023-05-11' },
            { title: '판매건수 : 23건', date: '2023-05-13' },
          ]}
        />
      </div>
    );
};
