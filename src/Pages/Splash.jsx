import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/splash.css";

const Splash = ({ onComplete }) => {
  const navigate = useNavigate();
  const splashDuration = parseInt(process.env.REACT_APP_SPLASH_DURATION || '3000', 10);

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.setItem(process.env.REACT_APP_SPLASH_SHOWN_KEY, "true");
      if (onComplete) {
        onComplete();
      } else {
        navigate("/", { replace: true });
      }
    }, splashDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate, onComplete, splashDuration]);
  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="splash-title">
          <span className="city-text">City</span>
          <span className="pulse-text"> Pulse</span>
        </h1>
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
