import "./LocationSidebar.css";
import { IssLocation } from "../../types";
import { LocationPreview } from "../LocationPreview/LocationPreview";
import { useEffect, useMemo, useState } from "react";
import icon from "../../assets/icon.png";
import { locationService } from "../../services";
import { generateToast } from "../../utils";

export type Props = {
  location: IssLocation | null;
  onSelectLocation: (payload: IssLocation | null) => void;
  selectedLocationId: number | null;
};

export const LocationSidebar = ({
  location,
  onSelectLocation,
  selectedLocationId,
}: Props) => {
  const [savedISSLocations, setSavedISSLocations] = useState<IssLocation[]>(
    () => {
      return locationService.getSavedLocations();
    }
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    locationService.saveLocations(savedISSLocations);
  }, [savedISSLocations]);

  const locationsToShow = useMemo(() => {
    if (!query) {
      return savedISSLocations;
    }
    return savedISSLocations.filter(
      ({ latitude, longitude }) =>
        latitude.includes(query) || longitude.includes(query)
    );
  }, [query, savedISSLocations]);

  const handleSaveLocation = () => {
    if (!location) {
      return;
    }

    const isLocationExists = savedISSLocations.find(
      (savedLocation) => savedLocation.timestamp === location.timestamp
    );

    if (isLocationExists) {
      console.log("CANT ADD!");
      return;
    }
    const newLocation = {
      ...location,
      id: Date.now(),
    };
    generateToast(`Added Location`);
    setSavedISSLocations((prevLocations) => [...prevLocations, newLocation]);
  };

  const handleDeleteLocation = (locationId: number) => {
    const locationIdx = savedISSLocations.findIndex(
      (location) => location.id === locationId
    );
    if (locationIdx > -1) {
      const savedLocationsCopy = [...savedISSLocations];
      savedLocationsCopy.splice(locationIdx, 1);
      setSavedISSLocations(savedLocationsCopy);
      generateToast(`Deleted Item `);
    }
  };

  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <img src={icon} />
        <span>Driivz ISS Tracker</span>
      </header>
      <section className="sidebar__content">
        <input
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Search Locations..."
        />
        <button
          disabled={!!selectedLocationId}
          onClick={() => setSavedISSLocations([])}
        >
          🧹 Clear Locations 🧹
        </button>
        {locationsToShow.length > 0 ? (
          <div className="locations">
            {locationsToShow.map((savedLocation) => (
              <LocationPreview
                onClickLocation={onSelectLocation}
                onDeleteLocation={handleDeleteLocation}
                isSelected={savedLocation.id === selectedLocationId}
                key={savedLocation.id}
                location={savedLocation}
              />
            ))}
          </div>
        ) : (
          <div>No save locations yet!</div>
        )}
      </section>
      <button
        disabled={!!selectedLocationId}
        onClick={handleSaveLocation}
        className="btn"
      >
        +
      </button>
    </aside>
  );
};
