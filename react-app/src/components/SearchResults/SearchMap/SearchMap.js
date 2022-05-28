import { withScriptjs, GoogleMap, Marker, withGoogleMap } from "react-google-maps";

const SearchMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap defaultZoom={0} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
  </GoogleMap>
))

export default SearchMap;
