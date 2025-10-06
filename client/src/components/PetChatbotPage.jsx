import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatbotPage.css';

// Renamed to better reflect its function and avoid confusion
function PetChatbotPage() { 
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [imageFile, setImageFile] = useState(null); // NEW: State to hold the image file
  const [loading, setLoading] = useState(false); // NEW: State for loading/disabled button
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initial greeting from the bot
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm SmartCare AI, your personal pet health assistant. To get a diagnosis, please **upload an image** of the issue and **describe the symptom** in the text box below.",
        sender: 'bot'
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Helper to convert the diagnosis text into rendered elements (e.g., handling bold text)
  // NOTE: For a production app, use 'react-markdown' library for better safety and styling
  const renderMessageText = (text) => {
    return text.split('\n').map((line, i) => (
      <p key={i}>
        {line.includes('**') ? 
          line.split('**').map((part, j) => (
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )) : 
          line
        }
      </p>
    ));
  };


  // --- UPDATED HANDLER FOR MULTIMODAL REQUEST ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const prompt = inputValue.trim();
    
    // 1. Validation: Ensure both text and image are provided
    if (!prompt && !imageFile) {
      alert("Please enter a symptom description AND upload an image.");
      return;
    }
    
    setLoading(true);
    setInputValue(''); // Clear input box right away
    setImageFile(null); // Clear image input

    // Create the user message object for display
    const userMessage = { text: prompt, sender: 'user', imageURL: imageFile ? URL.createObjectURL(imageFile) : null };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // 2. Prepare the FormData object for server upload
      const formData = new FormData();
      formData.append('prompt', prompt); 
      // 'petImage' MUST match upload.single('petImage') in server/routes/gemini.js
      formData.append('petImage', imageFile); 
      
      // 3. Call the server endpoint
      const response = await fetch('/api/gemini/diagnose', {
        method: 'POST',
        body: formData, // The browser handles the Content-Type automatically
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error occurred during diagnosis.');
      }

      // 4. Update state with the successful diagnosis text
      const botResponse = { 
          text: data.diagnosis, 
          sender: 'bot' 
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
      
    } catch (err) {
      console.error("API Call Error:", err);
      const errorResponse = { 
          text: `🚨 ERROR: ${err.message}. Please try again or check your server.`, 
          sender: 'bot' 
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setLoading(false);
    }
  };
  // ----------------------------------------------------
  
  // Remove example prompts as the focus is now multimodal diagnosis, not simple chat
  const handleExamplePrompt = (prompt) => {
    alert("This chat is now dedicated to image and symptom analysis. Please use the text input and file upload.");
  };

  return (
    <div className="chatbot-page-container">
      <div className="left-panel">
        <img src="/SmartCareAI.png" alt="SmartCare AI Avatar" className="ai-avatar" />
        <h1 className="ai-title">SmartCare AI</h1>
        <p className="ai-description">
          Multimodal Pet Health Advisor<br></br> Upload an image of the issue (e.g., rash, lump) and describe the symptoms for an AI-powered initial assessment.
        </p>
        <div className="example-prompts">
          <h3 className="prompts-title">Example descriptions:</h3>
          <ul>
            <li onClick={() => handleExamplePrompt("My dog has a red, swollen paw and is limping.")}>"My dog has a red, swollen paw and is limping."</li>
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
                {/* NEW: Display the image the user uploaded */}
                {message.sender === 'user' && message.imageURL && (
                    <div className="user-uploaded-image-wrapper">
                        <p>Image submitted:</p>
                        <img src={message.imageURL} alt="User Uploaded" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                    </div>
                )}
                {/* Use the new render function for better display */}
                {renderMessageText(message.text)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          {loading && (
            <div className="message-container bot">
                <div className="message bot loading">
                    <p>Analyzing image and symptoms... 🔍</p>
                </div>
            </div>
          )}
        </div>
        
        {/* --- UPDATED INPUT FORM --- */}
        <form onSubmit={handleSendMessage} className="chat-input-form">
          {/* NEW: File input area */}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setImageFile(e.target.files[0])}
            disabled={loading}
          />
          <label htmlFor="image-upload" className={`file-upload-label ${imageFile ? 'file-uploaded' : ''}`}>
            {/* SVG for file upload icon (can be customized) */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            {imageFile ? imageFile.name.substring(0, 15) + '...' : 'Upload Image'}
          </label>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your pet's symptoms here..."
            className="chat-input"
            disabled={loading}
          />
          <button type="submit" className="chat-send-button" disabled={loading || (!inputValue.trim() && !imageFile)}>
            <svg className="send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
        {/* ----------------------------- */}
      </div>
    </div>
  );
}

export default PetChatbotPage;