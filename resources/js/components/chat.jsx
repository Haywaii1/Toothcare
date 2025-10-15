import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyC4CN64XNRMxsndRMYUvpLBu-6SNGxFd7s";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const suggestedQuestions = [
    "How often should I brush my teeth?",
    "What causes bad breath?",
    "What toothpaste should I use?",
    "What is gum disease?",
    "When should children start seeing a dentist?"
  ];

  const imageMap = {
    toothpaste: "https://cdn-icons-png.flaticon.com/128/2975/2975176.png",
    floss: "https://cdn-icons-png.flaticon.com/128/2857/2857095.png",
    cavity: "https://cdn-icons-png.flaticon.com/128/5137/5137152.png",
    toothbrush: "https://cdn-icons-png.flaticon.com/128/3177/3177363.png",
    braces: "https://cdn-icons-png.flaticon.com/128/949/949756.png",
    gum: "https://cdn-icons-png.flaticon.com/128/995/995491.png",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbox = () => {
    setMessages([]);
    setIsOpen(!isOpen);
    setIsMaximized(false);
  };

  const enhanceResponse = (text) => {
    const lower = text.toLowerCase();
    const keyword = Object.keys(imageMap).find(k => lower.includes(k));
    const icon = keyword ? `<img src="${imageMap[keyword]}" alt="${keyword}" style="height:40px;margin-bottom:10px" />` : '';

    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');

    return `${icon}${formatted}`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { sender: 'user', text: inputMessage.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const reply = await generateDentalResponse(userMsg.text);
      const aiMsg = { sender: 'ai', text: reply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDentalResponse = async (prompt) => {
    const payload = {
      contents: [{
        role: "user",
        parts: [{
          text: `You are a helpful dental AI. Only answer dental-related questions with clear formatting.\n\nUser: ${prompt}`
        }]
      }]
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
  };

  const handleSuggestedClick = (q) => {
    setInputMessage(q);
    setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 50);
  };

  return (
    <>
      <button
        onClick={toggleChatbox}
        className="btn btn-primary rounded-circle shadow-lg position-fixed bottom-0 end-0 m-4"
        style={{ width: 56, height: 56, zIndex: 1050 }}
      >
        💬
      </button>

      {isOpen && (
        <div
          className="card position-fixed d-flex flex-column shadow"
          style={{
            zIndex: 1040,
            bottom: isMaximized ? 0 : '64px',
            right: isMaximized ? 0 : '1rem',
            left: isMaximized ? 0 : 'auto',
            width: isMaximized ? '100%' : '320px',
            height: isMaximized ? '100vh' : '440px',
            borderRadius: isMaximized ? 0 : '0.5rem',
            transition: 'all 0.3s ease-in-out',
            overflow: 'hidden'
          }}
        >
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
            <h5 className="m-0">Dental AI Chat</h5>
            <div>
              <button
                onClick={() => setIsMaximized(prev => !prev)}
                className="btn btn-sm btn-light me-2"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? "🗕" : "🗖"}
              </button>
              <button onClick={toggleChatbox} className="btn-close btn-close-white"></button>
            </div>
          </div>

          <div className="card-body overflow-auto px-3 py-2" style={{ flex: 1 }}>
            {messages.length === 0 && !isLoading && (
              <div className="text-center text-muted mt-4">Ask a question about dental care</div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`p-2 mb-2 rounded shadow-sm ${
                    msg.sender === 'user' ? 'bg-info-subtle text-dark' : 'bg-light text-dark'
                  }`}
                  style={{ maxWidth: '80%' }}
                  dangerouslySetInnerHTML={{
                    __html: msg.sender === 'ai' ? enhanceResponse(msg.text) : msg.text
                  }}
                />
              </div>
            ))}
            {isLoading && (
              <div className="text-start text-secondary">AI is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 0 && (
            <div className="card-footer bg-light p-3">
              <small className="fw-semibold d-block mb-2">Try asking:</small>
              <div className="row g-2">
                {suggestedQuestions.map((q, i) => (
                  <div className="col-6" key={i}>
                    <button onClick={() => handleSuggestedClick(q)} className="btn btn-outline-primary btn-sm w-100 rounded-pill">
                      {q}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="card-footer d-flex align-items-center p-3 border-top">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Ask about teeth..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading || !inputMessage.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
