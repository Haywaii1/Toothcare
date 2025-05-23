import React, { useState, useEffect, useRef } from 'react';
// Note: You would typically link Bootstrap CSS in your public/index.html or import it globally.
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>


function App() {
  const [isOpen, setIsOpen] = useState(false); // State to control chatbox visibility
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // API Key (empty string as per instructions, Canvas will provide at runtime)
  // If you are consistently getting "unregistered callers" errors, it means the Canvas
  // environment is not injecting the API key as expected.
  const API_KEY = "AIzaSyC4CN64XNRMxsndRMYUvpLBu-6SNGxFd7s";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const suggestedQuestions = [
    "How often should I brush my teeth?",
    "What causes bad breath?",
    "How can I prevent cavities?",
    "What is gum disease?",
    "When should children start seeing a dentist?",
    "What foods are bad for my teeth?",
    "How often should I floss?",
    "What is a root canal?",
    "What are dental implants?",
    "How do I choose the right toothbrush?"
  ];

  // Scroll to the bottom of the chat area when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle chatbox visibility
  const toggleChatbox = () => {
    setIsOpen((prevIsOpen) => {
      // If closing the chatbox, clear the messages for a fresh start
      if (prevIsOpen) {
        setMessages([]);
      }
      return !prevIsOpen;
    });
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = { sender: 'user', text: inputMessage.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateDentalResponse(userMessage.text);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: "Sorry, I couldn't get a response. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate AI response using Gemini API
  const generateDentalResponse = async (prompt) => {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: `You are a helpful AI assistant specializing in dental care. Your purpose is to provide accurate and helpful information related ONLY to dental health, oral hygiene, and common dental procedures. If a user asks a question that is not related to dental care, politely inform them that you can only answer questions about dental health. Do not answer questions outside of this scope.

User: ${prompt}` }] });

    const payload = { contents: chatHistory };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("Gemini API Raw Response:", result); // Log the full response for debugging

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        return text;
      } else {
        console.error("Gemini API: No candidates found or unexpected response structure.", result);
        // Check for specific error messages from the API if available
        if (result.error && result.error.message) {
            return `API Error: ${result.error.message}`;
        }
        return "Sorry, I couldn't understand that. Can you rephrase?";
      }
    } catch (error) {
      console.error("Failed to fetch from Gemini API:", error);
      // More specific error message for network or other fetch issues
      return `Network Error: ${error.message}. Please check your internet connection or try again.`;
    }
  };

  // Handle clicking on a suggested question
  const handleSuggestedQuestionClick = (question) => {
    setInputMessage(question);
    // Automatically send the message after setting it
    setTimeout(() => {
      handleSendMessage({ preventDefault: () => {} }); // Pass a dummy event object
    }, 50); // Small delay to allow state update
  };

  return (
    <>
      {/* Floating Chat Button - Positioned at bottom right */}
      <button
        onClick={toggleChatbox}
        className="btn btn-primary rounded-circle shadow-lg position-fixed bottom-0 end-0 m-4"
        style={{ width: '56px', height: '56px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}
        aria-label="Open Dental Chatbox"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"></path>
        </svg>
      </button>

      {/* Chatbox Window - Only visible when isOpen is true */}
      {isOpen && (
        <div
          className="card shadow-lg d-flex flex-column position-fixed bottom-0 end-0 me-4 mb-5 rounded-3"
          style={{ width: '288px', height: '320px', zIndex: 1040, bottom: '64px' }}
        >
          {/* Chat Header */}
          <div className="card-header bg-primary text-white p-3 d-flex justify-content-between align-items-center rounded-top">
            <h3 className="card-title fs-5 fw-semibold m-0">Dental AI Chat</h3>
            <button
              onClick={toggleChatbox}
              className="btn-close btn-close-white"
              aria-label="Close Chatbox"
            ></button>
          </div>

          {/* Chat Messages */}
          <div className="card-body p-3 overflow-auto d-flex flex-column">
            {messages.length === 0 && (
              <div className="text-center text-secondary fst-italic mt-5">
                Ask me anything about dental care!
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`p-2 rounded mb-2 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-info-subtle text-dark ms-auto'
                      : 'bg-light text-dark me-auto'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="d-flex justify-content-start">
                <div className="p-2 rounded mb-2 bg-light text-secondary me-auto" style={{ maxWidth: '80%' }}>
                  AI is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>

          {/* Suggested Questions - Only visible when no messages are present */}
          {messages.length === 0 && (
            <div className="card-footer border-top p-3 bg-light">
              <p className="small fw-semibold mb-2">Suggested Questions:</p>
              <div className="row g-2 small">
                {suggestedQuestions.map((q, index) => (
                  <div key={index} className="col-6">
                    <button
                      onClick={() => handleSuggestedQuestionClick(q)}
                      className="btn btn-outline-primary btn-sm w-100 rounded-pill text-start"
                    >
                      {q}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="card-footer border-top p-3 d-flex align-items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your dental question..."
              className="form-control me-2 flex-grow-1"
              disabled={isLoading}
            />
            <button
  type="submit"
  className="btn btn-primary px-4"
  disabled={isLoading || !inputMessage.trim()}
>
  {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
  </svg> */}
  Submit
</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
