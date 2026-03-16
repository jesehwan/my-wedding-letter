declare namespace naver.maps {
  class Map {
    constructor(element: HTMLElement, options: MapOptions);
  }

  class Marker {
    constructor(options: MarkerOptions);
  }

  class LatLng {
    constructor(lat: number, lng: number);
  }

  interface MapOptions {
    center: LatLng;
    zoom?: number;
    zoomControl?: boolean;
    zoomControlOptions?: {
      position?: number;
    };
  }

  interface MarkerOptions {
    position: LatLng;
    map: Map;
  }

  const Position: {
    TOP_RIGHT: number;
  };
}
