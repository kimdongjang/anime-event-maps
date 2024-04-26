import useMapHook from "@/hooks/useMapHook";
import { Coordinates } from "@/types/map";
import { useEffect, useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import L from 'leaflet';
import { curPositionStore } from "@/stores/MapDataStore";
import { useRecoilState } from "recoil";


const icon = L.icon({ iconUrl: "/images/markers/marker-icon.png" });

const LocationMarker = () => {
  const [curPosition, setCurPosition] = useRecoilState(curPositionStore);
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(curPosition, map.getZoom())
    },
  })

  useEffect(() => {
    map.locate();    
  }, [curPosition])

  return (
    <Marker position={curPosition} icon={icon} >
      <Popup>
        <div>

        </div>
      </Popup>
    </Marker>
  )
}

export default LocationMarker;