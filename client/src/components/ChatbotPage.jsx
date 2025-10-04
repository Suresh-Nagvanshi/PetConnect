import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatbotPage.css';

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initial greeting from the bot
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm SmartCare AI, your personal pet health assistant. Ask me anything about your pet's symptoms or health concerns.",
        sender: 'bot'
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputValue('');

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = { text: "Thank you for your question. Based on the symptoms you've described, I am analyzing the potential issues... Please note, I am an AI assistant and not a substitute for professional veterinary advice.", sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1500);
    }
  };

  // This function handles the click on the example prompts
  const handleExamplePrompt = (prompt) => {
    const userMessage = { text: prompt, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botResponse = { text: `Thank you for asking about: "${prompt}". I am analyzing this now...`, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1500);
  };

  return (
    <div className="chatbot-page-container">
      <div className="left-panel">
        <img src="/SmartCareAI.png" alt="SmartCare AI Avatar" className="ai-avatar" />
        <h1 className="ai-title">SmartCare AI</h1>
        <p className="ai-description">
          Get instant, intelligent advice for your pet's health concerns. Describe the symptoms, and I'll provide guidance and information.
        </p>
        <div className="example-prompts">
          <h3 className="prompts-title">Try asking...</h3>
          <ul>
            <li onClick={() => handleExamplePrompt("My dog has been scratching its ears a lot.")}>"My dog has been scratching its ears a lot."</li>
            <li onClick={() => handleExamplePrompt("What are common signs of anxiety in cats?")}>"What are common signs of anxiety in cats?"</li>
          </ul>
        </div>
      </div>

      <div className="right-panel">
        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={index} className={`message-container ${message.sender}`}>
              {message.sender === 'bot' && (
                <img src="/SmartCareAI.png" alt="Bot Avatar" className="bot-avatar-chat" />
              )}
              <div className={`message ${message.sender}`}>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your pet's symptoms here..."
            className="chat-input"
          />
          {/* --- THIS BUTTON HAS BEEN REPLACED WITH AN SVG --- */}
          <button type="submit" className="chat-send-button">
            <svg className="send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
          {/* ----------------------------------------------- */}
        </form>
      </div>
    </div>
  );
}

export default ChatbotPage;

