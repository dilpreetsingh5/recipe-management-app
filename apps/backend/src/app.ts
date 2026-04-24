import express, { Express } from 'express';
import cors from 'cors';
import recipeRoutes from "./api/v1/routes/recipe.routes.js";
import userRecipeRoutes from "./api/v1/routes/userRecipe.routes.js";
import favoriteRoutes from "./api/v1/routes/favorite.routes.js";
import {
  attachUserId,
  clerkMiddleware,
  requireClerkAuth,
} from "./api/v1/middleware/auth.middleware.js";
 
const app: Express = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(clerkMiddleware);

app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/user-recipes", requireClerkAuth, attachUserId, userRecipeRoutes);
app.use("/api/v1/favorites", requireClerkAuth, attachUserId, favoriteRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Recipe API is running' });
});

export default app;

