import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import "./SearchMap.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height:"100%",
};

const SearchMap = ({ resultIds }) => {
  console.log( process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const estates = useSelector((state) =>
    Object.values(state.estates).filter(
      (estate) =>
        resultIds.includes(estate.id.toString()) ||
        resultIds === estate.id.toString()
    )
  );

  // console.log(estates[0]?.latitude, "HEEERE ========");

  const [map, setMap] = useState(null);

  const [estatesLoaded, setEstatesLoaded] = useState(false);

  // console.log(estates, "AHHHHHHH");
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
    <>

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: estates[0]?.latitude, lng: estates[0]?.longitude }}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
      className="google-map-search"
    >
      {/* Child components, such as markers, info windows, etc. */}
      {isLoaded &&
        estates?.map((estate) => {
          return (
            <Marker
              position={{ lat: estate?.latitude, lng: estate?.longitude }}
              labelAnchor={{ lat: estate?.latitude, lng: estate?.longitude }}
              label={`$${estate.nightly_rate.toString()}`}
            >
            </Marker>
          );
        })}
    </GoogleMap>
    </>
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
