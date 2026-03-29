import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../style/Landing.scss';

const Landingpage = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGetStarted = () => {
    if (loading) return;
    if (user) navigate('/dashboard');
    else navigate('/login');
  };

  const features = [
    {
      icon: '✦',
      title: 'Multimodal Understanding',
      desc: 'Process text, code, and complex documents simultaneously with deep contextual awareness.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: '⚡',
      title: 'Near-Zero Latency',
      desc: 'Responses generated in milliseconds, powered by optimized inference pipelines.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      desc: 'End-to-end encrypted conversations with zero data retention policies.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: '🧠',
      title: 'Long Context Memory',
      desc: 'Retain and reference context across entire documents and sessions seamlessly.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const stats = [
    { value: '2.5M+', label: 'Queries Processed' },
    { value: '50K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '<200ms', label: 'Avg Response' },
  ];

  return (
    <div className="landing-root">
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* Navbar */}
      <nav className="lp-nav">
        <div className="lp-nav__logo">
          <div className="logo-mark">N</div>
          <span>Neon Oracle</span>
        </div>
        <div className="lp-nav__links">
          <a href="#features">Features</a>
          <a href="#stats">About</a>
        </div>
        <div className="lp-nav__actions">
          {!user && (
            <button className="btn-ghost" onClick={() => navigate('/login')}>
              Sign In
            </button>
          )}
          <button className="btn-primary-nav" onClick={handleGetStarted} id="hero-cta-nav">
            {user ? 'Open App' : 'Get Started'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="lp-hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          Powered by Gemini 2.5 · Now in Preview
        </div>

        <h1 className="hero-headline">
          Think deeper.<br />
          <span className="headline-accent">Build faster.</span>
        </h1>

        <p className="hero-sub">
          Neon Oracle is your AI-native workspace for research, coding, writing,
          and analysis — built for people who demand more from intelligence.
        </p>

        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={handleGetStarted} id="hero-cta-main">
            Start for free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-hero-ghost" onClick={() => navigate('/login')}>
            Learn more
          </button>
        </div>

        <div className="hero-ui-preview">
          <div className="preview-bar">
            <span className="preview-dot red" />
            <span className="preview-dot yellow" />
            <span className="preview-dot green" />
            <span className="preview-label">Neon Oracle · AI Chat</span>
          </div>
          <div className="preview-body">
            <div className="preview-sidebar">
              <div className="ps-item active" />
              <div className="ps-item" />
              <div className="ps-item" />
              <div className="ps-item" />
            </div>
            <div className="preview-chat">
              <div className="pc-bubble assistant">
                <div className="pc-avatar">N</div>
                <div className="pc-lines">
                  <div className="pcl long" />
                  <div className="pcl medium" />
                  <div className="pcl short" />
                </div>
              </div>
              <div className="pc-bubble user">
                <div className="pc-lines right">
                  <div className="pcl medium user-line" />
                  <div className="pcl long user-line" />
                </div>
                <div className="pc-avatar user-av">J</div>
              </div>
              <div className="pc-bubble assistant">
                <div className="pc-avatar">N</div>
                <div className="pc-lines">
                  <div className="pcl long" />
                  <div className="pcl medium" />
                </div>
              </div>
              <div className="typing-dots">
                <span /><span /><span />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lp-stats" id="stats">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="lp-features" id="features">
        <div className="section-header">
          <div className="section-pill">Capabilities</div>
          <h2>Everything you need to think at scale</h2>
          <p>One unified interface. Infinite possibilities.</p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="fc-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="fc-glow" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="lp-cta">
        <div className="cta-inner">
          <h2>Ready to experience the future of AI?</h2>
          <p>Join thousands of researchers, engineers, and creators using Neon Oracle.</p>
          <button className="btn-cta-white" onClick={handleGetStarted} id="cta-bottom-btn">
            Get started — it's free
          </button>
        </div>
        <div className="cta-orb" />
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="footer-left">
          <div className="lp-nav__logo">
            <div className="logo-mark small">N</div>
            <span>Neon Oracle</span>
          </div>
          <p>AI-powered workspace for modern minds.</p>
        </div>
        <div className="footer-center">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-right">
          <p>© 2026 Neon Oracle. Powered by Gemini 2.5.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;