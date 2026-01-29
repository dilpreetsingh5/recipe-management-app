import RecipeCard from '../components/recipe-card/RecipeCard';
import RecipeList from '../components/Recipe-list/RecipeList';
import "./Pages.css"

export default function Home() {
  return (
    <main className="home-page">
      <section className="recipe-card">
        <RecipeCard />
      </section>

      <section className="recipe-list">
        <RecipeList />
      </section>
    </main>
  );
}