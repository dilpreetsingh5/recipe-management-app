import RecipeCard from '../components/recipe-card/RecipeCard';
import RecipeForm from '../components/recipe-form/RecipeForm';
import "./Pages.css"

export default function Home() {
  return (
    <main className="home-page">
      <section className="recipe-list">
        <RecipeCard />
      </section>

      <section className="recipe-form">
        <RecipeForm />
      </section>
    </main>
  );
}