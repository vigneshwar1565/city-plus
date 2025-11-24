import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import { logout } from "../utils/auth";
import en from "../translations/en.json";
import ar from "../translations/ar.json";

const translations = {
  en,
  ar,
};

const Nav = ({ setLanguage, handleHomeClick }) => {
  const location = useLocation();
  const [t] = useState(translations[localStorage.getItem("language") || "en"]);

  const handleHomeClickNav = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-left">
        <LanguageSwitch setLanguage={setLanguage} />
      </div>
      <div className="nav-center">
        <Link
          to="/"
          className="nav-title"
          onClick={handleHomeClick ? handleHomeClick : handleHomeClickNav}
        >
          {t.app?.title}
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/profile" className="nav-icon" title={t.nav.profile}>
          <i className="fi fi-rr-user"></i>
        </Link>
        <button className="nav-icon" onClick={logout} title={t.nav.logout}>
          <i className="fi fi-rr-sign-out-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
