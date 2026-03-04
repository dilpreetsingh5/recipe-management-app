# Architecture Overview -  Favorites & Services
Author: Hasratdeep Kaur

This document explains the architecture used for the Favorites feature 
and Service layer implementation.

The implementation follows the Hook-Service, Repository pattern introduced 
in Sprint 3 to separate presentation logic, business logic, and data access.

The goal of this architecture is to improve maintainability, scalability, 
and testability of the application.

# FavoriteRepository
## What does this repository do?

The FavoriteRepository is responsible for managing data access 
for favorite recipes.

It performs CRUD operations such as:
- Getting all favorites
- Getting a favorite by ID
- Adding a recipe to favorites
- Removing a recipe from favorites
- Checking if a recipe is already favorited

Currently, the repository uses local test data stored in `favoritesData.ts`.

## Why was this logic placed in a repository?

Data access logic should be separated from business and UI logic.
By placing CRUD operations in the repository layer:

- Components do not directly interact with data sources
- The data source can be replaced later without affecting the UI
- The repository becomes the single source of truth for favorites data

## Where is this repository used?

The `FavoriteRepository` is used inside the `FavoriteService`.
All favorite-related data access goes through this repository.

# FavoriteService
## What does this service do?

The FavoriteService contains business logic for managing favorites.
It interacts with the FavoriteRepository to perform data operations 
and may include additional processing logic such as:

- Toggling favorites
- Validating favorite actions
- Combining recipe and favorite data
- Handling business rules

## Why was this logic placed in a service?

Business logic should not be inside UI components.
By using a service layer:
- Components remain clean and focused on UI rendering
- Business rules are centralized
- Logic can be reused across multiple components or hooks
- Code becomes easier to test

## Where is this service used?

The `FavoriteService` is used in:
- Recipe list components
- Recipe detail components
- Custom hooks related to favorites

Multiple components call the service methods instead of directly 
accessing repositories.

# RecipeService 
## What does this service do?

The RecipeService handles business logic for recipe operations such as:
- Searching recipes
- Filtering by cuisine
- Filtering by difficulty
- Calculating total cooking time
- Formatting cooking time

It calls `RecipeRepository` for data access.

## Architectural Benefits

This layered architecture provides:
- Clear separation between UI, business logic, and data access
- Improved maintainability
- Better scalability
- Easier unit testing
- Cleaner and more readable components

