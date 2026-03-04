# Architecture Overview - User Added Recipes
Author: Ranjot Singh

This document explains the architecture used for the User Added Recipes feature.  
The implementation follows the Hook-Service-Repository pattern introduced in 
Sprint 3 to separate presentation logic, business logic, and data access.

The main goal of this architecture is to make the code easier to maintain, test, and extend in the future.

# UserRecipeRepository

## What does this repository do?

The `UserRecipeRepository` is responsible for managing data access for user-created recipes.  
It performs CRUD operations such as retrieving recipes, adding a new recipe, and deleting a recipe.

Currently, the repository uses local test data stored in `userRecipesData.ts`.  
In the future, this repository can be easily updated to fetch data from a backend API or database.

## Why was this logic placed in a repository?

Data access logic should be separated from UI logic.  
By placing CRUD operations in the repository layer:

- Components do not directly interact with data sources
- The data source can be changed later without affecting the rest of the application
- The repository becomes the single place responsible for data management

This follows the separation of concerns principle.

## Where is this repository used?

The `UserRecipeRepository` is used inside the `UserRecipeService`.

The service calls repository methods such as:

- `getAll()`
- `create()`
- `delete()`

These methods provide the data needed by the service layer.

# UserRecipeService

## What does this service do?

The `UserRecipeService` contains the business logic for user-created recipes.

Its responsibilities include:

- Handling recipe creation
- Validating recipe data
- Calling repository methods to store or retrieve recipes

The service acts as a middle layer between the repository and the UI.

## Why was this logic placed in a service?

Business logic should not exist in UI components.

Placing this logic in the service layer ensures:

- Components remain simple and focused on rendering UI
- Business rules are centralized and reusable
- Future changes to logic can be implemented without modifying components

This improves maintainability and readability.

## Where is this service used?

The `UserRecipeService` is used inside the custom hook `useUserRecipes`.

The hook calls service methods to perform actions such as:

- Fetching recipes
- Adding new recipes
- Deleting recipes

# useUserRecipes Hook

## What does this hook do?

The `useUserRecipes` hook manages presentation logic and state for user-created recipes.

It is responsible for:

- Managing recipe state
- Handling loading and error states
- Calling service methods to perform operations
- Returning values that components can easily use

## Why was this logic placed in a hook?

Hooks are designed to manage UI-related state and side effects.

Placing presentation logic inside a custom hook:

- Keeps components clean and focused on UI
- Makes the logic reusable across multiple components
- Separates UI behavior from business and data logic

This aligns with the Hook-Service-Repository architecture.

---

## Where is this hook used?

The `useUserRecipes` hook is used in the `AddRecipe` page.

In this page the hook provides:

- `recipes`
- `isLoading`
- `error`
- `addRecipe`
- `deleteRecipe`

These values are used to display user-created recipes and allow users to add or remove recipes through the UI.