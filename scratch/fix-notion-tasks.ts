import { PrismaClient } from './prisma/client/pg';

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.task.updateMany({
    where: {
      notionPageId: { not: null },
      importedFromProvider: null,
    },
    data: {
      importedFromProvider: 'NOTION',
    },
  });
  console.log(`Updated ${updated.count} tasks with NOTION provider flag.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
