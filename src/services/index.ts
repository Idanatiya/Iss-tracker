import { ISSApiRes, IssLocation } from "../types";

const STORAGE_KEY = "savedLocations";

export const onReqISSLocation = async () => {
  try {
    const res = await fetch("https://melodious-peony-daa078.netlify.app/api");
    const {
      iss_position: { latitude, longitude },
      timestamp,
    }: ISSApiRes = await res.json();
    const location = {
      latitude,
      longitude,
      timestamp,
    };
    return location;
  } catch (error) {
    throw new Error("Failed to get ISS Location!");
  }
};

const getSavedLocations = () => {
  const savedLocations = localStorage.getItem(STORAGE_KEY);
  if (savedLocations) return JSON.parse(savedLocations);
  return [];
};

const saveLocations = (locations: IssLocation[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
};

const clearLocations = () => localStorage.removeItem(STORAGE_KEY);

export const locationService = {
  getSavedLocations,
  onReqISSLocation,
  saveLocations,
  clearLocations,
};
