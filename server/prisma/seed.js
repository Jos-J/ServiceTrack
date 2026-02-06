//server/prisma/seed
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const createdby = "seed";

  const rows = [
    {
      servicename: "Oil Change",
      servicecategory: "Fluids",
      description: "Replace engine oil and oil filter",
      intervalmiles: 5000,
      intervalmonths: 6,
      estimatedlaborhours: "0.50",
      standardpartscost: "35.00",
      createdby,
      isactive: true,
    },
    {
      servicename: "Tire Rotation",
      servicecategory: "Tires",
      description: "Rotate tires to even out wear",
      intervalmiles: 6000,
      intervalmonths: 6,
      estimatedlaborhours: "0.50",
      standardpartscost: "0.00",
      createdby,
      isactive: true,
    },
    {
      servicename: "Brake Inspection",
      servicecategory: "Brakes",
      description: "Inspect pads/rotors and brake fluid condition",
      intervalmiles: 12000,
      intervalmonths: 12,
      estimatedlaborhours: "0.50",
      standardpartscost: "0.00",
      createdby,
      isactive: true,
    },
    {
      servicename: "Engine Air Filter",
      servicecategory: "Filters",
      description: "Replace engine air filter",
      intervalmiles: 15000,
      intervalmonths: 12,
      estimatedlaborhours: "0.30",
      standardpartscost: "20.00",
      createdby,
      isactive: true,
    },
  ];

  for (const r of rows) {
    const exists = await prisma.servicetype.findFirst({
      where: {
        servicename: r.servicename,
        servicecategory: r.servicecategory,
      },
      select: { servicetype_id: true },
    });

    if (!exists) {
      await prisma.servicetype.create({ data: r });
    }
  }

  console.log("Seeded servicetype rows (if missing).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });


