import './App.css'
import RecipeCard from './components/recipe-card/RecipeCard'
 
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipe Management System</h1>
        <p>Discover, Save, and Share Amazing Recipes</p>
      </header>
     
      <main className="app-main">
        <RecipeCard />
      </main>
     
      <footer className="app-footer">
        <p>Created by: Dilpreet Singh, Hasrat, Ranjot</p>
        <p>&copy; 2024 Recipe Management System</p>
      </footer>
    </div>
  )
}
 
export default App
