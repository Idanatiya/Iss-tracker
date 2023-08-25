import { useState, useEffect } from "react";
import { IssLocation } from "./types";
import { LocationSidebar } from "./components/LocationSidebar/LocationSidebar";
import { generateToast, getFormatDate } from "./utils";
import { onReqISSLocation } from "./services";

function App() {
  const [ISSLocation, setISSLocation] = useState<IssLocation | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedLocationId) {
      return;
    }

    const getISSLocation = async () => {
      try {
        const location = await onReqISSLocation();
        setISSLocation(location);
      } catch (error) {
        let message = "";
        if (error instanceof Error) message = error.message;
        generateToast(message);
      }
    };

    getISSLocation();
    const intervalId = setInterval(() => {
      getISSLocation();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedLocationId]);

  return (
    <div className="container">
      <LocationSidebar
        location={ISSLocation}
        selectedLocationId={selectedLocationId}
        onSelectLocation={(location) => {
          if (location?.id) {
            setISSLocation(location);
            setSelectedLocationId(location.id);
          } else {
            setSelectedLocationId(null);
          }
        }}
      />

      <div className="content">
        {ISSLocation ? (
          <div>
            <p>
              🔥
              {selectedLocationId ? "Selected Location:" : "Current Location:"}
            </p>
            Lat: {ISSLocation.latitude}, Lon:{ISSLocation.longitude}
            <p>{getFormatDate(ISSLocation.timestamp)}</p>
          </div>
        ) : (
          <div>Loading....</div>
        )}
      </div>
    </div>
  );
}

export default App;
