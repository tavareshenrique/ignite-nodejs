import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

const prisma = new PrismaClient();

const schemaId = randomUUID();

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Env DATABASE_URL is not defined');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

beforeAll(() => {
  const databaseUrl = generateUniqueDatabaseUrl(schemaId);

  process.env.DATABASE_URL = databaseUrl;

  execSync('pnpm prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`,
  );

  await prisma.$disconnect();
});
