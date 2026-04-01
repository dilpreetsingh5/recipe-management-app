import express, { Express } from 'express';
import cors from 'cors';
import userRecipeRoutes from "./api/v1/routes/userRecipe.routes.js";
import favoriteRoutes from "./api/v1/routes/favorite.routes.js";

const app: Express = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

app.use("/api/v1/user-recipes", userRecipeRoutes);
app.use("/api/v1/favorites", favoriteRoutes);

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Recipe API is running' });
});

export default app;
