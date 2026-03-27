import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.scss";
import { useAuth } from "../hook/useAuth"; 
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../auth.slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser } = useAuth();
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
    const payload = { email, password };
    const success = await loginUser(payload);
    if (success) {
      navigate("/");
    }
  };

  return (
    <section className="Login">
      <div className="Branding">
        <h1>Neon Oracle</h1>
        <p className="SubHeading"><span></span> QUANTUM ENGINE SECURE</p>
      </div>

      <div id="LoginPAGE">
        <div id="Heading">
          <h2>Re-establish</h2>
          <h2>Neural Link</h2>
          <p>Verification required for cognitive synchronization.</p>
        </div>
        <div className="Form">
          {error && <div className="ErrorMessage">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="InputGroup">
              <label htmlFor="email">Interface Identifier</label>
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
              <div className="LabelRow">
                <label htmlFor="password">Access Key</label>
                <Link to="/recovery" className="RecoveryLink">Key Recovery</Link>
              </div>
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
              {loading ? "Synchronizing..." : "Access Oracle"} <span className="bolt">⚡</span>
            </button>
          </form>
          
          <div className="Link">
            <p>
              New to the network? <Link to="/register">Join the Collective</Link>
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

export default Login;
