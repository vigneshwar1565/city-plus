import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/Firebase";
import { saveAuthState } from "../utils/auth";
import { LanguageSwitch } from "../Components";
import en from "../translations/en.json";
import ar from "../translations/ar.json";
import "../css/login.css";

const translations = {
  en,
  ar,
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [t, setT] = useState(
    translations[localStorage.getItem("language") || "en"]
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      saveAuthState(userCredential.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <h1 className="app-title">{t.app.title}</h1>
      <h2 className="login-title">{t.register.title}</h2>
      <form onSubmit={handleRegister} className="login-form">
        <div className="form-group">
          <label htmlFor="email">{t.register.email}</label>
          <input
            type="email"
            id="email"
            placeholder={t.register.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t.register.password}</label>
          <input
            type="password"
            id="password"
            placeholder={t.register.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">{t.register.confirmPassword}</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder={t.register.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? t.register.loading || "Loading..." : t.register.submit}
        </button>
      </form>
      <p className="signup-text">
        {t.register.hasAccount}{" "}
        <Link to="/login" className="signup-link">
          {t.register.login}
        </Link>
      </p>

      <LanguageSwitch setLanguage={setT} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
