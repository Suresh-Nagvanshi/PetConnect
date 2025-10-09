// client/src/pages/PetChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatbotPage.css';

// SVG Icon Components
const PaperclipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
  </svg>
);

const TimesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Main Page Component
function PetChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Chat window ref
  const chatWindowRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm SmartCare AI, your personal pet health assistant. To get a diagnosis, please upload an image of the issue and/or describe the symptom in the text box below.",
        sender: 'bot'
      }
    ]);
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessageText = (text) => {
    return text.split('\n').map((line, i) => (
      <p key={i}>
        {line.includes('**')
          ? line.split('**').map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )
          : line}
      </p>
    ));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const prompt = inputValue.trim();

    // Allow prompt-only, image-only, or both.
    if (!prompt && !imageFile) {
      setMessages((prev) => [
        ...prev,
        { text: "Please provide a description or upload an image to proceed.", sender: 'bot' }
      ]);
      return;
    }

    setLoading(true);
    setInputValue('');
    setImageFile(null);

    const userMessage = {
      text: prompt || '(no text provided)',
      sender: 'user',
      imageURL: imageFile ? URL.createObjectURL(imageFile) : null
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      if (imageFile) {
        formData.append('petImage', imageFile);
      }

      const response = await fetch('/api/gemini/diagnose', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server error occurred during diagnosis.');

      setMessages((prev) => [...prev, { text: data.diagnosis, sender: 'bot' }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: `🚨 ERROR: ${err.message}. Please try again.`, sender: 'bot' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const imagePreview = imageFile && (
    <div className="image-preview-card">
      <img src={URL.createObjectURL(imageFile)} alt="Preview" />
      <button
        className="remove-image-btn"
        type="button"
        title="Remove image"
        onClick={() => setImageFile(null)}
      >
        <TimesIcon />
      </button>
    </div>
  );

  return (
    <div className="chatbot-page-container">
      <div className="left-panel">
        <img src="/SmartCareAI.png" alt="SmartCare AI Avatar" className="ai-avatar" />
        <h1 className="ai-title">SmartCare AI</h1>
        <p className="ai-description">
          Multimodal Pet Health Advisor<br /> Upload an image of the issue (e.g., rash, lump) and/or describe the symptoms for an AI-powered initial assessment.
        </p>
        <div className="example-prompts">
          <h3 className="prompts-title">Example descriptions:</h3>
          <ul>
            <li>"My dog has a red, swollen paw and is limping."</li>
          </ul>
        </div>
      </div>

      <div className="right-panel">
        <div className="chat-window" ref={chatWindowRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message-container ${message.sender}`}>
              {message.sender === 'bot' && (
                <img src="/SmartCareAI.png" alt="Bot Avatar" className="bot-avatar-chat" />
              )}
              <div className={`message ${message.sender}`}>
                {message.sender === 'user' && message.imageURL && (
                  <div className="user-uploaded-image-wrapper">
                    <img src={message.imageURL} alt="User Upload" className="user-uploaded-image" />
                  </div>
                )}
                {renderMessageText(message.text)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-container bot">
              <img src="/SmartCareAI.png" alt="Bot Avatar" className="bot-avatar-chat" />
              <div className="message bot loading">
                <p>Investigating the conditions... 🔍</p>
              </div>
            </div>
          )}
        </div>

        <div className="input-area">
          {imagePreview}
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <label htmlFor="image-upload" className="attach-button" aria-label="Upload Image">
              <PaperclipIcon />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => setImageFile(e.target.files[0])}
              disabled={loading}
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe symptoms..."
              className="chat-input"
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="chat-send-button"
              disabled={loading || (!inputValue.trim() && !imageFile)}
            >
              <svg className="send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PetChatbotPage;
