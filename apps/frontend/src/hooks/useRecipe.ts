import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '../../../../shared/types/Recipe';
import { RecipeService } from '../services/RecipeService'

/**
 * Hook to load and manage recipes.
 * @returns recipes - all recipes, loading - is loading, error - error msg,
 * refreshRecipes - reload, searchRecipes - search by word,
 * filterByCuisine - filter by cuisine, filterByDifficulty - filter by level, resetRecipes - reset list
 */
export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadRecipes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await RecipeService.getAllRecipes();
            setRecipes(data);
        } catch (err) {
            setError('Failed to load recipes');
        } finally {
            setLoading(false);
        }
    }, []);

    // Load recipes on mount
    useEffect(() => {
        void loadRecipes();
    }, [loadRecipes]);

    const searchRecipes = useCallback(async (searchTerm: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await RecipeService.searchRecipes(searchTerm);
            setRecipes(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Failed to search recipes');
        } finally {
            setLoading(false);
        }
    }, []);

    const filterByCuisine = useCallback(async (cuisineType: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await RecipeService.filterByCuisine(cuisineType);
            setRecipes(data);
        } catch (err) {
            setError('Failed to filter recipes by cuisine');
        } finally {
            setLoading(false);
        }
    }, []);

    const filterByDifficulty = useCallback(
        async (difficulty: 'Easy' | 'Medium' | 'Hard') => {
            try {
                setLoading(true);
                setError(null);
                const data = await RecipeService.filterByDifficulty(difficulty);
                setRecipes(data);
            } catch (err) {
                setError('Failed to filter recipes by difficulty');
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const resetRecipes = useCallback(() => {
        void loadRecipes();
    }, [loadRecipes]);

    return {
        recipes,
        loading,
        error,
        refreshRecipes: loadRecipes,
        searchRecipes,
        filterByCuisine,
        filterByDifficulty,
        resetRecipes
    };
}
