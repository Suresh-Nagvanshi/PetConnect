import './styles/index.css';
import './styles/App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import TrendingAnimals from './components/TrendingAnimals.jsx';
import OurServices from './components/OurServices.jsx';
import Footer from './components/Footer.jsx';
function App() {
  return (
    <div>
      <div>
      <Header />
      </div>
      <div>
      <Home />
      </div>
      <div>
      <TrendingAnimals />
      
      </div>
      <div>
        <OurServices />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}


export default App;
