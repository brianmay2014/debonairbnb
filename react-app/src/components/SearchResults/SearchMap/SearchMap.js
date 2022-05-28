import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
// import Marker from "./Marker/Marker"
// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

const containerStyle = {
  width: "66.66%",
  height: "800px",
};

const SearchMap = ({ resultIds }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAVvHLELZBB4QwY1iC7nIhEsuWjjUiyDLA",
  });

  const estates = useSelector((state) =>
    Object.values(state.estates).filter(
      (estate) =>
        resultIds.includes(estate.id.toString()) ||
        resultIds === estate.id.toString()
    )
  );

  console.log(estates[0]?.latitude, "HEEERE ========");

  const [map, setMap] = useState(null);

  const [estatesLoaded, setEstatesLoaded] = useState(false);

  console.log(estates, "AHHHHHHH");
  const onLoad = useCallback(function callback(map) {
    if (estatesLoaded) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: estates[0]?.latitude,
        lng: estates[0]?.longitude,
      });
      map.fitBounds(bounds);
      setMap(map);
    }
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (estates) {
      setEstatesLoaded(true);
    }
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: estates[0]?.latitude, lng: estates[0]?.longitude }}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {isLoaded &&
        estates?.map((estate) => {
          return (
            <Marker
              position={{ lat: estate?.latitude, lng: estate?.longitude }}
              labelAnchor={{ lat: estate?.latitude, lng: estate?.longitude }}
              label={`$${estate.nightly_rate.toString()}`}
            ></Marker>
          );
        })}
    </GoogleMap>
  ) : (
    <></>
  );

  // withGoogleMap((props) => (
  //   <GoogleMap defaultZoom={0} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
  //     {props.isMarkerShown && (
  //       <Marker position={{ lat: -34.397, lng: 150.644 }} />
  //     )}
  //   </GoogleMap>
  // ))
};

export default SearchMap;
