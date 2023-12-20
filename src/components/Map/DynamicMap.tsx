import { IMarker } from '@/constants/common';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMapHook';
import { IEvent } from '@/services/event/@types';
import { searchListStore } from '@/stores/MapDataStore';
import { useState } from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import { useRecoilState } from 'recoil';

const Map = ({ mapId = 'map' }) => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);

  const renderMarker = (event: IEvent, index: number) => {
    return (
      <Marker key={index} position={[event.lat, event.lng]}>
        <Popup>
          <div className="p-3 ">
            <img
              src="${event.images.path}"
              width="250"
              height="150"
              alt="${event.images.alt}"
            />
            <h3>{event.title}</h3>
            <p>{event.address}</p>
            <div className="flex">
              <label className="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">
                기간
              </label>
              <p>{event.startDate}</p>
              <p>~</p>
              <p>{event.endDate}</p>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  };

  return (
    // <MapContainer
    //   center={[INITIAL_CENTER.lat, INITIAL_CENTER.lng]}
    //   zoom={INITIAL_ZOOM}
    //   scrollWheelZoom={false}
    // >
    //   {searchList.map((event, i) => {
    //     return renderMarker(event, i);
    //   })}
    <div id={mapId} style={{ width: '100%', height: '100%' }} />
    // </MapContainer>
  );
};

export default Map;
