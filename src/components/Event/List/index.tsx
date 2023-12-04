import { sampleEvents } from '@/constants/sample';
import useMapHook from '@/hooks/useMapHook';
import { IEvent } from '@/services/event/@types';
import { markerStore } from '@/stores/MarkerStore';
import { useRecoilState } from 'recoil';
import { EventSummary } from '../Summary';

export const EventList = () => {
  const [markerList, setMarkerList] = useRecoilState(markerStore);
  const { morphMarker } = useMapHook();

  const handleEventClick = (event: IEvent) => {
    morphMarker(event)
    // const find = markerList.find((search) => search.event.id == event.id);
    // console.log(find);
  };

  const renderEventList = () => {
    return sampleEvents.map((data, i) => (
      <EventSummary event={data} key={i} onClick={handleEventClick} />
    ));
  };
  return <>{renderEventList()}</>;
};
