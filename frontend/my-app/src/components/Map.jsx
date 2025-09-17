import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import supabase from "../supabase/supabase";
import auth from "../supabase/auth";
import styles from "../styles/Map.module.css"

const Map = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [directions, setDirections] = useState(null);

  const startAutocompleteRef = useRef(null);
  const endAutocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDCB_uw54Rnemd_pr81bwFTlNB3i_xD8HA",
    libraries: ["places"], 
  });

  useEffect(() => {
    const fetchRoute = async () => {
      const userId = await auth.checkUser();
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("user_id", userId);

      if (data && data.length > 0) {
        const route = data[0];
        setStart(route.start_location);
        setEnd(route.end_location);
        getRoute(route.start_location, route.end_location);
        console.log("routes received", data);
      }

      if (error) {
        console.error("Error fetching route:", error.message);
      }
    };

    fetchRoute();
  }, []);

  const getRoute = (start, end) => {
    if (!start || !end || !window.google) return;
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  };

  const handleUpdate = async () => {
    getRoute(start, end);
    const userId = await auth.checkUser();
    const { error } = await supabase
    .from("routes")
    .upsert({
      user_id: userId,
      start_location: start,
      end_location: end
    }, { onConflict: ['user_id'] }); 
  

    if (error) {
      console.error("Error updating route:", error.message);
    } else {
      console.log("Route updated successfully");
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <GoogleMap
          zoom={10}
          center={{ lat: 12.9716, lng: 77.5946 }}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
  
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Start location</label>
          <Autocomplete
            onLoad={(autoC) => (startAutocompleteRef.current = autoC)}
            onPlaceChanged={() => {
              const place = startAutocompleteRef.current.getPlace();
              setStart(place.formatted_address || place.name);
            }}
          >
            <input
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className={styles.input}
            />
          </Autocomplete>
        </div>
  
        <div className={styles.inputGroup}>
          <label className={styles.label}>Destination</label>
          <Autocomplete
            onLoad={(autoC) => (endAutocompleteRef.current = autoC)}
            onPlaceChanged={() => {
              const place = endAutocompleteRef.current.getPlace();
              setEnd(place.formatted_address || place.name);
            }}
          >
            <input
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className={styles.input}
            />
          </Autocomplete>
        </div>
  
        <div className={styles.buttonWrapper}>
          <button onClick={handleUpdate} className={styles.updateButton}>
            Update Route
          </button>
        </div>
      </div>
      </div>
    </div>
  );
  
};

export default Map;
