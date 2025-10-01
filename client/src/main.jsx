import React from 'react' 
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css';
import App from './App.jsx'
import { AuthProvider } from './components/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
 
)
