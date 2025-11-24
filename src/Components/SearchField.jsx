import { useState } from "react";
import en from "../translations/en.json";
import ar from "../translations/ar.json";

const translations = {
  en,
  ar,
};

const SearchField = ({ onSearch, isLoading, keywordCb, cityCb }) => {
  const [t] = useState(translations[localStorage.getItem("language") || "en"]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    keywordCb(searchKeyword);
    cityCb(searchCity);
    onSearch(searchKeyword, searchCity);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          id="searchKeyword"
          placeholder={t.home.searchKeywords}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          id="searchCity"
          placeholder={t.home.searchCities}
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>
      <button type="submit" className="search-button" disabled={isLoading}>
        {t.home.search}
      </button>
    </form>
  );
};

export default SearchField;
