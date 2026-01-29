import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import './Nav.css';

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Header />

        {/* Navigation Bar */}
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/favorites">MyFavorites</Link>
          <Link to="/add-recipe">AddRecipe</Link>
        </nav>

        {/* Main Content */}
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Routes>
        </div>

      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
