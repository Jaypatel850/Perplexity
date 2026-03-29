import React, { useEffect, useState, useRef } from "react";
import { useChat, useFetchChats, useFetchMessages, useDeleteChat } from "../hooks/usechat";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Dashboard.scss";

const Dashboard = () => {
  const { id } = useParams();
  const { socket, HandleSendMessage } = useChat();
  const fetchUserChats = useFetchChats();
  const fetchChatMessages = useFetchMessages();
  const deleteChatById = useDeleteChat();
  const navigate = useNavigate();

  const user = useSelector((s) => s.auth);
  const chatsMap = useSelector((s) => s.chat.chats);
  const isLoading = useSelector((s) => s.chat.isloading);
  const chatError = useSelector((s) => s.chat.error);

  const [chatMessage, setChatMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const userName = user?.user?.name || user?.name || "Guest";
  const userId = user?.user?._id || user?.user?.id || user?._id || user?.id;

  const chatList = Object.values(chatsMap).sort(
    (a, b) => new Date(b.lastupdated) - new Date(a.lastupdated)
  );
  const currentMessages = id && chatsMap[id] ? chatsMap[id].messages : [];

  // Init: socket + load all chats
  useEffect(() => {
    socket();
    if (userId) fetchUserChats(userId);
  }, [userId]);

  // Load messages when switching chats
  useEffect(() => {
    if (id) fetchChatMessages(id);
    inputRef.current?.focus();
  }, [id]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length, isTyping]);

  const handleSend = async () => {
    const content = chatMessage.trim();
    if (!content || isLoading) return;
    setChatMessage("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setIsTyping(true);
    const newChatId = await HandleSendMessage(content, id || null);
    setIsTyping(false);
    if (newChatId && !id) navigate(`/chat/${newChatId}`);
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    const ok = await deleteChatById(chatId);
    if (ok && id === chatId) navigate("/dashboard");
  };

  const formatTime = (iso) =>
    iso ? new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  const formatRelative = (iso) => {
    if (!iso) return "";
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    if (d === 1) return "Yesterday";
    return `${d}d ago`;
  };

  const suggestions = [
    { icon: "✦", text: "Explain quantum computing in simple terms", color: "purple" },
    { icon: "⚡", text: "Write a Python script to analyze CSV data", color: "blue" },
    { icon: "🎨", text: "Design a modern REST API architecture", color: "pink" },
    { icon: "📊", text: "Compare React vs Vue for a new project", color: "teal" },
  ];

  return (
    <div className={`dash-root ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo" onClick={() => navigate("/dashboard")} role="button">
            <div className="logo-gem">N</div>
            <span className="logo-text">Neon Oracle</span>
          </div>
          <button className="new-chat-btn" onClick={() => navigate("/dashboard")} id="new-chat-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            New chat
          </button>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">Recent</span>
          <div className="chat-list">
            {chatList.length === 0 ? (
              <p className="empty-chats">No chats yet</p>
            ) : (
              chatList.map((c) => (
                <div
                  key={c.id}
                  className={`chat-item ${id === c.id ? "active" : ""}`}
                  onClick={() => navigate(`/chat/${c.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/chat/${c.id}`)}
                >
                  <svg className="chat-item-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="chat-item-info">
                    <span className="chat-item-title">{c.title || "New Chat"}</span>
                    <span className="chat-item-time">{formatRelative(c.lastupdated)}</span>
                  </div>
                  <button
                    className="chat-item-delete"
                    title="Delete chat"
                    onClick={(e) => handleDelete(e, c.id)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="user-item">
            <span className="user-item-name">{userName}</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <header className="dash-header">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} id="sidebar-toggle-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {!sidebarOpen && (
            <div className="header-logo" onClick={() => navigate("/dashboard")}>
              <div className="logo-gem small">N</div>
              <span>Neon Oracle</span>
            </div>
          )}
          <div className="header-right">
            {chatError && <div className="header-error" title={chatError}>⚠ Error</div>}
          </div>
        </header>

        <div className="dash-content">
          {!id ? (
            <div className="welcome-screen">
              <div className="welcome-orb" />
              <div className="welcome-inner">
                <div className="welcome-logo"><div className="wl-gem">N</div></div>
                <h1 className="welcome-headline">Hello, {userName.split(" ")[0]}</h1>
                <p className="welcome-sub">How can I help you today?</p>
                <div className="suggestion-grid">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      className={`suggestion-card color-${s.color}`}
                      onClick={() => { setChatMessage(s.text); setTimeout(() => inputRef.current?.focus(), 50); }}
                      id={`suggestion-${i}`}
                    >
                      <span className="sc-icon">{s.icon}</span>
                      <span className="sc-text">{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="chat-window">
              {currentMessages.length === 0 && !isLoading && (
                <div className="empty-chat-hint">Send a message to start.</div>
              )}

              {currentMessages.map((msg, i) => (
                <div key={i} className={`message-row ${msg.role}`}>
                  <div className={`msg-bubble ${msg.role}-bubble`}>
                    <p className="msg-text">{msg.message}</p>
                    {msg.role === "assistant" && (
                      <button className="copy-btn" title="Copy"
                        onClick={() => navigator.clipboard.writeText(msg.message)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <span className={`msg-time ${msg.role === "user" ? "right" : ""}`}>{formatTime(msg.timestamp)}</span>
                </div>
              ))}

              {isTyping && (
                <div className="message-row assistant">
                  <div className="msg-bubble assistant-bubble">
                    <div className="typing-indicator"><span /><span /><span /></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          <div className="input-zone">
            <div className="input-container">
              <textarea
                ref={inputRef}
                className="chat-input"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask anything..."
                rows={1}
                id="chat-input-field"
                disabled={isLoading}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                onInput={(e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px"; }}
              />
              <div className="input-actions">
                <span className="input-hints">
                  {isLoading ? <span className="loading-hint">Generating...</span> : "Shift+Enter for new line"}
                </span>
                <button
                  className={`send-btn ${chatMessage.trim() && !isLoading ? "active" : ""}`}
                  id="send-message-btn"
                  disabled={!chatMessage.trim() || isLoading}
                  onClick={handleSend}
                >
                  {isLoading ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="spin-icon">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="input-disclaimer">Neon Oracle can make mistakes. Verify important information.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
