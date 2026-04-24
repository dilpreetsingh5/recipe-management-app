import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { authFetch } from "../lib/clerkAuth";

type ProfileData = {
  favoriteCount: number;
  userRecipeCount: number;
};

export default function Profile() {
  const { user } = useUser();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authFetch(
          "http://localhost:3001/api/v1/profile"
        );

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

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
        <p>Favorites: {data?.favoriteCount ?? 0}</p>
        <p>My Recipes: {data?.userRecipeCount ?? 0}</p>
      </div>
    </section>
  );
}