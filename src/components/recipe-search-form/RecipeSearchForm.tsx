import { useState } from 'react';
import './RecipeSearchForm.css';
import type { Recipe } from '../../types/Recipe';

interface RecipeSearchFormProps {
    recipes: Recipe[];
    setFilteredRecipes: (recipes: Recipe[]) => void;
}

export default function RecipeSearchForm({ recipes, setFilteredRecipes }: RecipeSearchFormProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cuisineFilter, setCuisineFilter] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');

    const handleSearch = () => {
        let filtered = recipes;

        if (searchTerm) {
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (cuisineFilter) {
            filtered = filtered.filter(recipe => recipe.cuisineType === cuisineFilter);
        }

        if (difficultyFilter) {
            filtered = filtered.filter(recipe => recipe.difficulty === difficultyFilter);
        }

        setFilteredRecipes(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setCuisineFilter('');
        setDifficultyFilter('');
        setFilteredRecipes(recipes);
    };

    const uniqueCuisines = [...new Set(recipes.map(r => r.cuisineType))];
    const difficulties = ['Easy', 'Medium', 'Hard'];

    return (
        <div className="recipe-search-form">
            <div className="search-inputs">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    aria-label="Search recipes by title or cuisine"
                />
                <select
                    value={cuisineFilter}
                    onChange={(e) => setCuisineFilter(e.target.value)}
                    className="filter-select"
                    aria-label="Filter recipes by cuisine type"
                >
                    <option value="">All Cuisines</option>
                    {uniqueCuisines.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                </select>
                <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="filter-select"
                    aria-label="Filter recipes by difficulty level"
                >
                    <option value="">All Difficulties</option>
                    {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                    ))}
                </select>
                <button onClick={handleSearch} className="search-button">Search</button>
                <button onClick={clearFilters} className="clear-button">Clear</button>
            </div>
        </div>
    );
}