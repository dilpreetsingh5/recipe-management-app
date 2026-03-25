# Architecture Document — Dilpreet Singh (DS)

**Sprint 3 | Recipe Management App**

---

## Overview

In Sprint 3 we refactored the app to follow the Hook-Service-Repository pattern. The idea is to separate the code into layers so each part has one job. My job was to build the hooks and the recipe repository. This document explains what I built, why I made the decisions I made, and where each piece is used in the project.

---

## What I Was Responsible For

- `useRecipes` hook → `src/hooks/useRecipe.ts`
- `useRecipeForm` hook → `src/hooks/useRecipeForm.ts`
- `RecipeRepository` → `src/repositories/RecipeRepository.ts`
- `Recipe` type → `src/types/Recipe.ts`
- Recipe test data → `src/data/recipesData.ts`

---

## Hooks

### `useRecipes`

**What does it do?**

This hook is responsible for loading recipes and giving them to whatever component needs them. It tracks the loading state, any errors that happen, and the actual recipe list. It also exposes methods like `searchRecipes`, `filterByCuisine`, `filterByDifficulty`, and `resetRecipes` so components can interact with the data without knowing how any of it works under the hood.

**How did I decide what logic goes here?**

The rule I followed was: if it's about managing state or reacting to something in the UI, it goes in the hook. If it's about processing or filtering data, it goes in the service. So for example, the actual search logic (comparing strings, filtering arrays) lives in `RecipeService.searchRecipes()`. The hook just calls that method and stores the result in state. I also wrapped all the functions in `useCallback` to avoid unnecessary re-renders when components use this hook.

**Where is it used?**

This hook is designed to be used in the `Home` page and any component that needs to display or filter recipes. It calls `RecipeService` for all data operations.

```tsx
const { recipes, loading, error, searchRecipes, filterByCuisine } = useRecipes();
```

---

### `useRecipeForm`

**What does it do?**

This hook manages everything related to the add-recipe form — the field values, validation errors, submission state, and success/failure feedback. When the user types, `handleChange` updates the state. When they submit, `handleSubmit` runs validation through the service and then calls the service to create the recipe.

**How did I decide what logic goes here?**

The form has a lot of moving parts — multiple fields, error states, a submitting flag, a success flag. Putting all of that directly in the component would make it messy. So I moved all the form state management into this hook. The component just renders the inputs and calls the hook's functions.

Validation rules are not in this hook — they're in `RecipeService.validateRecipe()`. The hook calls that and just stores whatever errors come back. That way if the validation rules change, we only touch the service.

**Where is it used?**

The `RecipeForm` component (`src/components/recipe-form/RecipeForm.tsx`) uses this hook to manage its state. The `AddRecipe` page (`src/pages/AddRecipe.tsx`) renders that form component.

```tsx
const { fields, handleChange, handleSubmit, validationErrors, submitting } = useRecipeForm();
```

---

## Repository

### `RecipeRepository`

**What does it do?**

This is the only place in the app that directly touches recipe data. It has five methods: `getAll`, `getById`, `create`, `update`, and `delete`. Right now it works with the in-memory test data from `recipesData.ts`, but in Sprint 4 this is where we'll swap in real API calls. Because all data access is centralized here, that swap should only require changes to this one file.

**How did I decide what logic goes here?**

The repository has no business logic at all — no filtering, no validation, nothing like that. It just reads and writes data. I also made all the methods return Promises and added a small `setTimeout` to simulate network latency. The reason for that is so the rest of the app is already written to handle async data, which makes the Sprint 4 migration easier.

**Where is it used?**

Only `RecipeService` calls this repository. Hooks and components never talk to the repository directly. The flow is:

```
useRecipes  →  RecipeService  →  RecipeRepository  →  recipesData.ts
```

---

## Supporting Files

### `Recipe` Type — `src/types/Recipe.ts`

Defines the shape of a recipe object. Fields include `id`, `title`, `image`, `cuisineType`, `difficulty`, `prepTime`, `cookTime`, `servings`, `ingredients`, `instructions`, and optional nutrition fields. This type is shared across the repository, service, hooks, and components.

### Recipe Test Data — `src/data/recipesData.ts`

An array of at least 10 recipe objects covering different cuisines (Italian, Indian, Mexican, Thai, Chinese, Greek, American) and difficulty levels. This is what the `RecipeRepository` loads as its initial data set.

---

## How It All Connects

```
Component
    ↓
useRecipes / useRecipeForm   (manages state, calls service)
    ↓
RecipeService                (business logic, validation, filtering)
    ↓
RecipeRepository             (data access only)
    ↓
recipesData.ts               (test data)
```r

Each layer only depends on the layer below it. That's the main point of this architecture — it keeps things organized and makes it easier to change one part without breaking everything else.
