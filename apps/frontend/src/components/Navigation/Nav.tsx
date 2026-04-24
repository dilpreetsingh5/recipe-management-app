import { NavLink } from 'react-router-dom';
import { SignedIn } from '@clerk/clerk-react';
import './Nav.css';

export default function Nav() {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <h1>🍳 Recipe Manager</h1>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/">Browse Recipes</NavLink>
        </li>

        <li>
          <NavLink to="/add-recipe">Add Recipe</NavLink>
        </li>

        {/* Only visible when logged in */}
        <SignedIn>
          <li>
            <NavLink to="/favorites">My Favorites</NavLink>
          </li>

          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </SignedIn>

      </ul>
    </nav>
  );
}
