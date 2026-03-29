import React, { useEffect, useState } from "react";
import { useChat } from "../hooks/usechat";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Dashboard.scss";

const Dashboard = () => {
  const { id } = useParams();
  const chat = useChat();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState("");
  useEffect(() => {
    console.log("🚀 Dashboard mounted, starting socket services...");
    chat.socket();
  }, []);

  const dummytitle = [
    {
      id: "1",
      title: "Gaming Monitor Recommendations",
    },
  ];

  const dummymessages = [
    {
      role: "user",
      content: "Suggest me a gaming monitor under budget",
      time: "10:30 AM",
    },
    {
      role: "assistant",
      content:
        "For a budget-friendly gaming experience, I recommend looking at 24-inch 1080p monitors with at least 144Hz refresh rate and an IPS panel for better color accuracy. Popular options include the LG UltraGear 24GN600-B or the AOC 24G2. They offer great response times and are usually priced very competitively.",
      time: "10:31 AM",
    },
    {
      role: "user",
      content: "Is 240Hz worth it for casual gaming?",
      time: "10:32 AM",
    },
    {
      role: "assistant",
      content:
        "Honestly, for casual gaming, 144Hz is already a massive leap from standard 60Hz. 240Hz is mostly beneficial for professional esports players where every millisecond counts. Unless you have a high-end GPU that can consistently push 240+ FPS, you're better off spending that extra money on a higher resolution (like 1440p) or better color quality.",
      time: "10:33 AM",
    },
  ];

  const renderTitle = dummytitle.map((title, index) => (
    <div
      key={index}
      className={`chat-title ${id === title.id ? "active" : ""}`}
      onClick={() =>
        navigate(`/chat/${title.id}`, { state: { chatId: title.id } })
      }
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter")
          navigate(`/chat/${title.id}`, { state: { chatId: title.id } });
      }}
    >
      <div className="title-icon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span>{title.title}</span>
    </div>
  ));

  const rendermessage = dummymessages.map((message, index) => (
    <div key={index} className={`message-wrapper ${message.role}`}>
      <div className="avatar">
        {message.role === "assistant" ? (
          <div className="ai-avatar">
            <div className="ai-glow"></div>
            <span>O</span>
          </div>
        ) : (
          <div className="user-avatar">
            <span>{user?.name?.[0] || "User"}</span>
          </div>
        )}
      </div>
      <div className="message-content">
        <div className="bubble">
          <p>{message.content}</p>
        </div>
        <span className="timestamp">{message.time}</span>
      </div>
    </div>
  ));

  return (
    <div className="Main-section">
      <div className="Navbar">
        <div
          className="left"
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          <h1>Neon Oracle</h1>
        </div>
        <div className="right">
          <div className="user-profile">
            <span className="user-name">{user?.name || "Guest"}</span>
            <div className="status-dot"></div>
          </div>
        </div>
      </div>
      <section>
        <div className="left-sidebar">
          <div className="Model-selector">
            <div className="model-info">
              <h1>Gemini-2.5 lite</h1>
              <span className="model-status">Online</span>
            </div>
            <button
              className="new-chat-btn"
              onClick={() => navigate("/dashboard")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              New Synthesis
            </button>
          </div>
          <div className="Chat-list-container">
            <h3>Recent Connections</h3>
            <div className="Chat-list">{renderTitle}</div>
          </div>
        </div>
        <div className="right-chat-area">
          {!id ? (
            <div className="welcome-screen">
              <h1>Use the Intelligence</h1>
              <p>
                The Archive holds the echoes of your previous syntheses. Select
                a thread or initiate a new quantum connection.
              </p>
              <div className="suggestion-grid">
                <div
                  className="suggestion-card"
                  onClick={() => navigate("/chat/1")}
                >
                  <div className="card-icon">⚡</div>
                  <span>Optimize code for ultra-low latency</span>
                </div>
                <div className="suggestion-card">
                  <div className="card-icon">🔐</div>
                  <span>Analyze quantum-resistant encryption</span>
                </div>
                <div className="suggestion-card">
                  <div className="card-icon">🎨</div>
                  <span>Generate futuristic UI design system</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="Chat-window">
              {rendermessage}
              <div className="typing-indicator assistant">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
          <div className="Chat-input-container">
            <div className="Chat-input">
              <input type="text" placeholder="Ask something..." />
              <button className="send-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="input-hint">Press Enter to transmit</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
