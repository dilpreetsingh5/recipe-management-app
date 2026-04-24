# Recipe Management System
 
## Team Information
**Team Name:** Group 10  
 
**Team Members:**
- Dilpreet Singh
- Hasrat
- Ranjot
 
## Project Overview
The Recipe Management System is a simple web app where users can view, save, and create recipes.  
It helps users keep their favorite recipes in one place and find new ideas for cooking.
 
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

## Local Setup

### Prerequisites
- Node.js + npm
- Docker Desktop (for PostgreSQL)

### Environment Variables

**Backend (`apps/backend/.env`)**
- `CLERK_PUBLISHABLE_KEY` (pk_test_b2JsaWdpbmctcGFycm90LTg2LmNsZXJrLmFjY291bnRzLmRldiQ)
- `CLERK_SECRET_KEY` (sk_test_yR4icbuc6FvF4euiS9YJxP7nQr28TELpFcP56QWWek)
- `DATABASE_URL` (postgresql://postgres:postgres@localhost:5432/recipe_management_dev)
- `FRONTEND_URL` (default: `http://localhost:5173`)
- `PORT` (default: `3001`)

**Frontend (`apps/frontend/.env`)**
- `VITE_CLERK_PUBLISHABLE_KEY` (pk_test_b2JsaWdpbmctcGFycm90LTg2LmNsZXJrLmFjY291bnRzLmRldiQ)
- `VITE_API_URL` (default: `http://localhost:3001/api/v1`)

**PostgreSQL (optional root `.env` for `docker-compose.yml`)**
- `POSTGRES_USER` (default: `postgres`)
- `POSTGRES_PASSWORD` (default: `postgres`)
- `POSTGRES_DB` (default: `recipe_management_dev`)

### Start PostgreSQL
```bash
docker compose up -d postgres
```

### Install Dependencies
```bash
npm install
```

### Run Migrations + Seed (first run)
```bash
cd apps/backend
npx prisma migrate dev
npx tsx prisma/seed.ts
```

### Start the App
From the repo root:
```bash
npm run dev
```

**Windows note:** If PowerShell blocks `npm` scripts, use `npm.cmd` (e.g. `npm.cmd run dev`).
 
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

## Sprint 5 Kanban Items and Team Contributions

| Item | Description | Team Member(s) |
|------|------------|----------------|
| Clerk Authentication Setup | Set up Clerk authentication (frontend + backend) | Hasrat |
| Backend User Schema & Migrations | Update database schema and run migrations for user data | Ranjot |
| Backend Route Protection | Secure backend routes using Clerk middleware | Dilpreet |
| Deployment to Vercel | Deploy frontend and backend applications | Dilpreet |
| User Favorites Feature | Implement user-specific favorites with authentication | Dilpreet |
| User Recipe Submission Feature | Create and manage user recipe endpoints | Hasrat |
| User Profile Page | Display user data and activity | Ranjot |
| Login & Registration UI | Implement sign-in and sign-up pages | Ranjot |
| Protected Routes (Frontend) | Restrict access to authenticated users only | Hasrat |
| README Local Setup Documentation | Write setup instructions and environment details | Dilpreet |
| UI Improvements & Enhancements | Improve UI and add optional features | Team |

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

## Authors
- Dilpreet  
- Ranjot  
- Hasrat
