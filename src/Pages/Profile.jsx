import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Card } from "../Components";
import { useFavourites } from "../Hooks";
import { getAuthState } from "../utils/auth";
import en from "../translations/en.json";
import ar from "../translations/ar.json";
import "../css/profile.css";

const translations = {
  en,
  ar,
};

const Profile = () => {
  const { user } = getAuthState();
  const { favourites, setFavourite, getFavourites } = useFavourites();
  const [t, setT] = useState(
    translations[localStorage.getItem("language") || "en"]
  );
  const navigate = useNavigate();
  const [favouriteEvents, setFavouriteEvents] = useState([]);

  useEffect(() => {
    // Refresh favourites when component mounts or favourites change
    getFavourites();
  }, []);

  useEffect(() => {
    // Convert favourites object to array whenever favourites change
    const eventsArray = Object.values(favourites);
    setFavouriteEvents(eventsArray);
  }, [favourites]);

  const handleEventClick = (event) => {
    navigate(`/${event.id}`, { state: { event: event } });
  };

  const handleRemoveFavourite = (event, e) => {
    e.stopPropagation();
    setFavourite(event);
  };

  return (
    <div className="profile-container">
      <Nav setLanguage={setT} />
      <div className="profile-content">
        <h1 className="profile-title">{t.profile.title}</h1>

        {/* User Information and Account Settings in Grid */}
        <div className="profile-info-grid">
          {/* User Information Section */}
          <div className="profile-section">
            <h2 className="profile-section-title">{t.profile.userInfo}</h2>
            <div className="profile-info-card">
              <div className="profile-info-item">
                <strong>{t.profile.email}:</strong> {user?.email || "N/A"}
              </div>
              {user?.displayName && (
                <div className="profile-info-item">
                  <strong>{t.profile.displayName}:</strong> {user.displayName}
                </div>
              )}
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="profile-section">
            <h2 className="profile-section-title">
              {t.profile.accountSettings}
            </h2>
            <div className="profile-info-card">
              <div className="profile-info-item">
                <strong>{t.profile.language}:</strong>{" "}
                {localStorage.getItem("language") === "ar"
                  ? "العربية"
                  : "English"}
              </div>
              <div className="profile-info-item">
                <strong>{t.profile.totalFavourites}:</strong>{" "}
                {favouriteEvents.length}
              </div>
            </div>
          </div>
        </div>

        {/* Favourites Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">
            {t.profile.favourites} ({favouriteEvents.length})
          </h2>
          {favouriteEvents.length > 0 ? (
            <div className="favourites-grid">
              {favouriteEvents.map((event) => {
                const isFavourite = favourites[event.id];
                const image = event.images?.find(
                  (image) =>
                    image.url.includes("RETINA") && image.url.includes("jpg")
                )?.url;

                return (
                  <Card key={event.id} onClick={() => handleEventClick(event)}>
                    {image && <img src={image} alt={event.name} width={445} />}
                    <h2>{event.name}</h2>
                    {event.promoter?.name && <p>{event.promoter.name}</p>}
                    <p>{event.dates?.start?.localDate}</p>
                    <p>{event.dates?.start?.localTime}</p>
                    <button
                      className={`favourite-btn ${
                        isFavourite ? "favourite-active" : ""
                      }`}
                      onClick={(e) => handleRemoveFavourite(event, e)}
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
            <div className="no-favourites">
              <p>{t.profile.noFavourites}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
