import './Header.css';
import Nav from '../Navigation/Nav';
import logo from '../../assets/Recipe_Management_Logo.png';
 
export default function Header() {
  return (
    <>
      <header className="app-header">
        <div className="header-top">
          <div className="logo-section">
            <a href="/">
              <img
                src={logo}
                alt="Recipe Management Logo"
                className="logo"
              />
            </a>
          </div>
        </div>
 
        <h1>Recipe Management System</h1>
        <p>Discover, Save, and Share Amazing Recipes</p>
      </header>
 
      {/* NAV BELOW HEADER */}
      <Nav />
    </>
  );
}