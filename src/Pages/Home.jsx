import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card, Event, Nav, SearchField } from "../Components";
import { useFavourites, useApi } from "../Hooks";
import en from "../translations/en.json";
import ar from "../translations/ar.json";
import "../css/home.css";

const translations = {
  en,
  ar,
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [selectedVenue, setSelectedVenue] = useState(null);
  const { favourites, setFavourite } = useFavourites();
  const [t, setT] = useState(
    translations[localStorage.getItem("language") || "en"]
  );
  const { eventId } = useParams();
  const location = useLocation();
  const { fetchEvents, searchEvents } = useApi();
  const defaultPageSize = parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE || '20', 10);
  const defaultLocale = process.env.REACT_APP_DEFAULT_LOCALE || '*';

  useEffect(() => {
    if (eventId) {
      setShowEvent(true);
      setSelectedEvent(location.state.event);
    }
    getEvents(0, defaultPageSize);
  }, []);

  const getEvents = async (page = 0, size = defaultPageSize) => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        locale: defaultLocale,
        page: page,
        size: size,
      });
      const data = await fetchEvents(params);
      setEvents(data._embedded.events);
      setPagination(data.page);
      console.log("Ticketmaster response", data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (
    searchKeyword,
    searchCity,
    page = 0,
    size = defaultPageSize
  ) => {
    setIsLoading(true);

    const params = new URLSearchParams({
      locale: defaultLocale,
      page: page,
      size: size,
    });

    if (searchKeyword && searchKeyword.length > 0) {
      params.append("keyword", searchKeyword);
    }

    if (searchCity && searchCity.length > 0) {
      const cities = searchCity
        .split(",")
        .map((city) => city.trim())
        .filter((city) => city.length > 0);
      cities.forEach((city) => {
        params.append("city", city);
      });
    }

    try {
      const response = await searchEvents(params);
      if (response._embedded && response._embedded.events) {
        setEvents(response._embedded.events);
        setPagination(response.page || {});
      } else {
        setEvents([]);
        setPagination(response.page || {});
        console.log("No events found for the search criteria");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
      setPagination({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = async (event) => {
    const apiKey = process.env.REACT_APP_TICKETMASTER_APIKEY;

    if (!apiKey) {
      console.error("Missing API key");
      return;
    }

    setShowEvent(true);
    setSelectedEvent(event);
  };

  const handleHomeClick = () => {
    setShowEvent(false);
    setSelectedEvent(null);
  };

  return (
    <div className="home-container">
      <Nav setLanguage={setT} handleHomeClick={handleHomeClick} />
      <div className="home-content">
        <h1 className="page-title">{!showEvent && t.home.title}</h1>
        {!showEvent && (
          <>
            <SearchField
              onSearch={handleSearch}
              isLoading={isLoading}
              keywordCb={setSearchKeyword}
              cityCb={setSearchCity}
            />
            {Object.keys(pagination).length > 0 && !isLoading && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => {
                    if (searchKeyword.length > 0 || searchCity.length > 0) {
                      handleSearch(
                        searchKeyword,
                        searchCity,
                        pagination.number - 1,
                        defaultPageSize
                      );
                    } else {
                      getEvents(pagination.number - 1, defaultPageSize);
                    }
                  }}
                  disabled={pagination.number === 0}
                >
                  {t.home.previous}
                </button>
                <span className="pagination-info">
                  {pagination.number + 1} {t.home.of} {pagination.totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => {
                    if (searchKeyword.length > 0 || searchCity.length > 0) {
                      handleSearch(
                        searchKeyword,
                        searchCity,
                        pagination.number + 1,
                        defaultPageSize
                      );
                    } else {
                      getEvents(pagination.number + 1, defaultPageSize);
                    }
                  }}
                  disabled={pagination.number === pagination.totalPages - 1}
                >
                  {t.home.next}
                </button>
              </div>
            )}
          </>
        )}
        {!isLoading && !showEvent && events.length > 0 ? (
          <div className="cards-grid">
            {events.map((event) => {
              const isFavourite = favourites[event.id];
              const image = event.images.find((image) => {
                return (
                  image.url.includes("RETINA") && image.url.includes("jpg")
                );
              })?.url;
              return (
                <Card
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  image={image}
                >
                  <img src={image} alt={event.name} width={445} />
                  <h2>{event.name}</h2>
                  <p>{event.promoter?.name}</p>
                  <p>
                    <strong>{t.event.venue}:</strong>{" "}
                    {event._embedded.venues[0].name}
                  </p>
                  <p>
                    <strong>{t.event.date}:</strong>{" "}
                    {event.dates.start.localDate}
                  </p>
                  <p>
                    <strong>{t.event.time}:</strong>{" "}
                    {event.dates.start.localTime}
                  </p>
                  <button
                    className={`favourite-btn ${
                      isFavourite ? "favourite-active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFavourite(event);
                    }}
                    aria-label={
                      isFavourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  >
                    <span className="heart">♥</span>
                  </button>
                </Card>
              );
            })}
          </div>
        ) : (
          !isLoading &&
          !showEvent && <div className="no-events">{t.home.noEventsFound}</div>
        )}
        {isLoading && <div className="loading">{t.home.loading}</div>}
        {showEvent && (
          <Event
            event={selectedEvent}
            t={t.event}
            favourites={favourites}
            setFavourite={setFavourite}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
