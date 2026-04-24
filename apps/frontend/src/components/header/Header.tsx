import './Header.css';
import Nav from '../Navigation/Nav';
import logo from '../../assets/Recipe_Management_Logo.png';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
 
export default function Header() {
  return (
    <>
      <header className="app-header">
        <div className="header-top">
          <div className="header-spacer" />
          <div className="logo-section">
            <a href="/">
              <img
                src={logo}
                alt="Recipe Management Logo"
                className="logo"
              />
            </a>
          </div>

          <div className="header-auth">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button type="button" className="header-auth-button">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="header-auth-button header-auth-button-primary">
                  Sign up
                </button>
              </SignUpButton>
            </SignedOut>
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
