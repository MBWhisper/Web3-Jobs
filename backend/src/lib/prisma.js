const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// Prevent multiple instances in development
const prismaGlobal = globalThis;
if (!prismaGlobal.prisma) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);
  prismaGlobal.prisma = new PrismaClient({ adapter });
}

const prisma = prismaGlobal.prisma;

// Validate that DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

module.exports = prisma;