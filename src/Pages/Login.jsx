import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [t, setT] = useState(
    translations[localStorage.getItem("language") || "en"]
  );

  useEffect(() => {
    console.log("Login component mounted");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Logging in with email:", email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      saveAuthState(userCredential.user);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <h1 className="app-title">{t.app?.title}</h1>
      <h2 className="login-title">{t.login?.title}</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">{t.login.email}</label>
          <input
            type="email"
            id="email"
            placeholder={t.login.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t.login.password}</label>
          <input
            type="password"
            id="password"
            placeholder={t.login.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? t.login.loading : t.login.submit}
        </button>
      </form>
      <p className="signup-text">
        {t.login.noAccount}{" "}
        <Link to="/register" className="signup-link">
          {t.login.register}
        </Link>
      </p>

      <LanguageSwitch setLanguage={setT} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
