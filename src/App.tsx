import './App.css';
import RecipeCard from './components/recipe-card/RecipeCard';
import RecipeList from './components/Recipe-list/RecipeList';
import RecipeForm from './components/recipe-form/RecipeForm';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <RecipeCard />
        <RecipeList />
        <RecipeForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
