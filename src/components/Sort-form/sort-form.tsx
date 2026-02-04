import { useState } from 'react';
import './sort-form.css';
import type { Recipe } from '../../types/Recipe';
 
interface SortFormProps {
  recipes: Recipe[];
  setSortedRecipes: (recipes: Recipe[]) => void;
}
 
export default function SortForm({ recipes, setSortedRecipes }: SortFormProps) {
  const [sortBy, setSortBy] = useState('');
 
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
 
    let sorted = [...recipes];
 
    if (value === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === 'cuisine') {
      sorted.sort((a, b) => a.cuisineType.localeCompare(b.cuisineType));
    } else if (value === 'difficulty') {
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    }
 
    setSortedRecipes(sorted);
  };
 
  return (
    <div className="sort-form">
      <label htmlFor="sort-select">Sort by:</label>
      <select id="sort-select" value={sortBy} onChange={handleSortChange}>
        <option value="">Default</option>
        <option value="name">Name (A-Z)</option>
        <option value="cuisine">Cuisine</option>
        <option value="difficulty">Difficulty</option>
      </select>
    </div>
  );
}