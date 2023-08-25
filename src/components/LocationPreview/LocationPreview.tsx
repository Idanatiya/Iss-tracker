import "./LocationPreview.css";
import { IssLocation } from "../../types";
import { useMaybeDoubleClick } from "../../hooks";
import { getFormatDate } from "../../utils";

export type Props = {
  location: IssLocation;
  isSelected: boolean;
  onClickLocation: (payload: IssLocation | null) => void;
  onDeleteLocation: (locationId: number) => void;
};

export const LocationPreview = ({
  location,
  onClickLocation,
  onDeleteLocation,
  isSelected = false,
}: Props) => {
  const { latitude, longitude, timestamp, id } = location;
  const clickHandler = useMaybeDoubleClick({
    onDblClick: () => {
      onClickLocation(null);
    },
    onClick: () => {
      onClickLocation(location);
    },
  });
  return (
    <div
      onClick={clickHandler}
      className={`location ${isSelected ? "selected" : ""}`}
    >
      <p>
        Lat: {latitude}, Lon: {longitude}
      </p>
      <p>{getFormatDate(timestamp)}</p>
      <button
        className="delete-btn"
        disabled={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          if (id) {
            onDeleteLocation(id);
          }
        }}
      >
        x
      </button>
    </div>
  );
};
