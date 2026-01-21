import './App.css';
import RecipeCard from './components/recipe-card/RecipeCard';
import RecipeList from './components/Recipe-list/RecipeList';
import RecipeForm from './components/recipe-form/RecipeForm';
import logo from "./assets/Recipe_Management_Logo.png";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-section">
          <a href={logo} target="_blank" rel="noopener noreferrer">
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

      <main className="app-main">
        <RecipeCard />
        <RecipeList />
        <RecipeForm />
      </main>

      <footer className="app-footer">
        <p>Created by: Dilpreet Singh, Hasrat, Ranjot</p>
        <p>&copy; 2024 Recipe Management System</p>
      </footer>
    </div>
  );
}

export default App;
