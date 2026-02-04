require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
    },
  });

  // Seed orders
  await prisma.order.upsert({
    where: { id: "order-1" },
    update: {},
    create: {
      id: "order-1",
      userId: user.id,
      total: 1500.50,
      status: "completed",
    },
  });

  await prisma.order.upsert({
    where: { id: "order-2" },
    update: {},
    create: {
      id: "order-2",
      userId: user.id,
      total: 2300.00,
      status: "pending",
    },
  });

  await prisma.order.upsert({
    where: { id: "order-3" },
    update: {},
    create: {
      id: "order-3",
      userId: user.id,
      total: 999.99,
      status: "processing",
    },
  });
}

main()
  .then(() => console.log("SEED OK"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });