import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../style/Landing.scss';
// Link not used here
const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 21C11.5 21 12 14.5 18.5 13.5C12 12.5 11.5 6 11.5 6C11.5 6 11 12.5 4.5 13.5C11 14.5 11.5 21 11.5 21Z" fill="#A855F7"/>
    <path d="M19 8.5C19 8.5 19.3333 6.16667 21.5 5.83333C19.3333 5.5 19 3.16667 19 3.16667C19 3.16667 18.6667 5.5 16.5 5.83333C18.6667 6.16667 19 8.5 19 8.5Z" fill="#A855F7"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NodesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="6" height="6" rx="1" fill="#A855F7"/>
    <rect x="14" y="4" width="6" height="6" rx="1" fill="#A855F7"/>
    <rect x="4" y="14" width="6" height="6" rx="1" fill="#A855F7"/>
    <path d="M7 10V14" stroke="#A855F7" strokeWidth="2"/>
    <path d="M10 7H14" stroke="#A855F7" strokeWidth="2"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#A855F7" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

const Landingpage = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (loading) return; // still resolving session
    if (user) navigate('/dashboard');
    else {
      navigate('/login');
    }
  };

  const handleLoginNav = () => navigate('/login');

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <h1>Neon Oracle</h1>
        </div>
        
        <div className="nav-actions">
          {!user && (
            <button className="btn-login" onClick={handleLoginNav}>Login</button>
          )}
          <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="pill">
            <span className="dot"></span>
            POWERED BY GEMINI 2.5 LITE
          </div>
          <h1 className="hero-title">Accelerate Your Synthesi<span>s.</span></h1>
          <p className="hero-subtitle">
            Harness the power of Gemini 2.5 Lite to analyze research, summarize lectures, and draft complex papers in seconds.
          </p>
          <button className="btn-hero" onClick={handleGetStarted}>Get Started for Free</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card tall">
            <div className="icon-wrapper">
              <SparkleIcon />
            </div>
            <h3>Smart Summarization</h3>
            <p>Distill 50-page research papers into core insights, methodology highlights, and critical conclusions instantly.</p>
            <div className="ui-placeholder">
              {/* Abstract UI lines */}
              <div className="line title-line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line short"></div>
              <div className="circle-bg"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="icon-wrapper">
              <ShieldIcon />
            </div>
            <h3>Academic Integrity</h3>
            <p>Built-in safeguards ensure your work remains original while augmenting your creative output with factual precision.</p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="icon-wrapper">
              <NodesIcon />
            </div>
            <h3>Neural Citations</h3>
            <p>Automatically format references in APA, MLA, or Chicago styles with direct links to source material.</p>
          </div>

          {/* Card 4 */}
          <div className="feature-card intelligence-card">
            <div className="text-content">
              <h3>Latency-Free Intelligence</h3>
              <p>Powered by Gemini 2.5 Lite, Neon Oracle provides near-instant responses optimized for academic workflows.</p>
            </div>
            <div className="graphic-content">
              <div className="circle-indicator">
                <span>2.5L</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Student Voice */}
      <section className="testimonial-section">
        <div className="testimonial-content">
          <div className="illustration-box">
            {/* Using a placeholder for the illustration but keeping the layout same */}
            <div className="illustration-placeholder">
               {/* This will be styled in CSS to mimic the layout */}
               <div className="person-silhouette">
                  <div className="head"></div>
                  <div className="body">
                    <div className="tie"></div>
                  </div>
               </div>
            </div>
          </div>
          <div className="quote-box">
            <span className="label">STUDENT VOICE</span>
            <h2>"Moving an hand with AI"</h2>
            <p className="quote-text">
              "As an graduate student, I have created an application just like chatgpt to make an step forward in MY full-stack journey"
            </p>
            <div className="author-info">
              <h4>Jay Patel</h4>
              <p>Freelance Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to transcend the clutter?</h2>
          <p>Join 50,000+ students leveraging AI to build better research and clearer papers.</p>
          <button className="btn-white">Join the Oracle</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <h2>Neon Oracle</h2>
        </div>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-copy">
          <p>© 2026 Neon Oracle, Powered by Gemini 2.5 Lite.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;