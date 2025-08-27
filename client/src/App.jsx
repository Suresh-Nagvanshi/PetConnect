import './styles/index.css';
import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import TrendingAnimals from './components/TrendingAnimals.jsx';
import OurServices from './components/OurServices.jsx';
import AboutUs from './components/AboutUs.jsx';
import Contact from './components/Contact.jsx';
import Feedback from './components/Feedback.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <div id="home">
              <Home />
            </div>
            <div id="trending">
              <TrendingAnimals />
            </div>
            <div id="services">
              <OurServices />
            </div>
          </>
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
