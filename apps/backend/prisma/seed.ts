import { prisma } from '../src/lib/prisma.js';
import { recipeSeedData } from './seedData.js';

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.userRecipe.deleteMany();
  await prisma.recipe.deleteMany();

  // Create recipes from seedData
  await prisma.recipe.createMany({
    data: recipeSeedData
  });

  console.log(`Created ${recipeSeedData.length} recipes`);
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

