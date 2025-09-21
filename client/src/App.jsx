import './styles/index.css';
import './styles/App.css';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import BuyerRegister from './components/BuyerRegister.jsx';
import SellerRegister from './components/SellerRegister.jsx';
import VetRegister from './components/VetRegister.jsx';
import PetStore from './components/PetStore.jsx';
import BuyerHome from "./components/BuyerHome.jsx";

function PrivateRoute({ children }) {
  const buyer = localStorage.getItem('buyer');
  if (!buyer) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Wrapper component for home that redirects logged-in buyers
function HomeRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const buyer = localStorage.getItem('buyer');
    if (buyer) {
      navigate('/buyer_home', { replace: true });
    }
  }, [navigate]);

  return (
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
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderRoutes = ['/buyer_home', '/seller_home', '/vet_home'];

  const shouldHideHeader = hideHeaderRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />

        <Route path="/register" element={<Register />} />

        <Route path="/register/buyer" element={<BuyerRegister />} />
        <Route path="/register/seller" element={<SellerRegister />} />
        <Route path="/register/veterinarian" element={<VetRegister />} />

        <Route path="/login" element={<Login />} />

        {/* Protect BuyerHome route */}
        <Route
          path="/buyer_home/*"
          element={
            <PrivateRoute>
              <BuyerHome />
            </PrivateRoute>
          }
        />

        <Route path="/petstore" element={<PetStore />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
