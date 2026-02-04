import { NavLink } from 'react-router-dom';
import './Nav.css';
 
export default function Nav() {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <h1>🍳 Recipe Manager</h1>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Browse Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            My Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-recipe"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Add Recipe
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}