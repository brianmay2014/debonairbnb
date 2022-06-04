import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import "./SearchMap.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";

import ico from "./MarkerIcon/red-diamond.svg"

const containerStyle = {
  width: "100%",
  height: "800px",
};

const SearchMap = ({ resultIds, gKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: gKey,
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
      estates.forEach(estate => {
        bounds.extend({lat: estate.latitude, lng: estate.longitude})
      })
      console.log(estates);
      map.fitBounds(bounds);
      setMap(map);
    }
  }, [estates, estatesLoaded]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const options = {
    strokeColor: "#9f703f",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "#c28849",
    fillOpacity: 0.55,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 2000,
    zIndex: 1,
  };

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
              <>
                <Marker
                  position={{ lat: estate?.latitude, lng: estate?.longitude }}
                  labelAnchor={{
                    lat: estate?.latitude,
                    lng: estate?.longitude,
                  }}
                  label={{text: `$${estate.nightly_rate.toString()}`, fontWeight: "bold"}}
                  icon={{
                    url: ico,
                    size: new window.google.maps.Size(26, 26),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(17, 34),
                    scaledSize: new window.google.maps.Size(26, 26),
                    labelOrigin: new window.google.maps.Point(13,-10),
                  }}
                ></Marker>
              </>
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
