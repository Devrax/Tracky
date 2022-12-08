import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useLayoutEffect } from "react";

interface TrackinMapProps {
  styles?: React.CSSProperties;
  mapOptions?: Partial<mapboxgl.MapboxOptions>
}

const TrackingMap: React.FC<TrackinMapProps> = (props) => {
  const containerMap: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  let map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);

  const defaultStyles: React.CSSProperties = props.styles || {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%"
  };

 
  useLayoutEffect(() => {
    if (containerMap != null) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZGV2cmFmeCIsImEiOiJja3VscGgwNG8xNDhqMm9wODZwN2l6YTk2In0.jDdxYysLDjPUBZspwNmRyw";

      setTimeout(() => {

        map.current = new mapboxgl.Map({
            container: containerMap.current as HTMLDivElement,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-74.5, 40],
            zoom: 9,
            attributionControl: false,
            ...(props?.mapOptions ?? {})
          })

          // Prueba
          new mapboxgl.Marker({
            color: "#FF0000",
          })
          .setLngLat(props.mapOptions?.center as mapboxgl.LngLatLike)
          .addTo(map.current);
        // Prueba
    
      }, 0);

      return () => {
        map.current?.remove();
      };
    }
  }, [props.mapOptions]);

  return <div ref={containerMap} style={defaultStyles}></div>;
};

export default TrackingMap;

