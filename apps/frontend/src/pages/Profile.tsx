import { useUser } from "@clerk/clerk-react";
import { useFavorites } from "../hooks/useFavorites";
import { useUserRecipes } from "../hooks/useUserRecipe";

export default function Profile() {
  const { user } = useUser();
  const { favorites } = useFavorites(true);
  const { recipes, isLoading } = useUserRecipes(true);

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <section className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <p>
          <strong>Name:</strong>{" "}
          {user?.fullName || "No name available"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.primaryEmailAddress?.emailAddress ||
            "No email available"}
        </p>
      </div>

      <div className="profile-stats">
        <h2>My Activity</h2>
        <p>Favorites: {favorites.length}</p>
        <p>My Recipes: {recipes.length}</p>
      </div>
    </section>
  );
}
