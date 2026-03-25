import './RecipeForm.css';
import type { UserRecipe } from '../../../../../shared/types/UserRecipe';
import React, { useState, useCallback } from 'react';
import { RecipeService } from '../../services/RecipeService';

// ── Module-level constants (defined once, not recreated on every render) ──────

const CUISINE_TYPES: { value: string; label: string }[] = [
  { value: 'italian',       label: 'Italian' },
  { value: 'indian',        label: 'Indian' },
  { value: 'chinese',       label: 'Chinese' },
  { value: 'mexican',       label: 'Mexican' },
  { value: 'american',      label: 'American' },
  { value: 'french',        label: 'French' },
  { value: 'japanese',      label: 'Japanese' },
  { value: 'thai',          label: 'Thai' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'korean',        label: 'Korean' },
];

const DIFFICULTY_LEVELS: Array<'Easy' | 'Medium' | 'Hard'> = [
  'Easy',
  'Medium',
  'Hard',
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface RecipeFormProps {
  onAddRecipe: (recipe: Omit<UserRecipe, 'id'>) => Promise<UserRecipe>;
}

type FormFields = {
  title: string;
  image: string;
  cuisineType: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string;
  instructions: string;
};

const EMPTY_FIELDS: FormFields = {
  title: '',
  image: '',
  cuisineType: '',
  difficulty: '',
  prepTime: '',
  cookTime: '',
  servings: '',
  ingredients: '',
  instructions: '',
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function RecipeForm({ onAddRecipe }: RecipeFormProps) {
  // Controlled form state
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);

  // Feedback state
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitError, setSubmitError]           = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess]       = useState(false);
  const [submitting, setSubmitting]             = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFields(prev => ({ ...prev, [name]: value }));
      // Clear feedback as soon as the user starts editing
      if (validationErrors.length > 0) setValidationErrors([]);
      if (submitError)   setSubmitError(null);
      if (submitSuccess) setSubmitSuccess(false);
    },
    [validationErrors.length, submitError, submitSuccess]
  );

  const resetForm = useCallback(() => {
    setFields(EMPTY_FIELDS);
    setValidationErrors([]);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Build a partial recipe for validation (RecipeService.validateRecipe
    // only needs the scalar fields)
    const partial = {
      title:       fields.title.trim(),
      cuisineType: fields.cuisineType.trim(),
      difficulty:  fields.difficulty as 'Easy' | 'Medium' | 'Hard',
      prepTime:    Number(fields.prepTime),
      cookTime:    Number(fields.cookTime),
      servings:    Number(fields.servings),
    };

    const { valid, errors } = RecipeService.validateRecipe(partial);
    if (!valid) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setSubmitting(true);

    try {
      // Build the full UserRecipe payload (without id — the repository assigns it)
      const newRecipe: Omit<UserRecipe, 'id'> = {
        ...partial,
        image:        fields.image.trim() || undefined,
        ingredients:  fields.ingredients.split('\n').map(i => i.trim()).filter(Boolean),
        instructions: fields.instructions.split('\n').map(s => s.trim()).filter(Boolean),
      };

      // onAddRecipe → useUserRecipes.addRecipe
      //             → UserRecipeService.addRecipe
      //             → UserRecipeRepository.create
      //             → userRecipesData (in-memory store)
      await onAddRecipe(newRecipe);

      setSubmitSuccess(true);
      resetForm();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Failed to submit recipe. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section className="recipe-form">
      <h2 className="form-title">Share Your Recipe</h2>
      <p className="form-description">
        Add your delicious recipe to our community collection
      </p>

      {/* ── Success banner ── */}
      {submitSuccess && (
        <div className="form-success" role="status">
          ✅ Recipe added successfully!
        </div>
      )}

      {/* ── Validation errors ── */}
      {validationErrors.length > 0 && (
        <ul className="form-errors" role="alert">
          {validationErrors.map((err, i) => (
            <li key={i} className="form-error-item">{err}</li>
          ))}
        </ul>
      )}

      {/* ── Submit error ── */}
      {submitError && (
        <div className="form-error" role="alert">
          ⚠️ {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="recipe-form-container" noValidate>

        {/* Recipe Title */}
        <div className="form-group">
          <label htmlFor="recipeTitle" className="form-label">
            Recipe Title *
          </label>
          <input
            type="text"
            id="recipeTitle"
            name="title"
            className="form-input"
            placeholder="e.g., Classic Spaghetti Carbonara"
            value={fields.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image URL (optional) */}
        <div className="form-group">
          <label htmlFor="image" className="form-label optional">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="form-input"
            placeholder="https://example.com/photo.jpg"
            value={fields.image}
            onChange={handleChange}
          />
          <span className="form-hint">Optional — paste a direct link to a photo of your dish</span>
        </div>

        {/* Cuisine Type */}
        <div className="form-group">
          <label htmlFor="cuisineType" className="form-label">
            Cuisine Type *
          </label>
          <select
            id="cuisineType"
            name="cuisineType"
            className="form-select"
            value={fields.cuisineType}
            onChange={handleChange}
            required
          >
            <option value="">Select a cuisine type</option>
            {CUISINE_TYPES.map(c => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level */}
        <div className="form-group">
          <label htmlFor="difficulty" className="form-label">
            Difficulty Level *
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="form-select"
            value={fields.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select difficulty</option>
            {DIFFICULTY_LEVELS.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Prep & Cook Time */}
        <div className="form-row">

          <div className="form-group">
            <label htmlFor="prepTime" className="form-label">
              Prep Time (minutes) *
            </label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              className="form-input"
              min="0"
              placeholder="15"
              value={fields.prepTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookTime" className="form-label">
              Cook Time (minutes) *
            </label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              className="form-input"
              min="0"
              placeholder="30"
              value={fields.cookTime}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        {/* Servings */}
        <div className="form-group">
          <label htmlFor="servings" className="form-label">
            Number of Servings *
          </label>
          <input
            type="number"
            id="servings"
            name="servings"
            className="form-input"
            min="1"
            placeholder="4"
            value={fields.servings}
            onChange={handleChange}
            required
          />
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <label htmlFor="ingredients" className="form-label">
            Ingredients *
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-textarea"
            rows={5}
            placeholder={`Enter each ingredient on a new line:\n400g spaghetti\n200g pancetta\n4 large eggs\n100g Pecorino Romano cheese`}
            value={fields.ingredients}
            onChange={handleChange}
            required
          />
          <span className="form-hint">One ingredient per line</span>
        </div>

        {/* Instructions */}
        <div className="form-group">
          <label htmlFor="instructions" className="form-label">
            Instructions *
          </label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-textarea"
            rows={6}
            placeholder={`Enter step-by-step instructions:\n1. Bring salted water to boil and cook spaghetti\n2. While pasta cooks, dice pancetta and cook until crispy\n3. In a bowl, whisk together eggs and grated cheese`}
            value={fields.instructions}
            onChange={handleChange}
            required
          />
          <span className="form-hint">One step per line</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
          disabled={submitting}
        >
          {submitting ? '⏳ Submitting…' : '🍳 Submit Recipe'}
        </button>

      </form>
    </section>
  );
}
