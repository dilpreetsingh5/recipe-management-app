import type { Recipe } from '../types/Recipe.ts';
import { recipesData } from '../data/recipesData.ts';

export class RecipeRepository {
    private static recipes: Recipe[] = [...recipesData];

    static async getAll(): Promise<Recipe[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...this.recipes]), 100);
        });
    }

    static async getById(id: number): Promise<Recipe | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const recipe = this.recipes.find((r) => r.id === id);
                resolve(recipe ? { ...recipe } : null);
            }, 100);
        });
    }

    static async create(recipe: Omit<Recipe, 'id' | 'createdAt'>): Promise<Recipe> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newRecipe: Recipe = {
                    ...recipe,
                    id: Date.now(),
                    createdAt: new Date().toISOString()
                };
                this.recipes.push(newRecipe);
                resolve({ ...newRecipe });
            }, 100);
        });
    }

    static async update(id: number, data: Partial<Recipe>): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.recipes.findIndex((r) => r.id === id);
                if (index === -1) {
                    reject(new Error(`Recipe with id ${id} not found`));
                    return;
                }
                this.recipes[index] = { ...this.recipes[index], ...data };
                resolve({ ...this.recipes[index] });
            }, 100);
        });
    }

    static async delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.recipes.findIndex((r) => r.id === id);
                if (index === -1) {
                    reject(new Error(`Recipe with id ${id} not found`));
                    return;
                }
                this.recipes.splice(index, 1);
                resolve();
            }, 100);
        });
    }
}
