import { useEffect, useState } from "react";
import { useApi } from "../Hooks";
import "../App.css";

const Event = ({ event, t, favourites, setFavourite }) => {
  console.log("Event", event);
  console.log("t", t);
  const [venue, setVenue] = useState(null);
  const { fetchVenue } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setIsLoading(true);
      (async () => {
        try {
          const venueHref = event._links.venues[0].href;
          const venueId = venueHref.split("/").pop();
          const venueData = await fetchVenue(venueId);
          console.log("Venue data", venueData);
          setVenue(venueData);
        } catch (error) {
          console.error("Error fetching venue details", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const tabletImage =
    event.images?.find((image) => image.url.includes("TABLET_LANDSCAPE"))
      ?.url || event.images?.[0]?.url;

  const isFavourite = favourites?.[event.id];

  const googleMapsZoom = process.env.REACT_APP_GOOGLE_MAPS_ZOOM || '13';
  const googleMapsUrl = process.env.REACT_APP_GOOGLE_MAPS_EMBED_URL || 'https://maps.google.com/maps';

  return (
    <div className="event-details">
      <h1 className="event-title">{event.name}</h1>

      {event.promoter?.name && (
        <p className="event-info-item">
          <strong>{t.promoter}:</strong> {event.promoter.name}
        </p>
      )}
      <div className="event-image-container">
        {tabletImage && (
          <img
            src={tabletImage}
            alt={event.name}
            className="event-main-image"
          />
        )}
        <button
          className={`favourite-btn ${isFavourite ? "favourite-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setFavourite(event);
          }}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          <span className="heart">♥</span>
        </button>
      </div>

      <div className="event-content">
        {event.info && (
          <p className="event-info-item">
            <strong>{t.info}:</strong> {event.info}
          </p>
        )}
        {isLoading && <div className="loading-spinner">Venue loading...</div>}
        {venue && !isLoading && (
          <div className="event-venue-section">
            <p className="event-info-item">
              <strong>{t.venue}:</strong> {venue.name}, {venue.address?.line1},{" "}
              {venue.address?.line2}, {venue.city?.name}, {venue.state?.name},{" "}
              {venue.postalCode}
            </p>

            {venue.location?.latitude && venue.location?.longitude && (
              <div className="event-map-container">
                <iframe
                  title="Event Map"
                  src={`${googleMapsUrl}?q=${venue.location.latitude},${venue.location.longitude}&z=${googleMapsZoom}&output=embed`}
                  className="event-map"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        )}

        <div className="event-timings-section">
          {event.dates?.start?.localDate && (
            <p className="event-info-item">
              <strong>{t.date}:</strong> {event.dates.start.localDate}
            </p>
          )}

          {event.dates?.start?.localTime && (
            <p className="event-info-item">
              <strong>{t.time}:</strong> {event.dates.start.localTime}{" "}
              {event.dates.timezone || ""}
            </p>
          )}

          {event.pleaseNote && (
            <p className="event-info-item">
              <strong>{t.note}:</strong> {event.pleaseNote}
            </p>
          )}

          {event.sales?.public?.startDateTime && (
            <p className="event-info-item">
              <strong>{t.bookingStart}:</strong>{" "}
              {new Date(event.sales.public.startDateTime).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
