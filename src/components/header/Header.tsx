import './Header.css';
import logo from '../../assets/Recipe_Management_Logo.png';

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo-section">
        <a href="/">
          <img
            src={logo}
            alt="Recipe Management Logo"
            className="logo"
          />
        </a>
      </div>

      <h1>Recipe Management System</h1>
      <p>Discover, Save, and Share Amazing Recipes</p>
    </header>
  );
}
