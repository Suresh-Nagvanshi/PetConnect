import './styles/index.css';
import './styles/App.css';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

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
import BuyerHome from './components/BuyerHome.jsx';
import SellerHome from './components/SellerHome.jsx';
import VetHome from './components/VetHome.jsx';
import MapView from './components/MapView.jsx';

import BuyerPetAdoption from './components/BuyerPetAdoption.jsx';
import BuyerEditProfile from './components/BuyerEditProfile.jsx';
import SellerListAnimals from './components/SellerListAnimals.jsx';
import SellerListProducts from './components/SellerListProducts.jsx';
import VetListServices from './components/VetListServices.jsx';
import ShowFeedback from './components/ShowFeedback.jsx';
import BuyerFeedbackForm from './components/BuyerFeedbackForm.jsx';
import SellerFeedbackForm from './components/SellerFeedbackForm.jsx';
import VetFeedbackForm from './components/VetFeedbackForm.jsx';

// Private route components for authentication checks
function PrivateRouteBuyer({ children }) {
  const buyer = localStorage.getItem('buyer');
  if (!buyer) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PrivateRouteSeller({ children }) {
  const seller = localStorage.getItem('seller');
  if (!seller) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PrivateRouteVet({ children }) {
  const vet = localStorage.getItem('vet');
  if (!vet) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Component that redirects logged-in buyers to buyer homepage
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
      <div id="home"><Home /></div>
      <div id="trending"><TrendingAnimals /></div>
      <div id="services"><OurServices /></div>
    </>
  );
}

// AppContent handles routes and header/footer visibility
function AppContent() {
  const location = useLocation();

  // Routes where header should not appear
  const hideHeaderRoutes = ['/buyer_home', '/seller_home', '/vet_home'];
  const shouldHideHeader = hideHeaderRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<ShowFeedback />} />

        {/* Registration and Login */}
        <Route path="/register" element={<Register />} />
        <Route path="/register/buyer" element={<BuyerRegister />} />
        <Route path="/register/seller" element={<SellerRegister />} />
        <Route path="/register/veterinarian" element={<VetRegister />} />
        <Route path="/login" element={<Login />} />

        <Route path="/petstore" element={<PetStore />} />
        <Route path="/map" element={<MapView />} />

        {/* Buyer Dashboard with nested routes */}
        <Route
          path="/buyer_home/*"
          element={
            <PrivateRouteBuyer>
              <BuyerHome />
            </PrivateRouteBuyer>
          }
        >
          <Route index element={<BuyerPetAdoption />} />
          <Route path="petadoption" element={<BuyerPetAdoption />} />
          <Route path="editprofile" element={<BuyerEditProfile />} />
          <Route path="feedback" element={<BuyerFeedbackForm />} />
        </Route>

        {/* Seller Dashboard with nested routes */}
        <Route
          path="/seller_home/*"
          element={
            <PrivateRouteSeller>
              <SellerHome />
            </PrivateRouteSeller>
          }
        >
          <Route index element={<SellerListAnimals />} />
          <Route path="listanimals" element={<SellerListAnimals />} />
          <Route path="listproducts" element={<SellerListProducts />} />
          <Route path="feedback" element={<SellerFeedbackForm />} />
        </Route>

        {/* Vet Dashboard with nested routes */}
        <Route
          path="/vet_home/*"
          element={
            <PrivateRouteVet>
              <VetHome />
            </PrivateRouteVet>
          }
        >
          <Route index element={<VetListServices />} />
          <Route path="listservices" element={<VetListServices />} />
          <Route path="feedback" element={<VetFeedbackForm />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
