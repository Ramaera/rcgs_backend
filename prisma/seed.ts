import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import csv from 'csv-parser';
import fs from 'fs';
import cuid from 'cuid';

const specificISOString = '2023-04-29T01:26:02.529Z';
const specificDate = new Date(specificISOString);

const SeedCommand = async () => {
  const filePath = '/Users/apple/Downloads/501to1000.csv';
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data));

  await prisma.$connect();
  console.log('Seeding...');

  for (const row of results) {
    const ExistingBatch = await prisma.bATCH.findFirst({
      where: {
        batchCode: parseInt(row.Filename),
      },
    });
    // console.log('goingon....', row.row);
    if (ExistingBatch) {
      await prisma.rewardCode.create({
        data: {
          id: cuid(),
          createdAt: specificDate,
          updatedAt: specificDate,
          code: row.Data,
          isClaimed: false,
          batchCodeId: parseInt(row.Filename),
        },
      });
    } else {
      await prisma.bATCH.create({
        data: {
          batchCode: parseInt(row.Filename),
          createdAt: specificDate,
          updatedAt: specificDate,
          rewardCode: {
            create: {
              code: row.Data,
            },
          },
        },
      });
    }
  }
};

async function main() {
  SeedCommand();
  console.log('Seeding completed!');
  await prisma.rewardCode.deleteMany();
  await prisma.bATCH.deleteMany();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
