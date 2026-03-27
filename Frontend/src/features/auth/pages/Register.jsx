import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Register.scss";
import { useAuth } from "../hook/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../auth.slice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerUser } = useAuth();
  const { user, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      navigate("/");
    }
    // Clear any previous errors when the component mounts
    dispatch(setError(null));
  }, [user, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, email, password };
    const success = await registerUser(payload);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <section className="Register">
      <div className="Branding">
        <h1>Neon Oracle</h1>
        <p className="SubHeading"><span></span> QUANTUM ENGINE SECURE</p>
      </div>

      <div id="RegisterPAGE">
        <div id="Heading">
          <h2>Create New</h2>
          <h2>Neural ID</h2>
          <p>Initialize your profile for collective synchronization.</p>
        </div>
        
        <div className="Form">
          {error && <div className="ErrorMessage">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="InputGroup">
              <label htmlFor="username">Interface Identifier</label>
              <div className="InputWrapper">
                <span className="icon">👤</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="display-name"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="InputGroup">
              <label htmlFor="email">Neural Address</label>
              <div className="InputWrapper">
                <span className="icon">@</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="neural-address@network.io"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="InputGroup">
              <label htmlFor="password">Access Key Seed</label>
              <div className="InputWrapper">
                <span className="icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="AccessButton" disabled={loading}>
              {loading ? "Initializing..." : "Initialize Sync"} <span className="bolt">⚡</span>
            </button>
          </form>

          <div className="Link">
            <p>
              Already in the network? <Link to="/login">Re-establish Link</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="FooterLinks">
        <div className="links">
          <Link to="/privacy">Privacy Protocols</Link>
          <Link to="/terms">Terms of Sync</Link>
          <Link to="/specs">Hardware Specs</Link>
        </div>
        <p>© 2024 NEON ORACLE SYSTEMS. ALL RIGHTS RESERVED.</p>
      </div>
    </section>
  );
};

export default Register;