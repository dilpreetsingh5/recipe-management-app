# Recipe Management System
 
## Team Information
**Team Name:** Group 10  
 
**Team Members:**
- Dilpreet Singh
- Hasrat
- Ranjot
 
## Project Overview
The Recipe Management System is a simple web app where users can view, save, and create recipes.  
It helps people keep their favorite recipes in one place and find new ideas for cooking.
 
This project is being built step by step using an agile sprint process.

## User Stories
- As a user, I want to browse a collection of recipes with detailed instructions and ingredients, so that I can find new meals to cook.
- As a user, I want to save my favorite recipes to a personal collection, so that I can easily access them later.
- As a user, I want to create and share my own recipes with the community, so that others can try my cooking.
 
## Features (Sprint 1)
- Show a list of recipes
- View recipe details
- Save favorite recipes
- Add new recipes
- Organize recipes by category

## Tools and Technologies
- React
- TypeScript
- Vite
- CSS
- Git and GitHub
- Vercel
 
## How We Work
- The **main** branch is locked and used for the final version
- The **develop** branch is used for team work
- Each feature is done in a separate branch
- Changes are added using Pull Requests
- At least one team member must approve before merging
 
## Deployment
The project is deployed using **Vercel**.  
When changes are merged into the main branch, the app updates automatically.
 
## Notes
This project is part of Sprint 1 for our course.  
In this sprint, we focus on planning, setup, and building basic React components.

## Sprint 2

## Project Overview
- The team used a Kanban board to plan, track, and
complete work across multiple sprints. Each task was assigned 
to team members and completed using feature branches linked to
GitHub issues.

## Sprint 1 Kanban Items and Team Contributions
Item	Description	Team Member(s)
- Set up GitHub repository	(Dilpreet)
- Create and manage Vercel account	(Dilpreet)
- Initialize frontend project	(Dilpreet)
- Create project README file	(Ranjot)
- Create RecipeCard component	(Dilpreet)
- Create RecipeForm component	(Ranjot)
- Create RecipeList component	(Hasrat)
- Style RecipeCard component (Dilpreet)
- Create style guide	Team (Dilpreet, Hasrat, Ranjot)
- Integrate components in App.tsx	(Hasrat)
- Style recipe list components  (Hasrat)
- Style the recipe form component (Ranjot)

## Sprint 2 Kanban Items and Team Contributions
Item	Description	Team Member(s)
- Set up multi-page navigation	(Dilpreet)
- Share data between pages	(Ranjot)
- Create recipe submit form	(Ranjot)
- Create home page	(Dilpreet)
- Create add recipe page	(Ranjot)
- Create search form	(Dilpreet)
- Create favorites page	(Hasrat)
- Create sort form	(Hasrat)
- Create navigation bar	(Hasrat )

## Sprint 3 Kanban Items and Team Contributions
Item	Description	Team Member(s)
- Architecture Documentation (Dilpreet, Ranjot, Hasrat )
- Refactor Shared Page State ( Ranjot )
- Create Custom Hooks (Dilpreet )
- Create Service Layer ( Hasrat )
- Favorite Repository Implementation ( Hasrat )
- Recipe Repository Implementation ( Dilpreet )
- Create Recipe Test Data ( Dilpreet )
- UserRecipeRepository Implementation ( Ranjot )
- Refactor Component to Use Full Architecture ( Ranjot)

## Sprint 4 Kanban Items and Team Contributions

| Item | Description | Team Member(s) |
|------|------------|----------------|
| Backend Setup | Set up backend project | Dilpreet |
| Prisma Setup | Set up Prisma ORM | Dilpreet |
| Database Setup | Set up development database | Ranjot |
| Database Schema | Finalize database schema | Team |
| Recipe Endpoints | Create recipe endpoints | Dilpreet |
| Favorite Endpoints | Create favorite endpoints | Hasrat |
| User Recipe Endpoints | Create user recipe endpoints | Ranjot |
| CORS Setup | Set up CORS | Hasrat |
| Recipe Repository Integration | Connect recipe repository to backend | Dilpreet |
| Favorite Repository Integration | Connect favorite repository to backend | Hasrat |
| User Recipe Repository Integration | Connect user recipe repository to backend | Ranjot |
| Database Seeding | Add database seed script | Dilpreet |
| Recipe Persistence Testing | Test recipe persistence | Dilpreet |
| Favorite Persistence Testing | Test favorite persistence | Hasrat |
| User Recipe Persistence Testing | Test user recipe persistence | Ranjot |

## Sprint Planning
Sprint planning was completed before development. During sprint planning:
- Backlog items were reviewed.
- Acceptance criteria were defined for each issue.
- Tasks were estimated and moved to the Ready column.

## Project workflow
- One feature branch is used per issue.
- Feature branches are linked to related GitHub issues.
- All work is merged into the main branch after completion and review.

## Style Guide
A `STYLEGUIDE.md` file is included at the root of the project. It describes:
- Fonts used throughout the application
- Font sizes for headings, subheadings, and body text 

## Footer Update
The footer copyright year has been updated to reflect the current year.

## Development Database Setup

This project uses PostgreSQL for development.

### Expected local credentials
```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=recipe_management_dev
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/recipe_management_dev
```

### Start the database
```bash
docker compose up -d postgres
```

`docker-compose.yml` defaults to the credentials above, and you can override them by creating a root `.env` file from `.env.example`.

The backend expects the same connection string in `apps/backend/.env`. If you need to recreate that file, copy `apps/backend/.env.example`.

If you still get a Prisma `P1000` authentication error after updating the env values, your existing Docker volume was likely created with a different password. Recreate the database container and volume, then start fresh:

```bash
docker compose down -v
docker compose up -d postgres
npm run prisma:db-push --workspace=apps/backend
npm run prisma:seed --workspace=apps/backend
```

## Authors
- Dilpreet  
- Ranjot  
- Hasrat
