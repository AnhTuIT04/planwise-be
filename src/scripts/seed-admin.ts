/* eslint-disable no-console */
import { hash } from "bcrypt";

import { PrismaClient } from "prisma/client/pg";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required");
  }

  const hashedPassword = await hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword, fullname: "Administrator" },
  });

  console.log(`Admin account ready: ${admin.email} (id: ${admin.id})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
