import { useCallback } from "react";

const useApi = () => {
  const apiKey = process.env.REACT_APP_TICKETMASTER_APIKEY;

  const fetchEvents = useCallback(
    async (params) => {
      const url = `/api/ticketmaster/events?${params.toString()}&apikey=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    [apiKey]
  );

  const searchEvents = useCallback(
    async (params) => {
      const url = `/api/ticketmaster/events?${params.toString()}&apikey=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    [apiKey]
  );

  const fetchVenue = useCallback(
    async (venueId) => {
      const url = `/api/ticketmaster/venues/${venueId}&apikey=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    [apiKey]
  );
  return { fetchEvents, fetchVenue, searchEvents };
};

export default useApi;
