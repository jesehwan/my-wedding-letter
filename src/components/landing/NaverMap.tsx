"use client";

import { useEffect, useRef } from "react";

const VENUE_LAT = 37.522742;
const VENUE_LNG = 127.132406;

export function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.naver?.maps) return;

      const location = new naver.maps.LatLng(VENUE_LAT, VENUE_LNG);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      new naver.maps.Marker({
        position: location,
        map,
      });
    };

    if (window.naver?.maps) {
      initMap();
    } else {
      const checkInterval = setInterval(() => {
        if (window.naver?.maps) {
          clearInterval(checkInterval);
          initMap();
        }
      }, 200);
      return () => clearInterval(checkInterval);
    }
  }, []);

  return (
    <div className="mt-8 w-full max-w-md px-2">
      <div
        ref={mapRef}
        className="h-[250px] w-full overflow-hidden rounded-xl shadow-md"
      />
    </div>
  );
}
