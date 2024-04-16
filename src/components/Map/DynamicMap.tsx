import { IMarker } from '@/constants/common';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMapHook';
import { IEvent } from '@/services/event/@types';
import { searchListStore } from '@/stores/MapDataStore';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useRecoilState } from 'recoil';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Image } from 'antd';

const icon = L.icon({ iconUrl: "/images/markers/marker-icon.png" });

const Map = ({ mapId = 'map' }) => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);

  const renderMarker = () => {
    console.log(searchList)
    if(!!searchList){
      return searchList.map((data, i) => {
        return <Marker position={{lat:data.lat, lng:data.lng}} icon={icon} key={i}> 
          <Popup>
            <div>
              <Image width={300} src={data.images?.path}/>
              <h3>{data.title}</h3>
              <div className='m-0'>{data.address}</div>
              <div className='flex items-center'>
              <span className="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">기간</span>
                <span>{data.startDate}~{data.endDate}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      })
    }
    else{
      return <></>
    }
  }

  return (
    <div >
      {/* <div id={mapId} style={{ width: '100%', height: '100%' }} /> */}
      <MapContainer center={INITIAL_CENTER} zoom={11} scrollWheelZoom={true} style={{ height:'1600px', zIndex:0 }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarker()}
        {/* <Marker position={INITIAL_CENTER} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

export default Map;
